require 'aws-sdk-dynamodb'

dynamodb = Aws::DynamoDB::Client.new


dynamodb.put_item({
                      table_name: 'ddb-001-s-02-e1-01-sdetlimitwarning',
                      item: {
                          'environment' => 'DEV',
                          'last_used_ssn' => 666730000}})


dynamodb.put_item({
                      table_name: 'ddb-001-s-02-e1-01-sdetlimitwarning',
                      item: {
                          'environment' => 'UAT',
                          'last_used_ssn' => 666730000}})