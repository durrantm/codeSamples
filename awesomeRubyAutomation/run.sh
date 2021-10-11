TestStatus=0

report_test_status() {
  ret=$?
  if [ $ret -ne 0 ]
  then
    TestStatus=1
  fi
}

bundle exec rspec spec/ola/ --tag smoke;
report_test_status

bundle exec rspec spec/loan_finder/ --tag smoke;
report_test_status

bundle exec rspec spec/atlas_office/ --tag smoke;
report_test_status

bundle exec rspec spec/ols/ --tag smoke;
report_test_status

bundle exec rspec spec/activity_center/ --tag smoke;
report_test_status

exit $TestStatus
