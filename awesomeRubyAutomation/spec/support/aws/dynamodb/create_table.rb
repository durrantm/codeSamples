require 'aws-sdk-dynamodb'

dynamodb = Aws::DynamoDB::Client.new

dynamodb.create_table ({
                          table_name: 'ddb-001-s-02-e1-01-sdetlimitwarning',
                          key_schema: [
                              {attribute_name: 'environment', key_type: 'HASH'}],
                          attribute_definitions: [
                              {attribute_name: 'environment', attribute_type: 'S'}],
                          provisioned_throughput: {read_capacity_units: 1, write_capacity_units: 1}})


