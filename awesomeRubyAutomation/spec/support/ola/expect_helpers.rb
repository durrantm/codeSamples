module ExpectHelpers
  def expect_demographic_information_to_be_correct p, last_four_ssn
    expect(find_by_id(p.general_information.first_name).value).to eq ''
    expect(find_by_id(p.general_information.last_name).value).to eq 'testLast'
    expect(find_by_id(p.general_information.email_address).value).to eq 'do-not-reply@salliemae.com'
    expect(find_by_id(p.general_information.phone).value).to eq '6175551212'
    expect(find_by_id(p.general_information.dob).value).to eq '01/01/1978'
    expect(find_by_id(p.general_information.confirm_dob).value).to eq '01/01/1978'
    expect(find_by_id(p.general_information.us_citizen).value).to eq 'Citizen'
    expect(find_by_id(p.general_information.ssn_first_three).value).to eq '***'
    expect(find_by_id(p.general_information.ssn_middle_two).value).to eq '**'
    expect(find_by_id(p.general_information.ssn_last_four).value).to eq last_four_ssn
    expect(find_by_id(p.general_information.ssn_first_three_confirm).value).to eq '***'
    expect(find_by_id(p.general_information.ssn_middle_two_confirm).value).to eq '**'
    expect(find_by_id(p.general_information.ssn_last_four_confirm).value).to eq last_four_ssn
  end

  def find_general_information_after_save p, last_four_ssn
    find p.general_information.saved_borrower_name, text: 'TESTFIRST'
    find p.general_information.saved_borrower_middle_initial, text: 'T'
    find p.general_information.saved_borrower_name, text: 'TESTLAST'
    find_by_id(p.general_information.email_address).value == 'do-not-reply@salliemae.com'
    find_by_id(p.general_information.phone).value == ''
    find p.general_information.saved_borrower_dob, text: '01/**/****'
    find p.general_information.saved_borrower_citizenship, text: 'US Citizen'
    find p.general_information.saved_borrower_ssn, text: '***-**-' + last_four_ssn
  end

  def find_student_information_after_save p, student_last_four_ssn
    find p.school_information.saved_student_name, text: 'TESTFIRST'
    find p.school_information.saved_student_name, text: 'TESTLAST'
    find_by_id(p.school_information.student_middle_initial).value == ''
    find p.school_information.saved_student_dob, text:'01/**/****'
    find p.school_information.saved_student_citizenship, text: 'US Citizen'
    find p.school_information.saved_student_ssn, text: '***-**-' + student_last_four_ssn
  end

  def find_permanent_address_after_save p
    find_by_id(p.permanent_address.street_address).value == '1 Main St Apt 1'
    find_by_id(p.permanent_address.street_address_2).value == 'Apt#1'
    find_by_id(p.permanent_address.city).value == 'New York'
    find_by_id(p.permanent_address.state).value == 'NY'
    find_by_id(p.permanent_address.zip).value == '100440052'
    find_by_id(p.permanent_address.years_there).value == '10'
  end

  def find_loan_information_after_save p
    find_by_id(p.loan_amount.copay).value == '10000'
    find_by_id(p.loan_amount.financial_assistance).value == '4000'
    find_by_id(p.loan_amount.requested_loan).value == '2000'
  end

  def find_employment_information_after_save p
    find_by_id(p.employment_information.employment_status).value == 'EmployedPT'
    find_by_id(p.employment_information.employer).value == 'test inc'
    find_by_id(p.employment_information.occupation).value == 'Engineer'
    find_by_id(p.employment_information.work_phone).value == ''
    find_by_id(p.employment_information.work_phone_extension).value == ''
    find_by_id(p.employment_information.employment_length).value == '10'
    find_by_id(p.employment_information.income).value == '53500'
  end

  def find_financial_information_after_save p
    find_by_id(p.financial_information.checking_account).value == 'true'
    find_by_id(p.financial_information.checking_amount).value == '1000'
    find_by_id(p.financial_information.residence_type).value == 'Own'
    find_by_id(p.financial_information.mortgage_rent).value == '1000'
  end

  def find_cosigner_information_after_save p, cosigner_last_four_ssn
    find p.general_information.saved_cosigner_name, text: 'COSIGNERFIRS'
    find p.general_information.saved_cosigner_middle_initial, text: 'A'
    find p.general_information.saved_cosigner_name, text: 'COSIGNERLASTNAME'
    find_by_id(p.general_information.cosigner_email).value == 'do-not-reply@google.com'
    find_by_id(p.general_information.cosigner_primary_phone).value == ''
    find p.general_information.saved_cosigner_dob, text: '01/**/****'
    find p.general_information.saved_cosigner_citizenship, text: 'US Citizen'
    find p.general_information.saved_cosigner_ssn, text: '***-**-' + cosigner_last_four_ssn
  end

  def find_cosigner_address_after_save p
    find_by_id(p.permanent_address.cosigner_street).value == '1 Main St'
    find_by_id(p.permanent_address.cosigner_street2).value == ''
    find_by_id(p.permanent_address.cosigner_city).value == 'New York'
    find_by_id(p.permanent_address.cosigner_state).value == 'NY'
    find_by_id(p.permanent_address.cosigner_zip).value == '100440052'
    find_by_id(p.permanent_address.cosigner_permanent_address_years).value == '10'
  end

  def find_cosigner_employment_information_after_save p
    find_by_id(p.employment_information.cosigner_current_employer_name).value == 'Test Inc'
    find_by_id(p.employment_information.cosigner_occupation).value == 'Pilot'
    find_by_id(p.employment_information.cosigner_work_phone).value == ''
    find_by_id(p.employment_information.cosigner_work_phone_ext).value == ''
    find_by_id(p.employment_information.cosigner_employment_length).value == '10'
    find_by_id(p.employment_information.cosigner_gross_annual_income).value == '1000000'
  end

  def find_cosigner_financial_information_after_save p
    find_by_id(p.financial_information.cosigner_mortgage_rent_amount).value == '1000'
  end
end
