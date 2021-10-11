require 'aws-sdk-dynamodb'

module DynamoActions
  def self.increment_ssn increment = 1
    AWSHelpers.check_for_environment_variable_configuration
    dynamodb = Aws::DynamoDB::Client.new
    current_ssn = DynamoActions.get_current_ssn
    new_ssn = current_ssn + increment
    dynamodb.update_item({
                              table_name: 'ddb-001-s-02-e1-01-sdetlimitwarning',
                              key: { 'environment': 'DEV' },
                              update_expression: 'SET last_used_ssn = :n',
                              condition_expression: ':current_ssn = last_used_ssn',
                              expression_attribute_values: {
                                  ':n' => new_ssn,
                                  ':current_ssn' => current_ssn
                              }})
    new_ssn
  end

  def self.get_current_ssn
    AWSHelpers.check_for_environment_variable_configuration
    dynamodb = Aws::DynamoDB::Client.new
    response = dynamodb.get_item({
        table_name: 'ddb-001-s-02-e1-01-sdetlimitwarning',
        key: { 'environment': 'DEV' }
    })
    dev_ssn = response.item['last_used_ssn'].to_i
  end
end
