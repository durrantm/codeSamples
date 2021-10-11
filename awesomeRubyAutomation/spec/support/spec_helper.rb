require 'rspec'
require 'capybara'
require 'capybara/rspec'
require 'capybara/dsl'
require 'selenium-webdriver'
require 'yaml'
require 'rspec/retry'
require 'pry'
require 'bundler/setup'
require 'browserstack/local'
require 'savon'
require 'rest-client'
require 'json'
require 'nokogiri'
require 'require_all'
require 'recursive-open-struct'

require_rel 'global'
require_rel 'aws/dynamodb/dynamo_actions', 'aws/aws_helpers'
require_rel 'sleep_lengths', 'sleepers', 'urls'
require_rel 'ola'
require_rel 'api_calls'
require_rel 'activity_center'
require_rel 'atlas_office'
require_rel 'loan_finder'
require_rel 'ols'
require_rel 'onwld'


include Sleepers
include DynamoActions
include AWSHelpers
include TimeHelpers

RSpec.configure do |config|
  config.include Capybara::DSL
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end
  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.default_sleep_interval = 1
  config.default_retry_count = 2
  config.verbose_retry = true
  config.display_try_failure_messages = true
  config.exceptions_to_retry = [Net::ReadTimeout, Savon::SOAPFault] unless ENV['REMOTE_BROWSER'] == 'true'
end

Capybara.configure do |config|
  config.run_server = false
  config.default_driver = ENV['REMOTE_BROWSER'].nil? ? :selenium : :selenium_remote
  config.default_max_wait_time = Sleep_lengths[:medium]
end

if ENV['REMOTE_BROWSER']
  Capybara.register_driver :selenium_remote do |app|
    Capybara::Selenium::Driver.new(app,
                                  browser: :remote,
                                  desired_capabilities: :chrome,
                                  url: "http://chrome:4444/wd/hub"
    )
  end
else
  Capybara.register_driver :selenium do |window|
    caps = Selenium::WebDriver::Remote::Capabilities.chrome("chromeOptions" => { "useAutomationExtension" => false })
    Capybara::Selenium::Driver.new window, browser: :chrome, desired_capabilities: caps
  end
  Capybara.default_max_wait_time = Sleep_lengths[:medium]
end

if ENV['BROWSERSTACK']
  TASK_ID = (ENV['TASK_ID'] || 0).to_i
  raise "FILE DOES NOT EXIST. Create browserstack.config.yml from README" unless File.file? 'browserstack.config.yml'
  CONFIG = YAML.load(File.read "browserstack.config.yml")
  Capybara.register_driver :browserstack do |window|
    caps = CONFIG['common_caps'].merge(CONFIG['browser_caps'][TASK_ID])

    if caps['browserstack.local'] && caps['browserstack.local'].to_s == 'true';
      @bs_local = BrowserStack::Local.new
      bs_local_args = { "key" => "#{CONFIG['key']}" }
      @bs_local.start bs_local_args
    end

    Capybara::Selenium::Driver.new(
        window,
        :browser => :remote,
        :url => "http://#{CONFIG['user']}:#{CONFIG['key']}@#{CONFIG['server']}/wd/hub",
        :desired_capabilities => caps
    )
  end
  Capybara.default_driver = :browserstack
  at_exit do
    @bs_local.stop unless @bs_local.nil?
  end
end

def select_screenshot_directory all_potential_directories
  all_potential_directories.select { |p| /.*Compliance_screenshots/ =~ p }
  all_potential_directories.reject! { |path| path.include? ".png" }
  Capybara.save_path = all_potential_directories.reject! { |path| path.include? "AppData" }.first
end

unless ENV["TAKE_SCREENSHOTS"].nil?
  all_potential_directories = Find.find(File.join "C:", "Users")
  select_screenshot_directory all_potential_directories
end

urls = ['ola_base_url','activity_center_base_url','ols_base_url','account_settings_url','atlas_office_url','onwld_base_url']
urls.each { |i| raise Exception.new "See README to set the #{i} environment variable" if ENV[i].nil? }

def load_page_objects application_directory
  RecursiveOpenStruct.new(YAML.load(File.read("spec/support/#{application_directory}/page_object.yml")))
end

def load_loans
  RecursiveOpenStruct.new(YAML.load(File.read("spec/support/loans.yml")))
end