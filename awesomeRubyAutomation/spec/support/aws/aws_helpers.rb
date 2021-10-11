module AWSHelpers
  def self.check_for_environment_variable_configuration
    if ENV['AWS_ACCESS_KEY_ID'].nil? || ENV['AWS_ACCESS_KEY_ID'].empty?
      raise_environment_variable_exception_with_instructions 'AWS_ACCESS_KEY_ID'
    end

    if ENV['AWS_SECRET_ACCESS_KEY'].nil? || ENV['AWS_SECRET_ACCESS_KEY'].empty?
      raise_environment_variable_exception_with_instructions 'AWS_SECRET_ACCESS_KEY'
    end

    if ENV['AWS_REGION'].nil? || ENV['AWS_REGION'].empty?
      raise_environment_variable_exception_with_instructions 'AWS_REGION'
    end
  end

  def raise_environment_variable_exception_with_instructions missing_env_variable
    raise Exception.new("The \"#{missing_env_variable}\" environment variable is not set, please set this in your
system's environment variables or type 'export #{missing_env_variable}=\"value\"")
  end
end
