describe 'Dynamo Table Test', order: :defined do
  it 'SSN incremented with a default value test', :settings do
    puts 'remember to set environment variable by running this command: export ENVIRONMENT="UAT" or "DEV"'
    ssn = DynamoActions.get_current_ssn
    puts "ssn before update #{ssn}"
    expected_ssn = ssn.to_i + 1
    DynamoActions.increment_ssn
    ssn = DynamoActions.get_current_ssn
    puts "ssn after update #{ssn}"
    expect(ssn).to be(expected_ssn)
    puts "current ssn is #{ssn}"
  end

  it 'SSN incremented with a parameter value test', :settings do
    ssn = DynamoActions.increment_ssn
    puts "incremented ssn value #{ssn}"
    ssn_two = DynamoActions.increment_ssn 2
    puts "incremented ssn value #{ssn_two}"
    expect(ssn_two.to_i).to be(ssn.to_i + 2)
    puts "current ssn is #{ssn_two}"
  end
end
