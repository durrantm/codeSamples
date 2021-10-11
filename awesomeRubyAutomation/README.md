## Ruby automation using Rspec

Instructions for Dyanmo DB setup:

1) First add these three environment variables (windows button + s -> environment variables)

AWS_REGION: us-east-2

AWS_ACCESS_KEY_ID: *************

AWS_SECRET_ACCESS_KEY: **************

2) Choose UAT or DEV for environment by running this command in git bash: "export environments='DEV'" (or 'UAT' for UAT)
3) The table is already created (you can delete the table from AWS console and run "ruby spec/create_table.rb" to re-create it).

4) Calling DynamoActions.increment_ssn  will increment the SSN by 1.

Instructions for BrowserStack:

1) Create a browserstack.config.yml and copy and paste the block below with the correct user and key:

server: "hub-cloud.browserstack.com"
user: *********
key: *************

common_caps:
  "browserstack.local": true

browser_caps:
  -
    "browser": "chrome"
    "resolution": "1920x1080"

2) Set the environment variable BROWSERSTACK in order to run it

Application URLs: Please set these pairs as environment variables.

atlas_office_url: t00242:Redcar%232@portal.atlas-sprint.internal.slmbank.net/

activity_center_base_url: qa.salliemae.com

ola_base_url: opennetwld-qa3.salliemae.com/W2WPortal

ols_base_url: preview.salliemae.com

onwld_base_url: opennetwld-qa3.salliemae.com

account_settings_url: temp-activitycenter-sprint.salliemae.com/AccountSettings/Show
