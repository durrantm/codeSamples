describe 'OLA - Student Loan Products', loan_type: 'mba', loan_type_code: 'GRMB', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans
  
  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "MBA Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.mba_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "MBA General Information - First Name Left Blank" do
    it "has a general information form for mba student loans that is filled out incorrectly", :sad do
      goto_page_ola loans.loan_type_id.mba_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_in p.general_information.first_name, with: ''
      continue p
      last_four_ssn = last_four ssn
      expect_demographic_information_to_be_correct p, last_four_ssn
    end
  end

  describe "MBA Employment Information - Work Phone Number Left Blank" do
    it "has an employment information form for mba student loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.mba
      sleep_short
      continue p
      expect(find_by_id(p.employment_information.employer).value).to eq 'TestEmployer'
      expect(find_by_id(p.employment_information.occupation).value).to eq 'Pilot'
      expect(find_by_id(p.employment_information.work_phone).value).to eq ''
      expect(find_by_id(p.employment_information.work_phone_extension).value).to eq ''
      expect(find_by_id(p.employment_information.employment_length).value).to eq '8'
      expect(find_by_id(p.employment_information.income).value).to eq '53500'
    end
  end

  describe "MBA Loan Happy All Pages" do
    it "has a form for mba student loans that is filled out correctly", :happy do
      goto_page_ola loans.loan_type_id.mba_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_out_address p
      fill_out_school p, 'UNIV'
      fill_out_first_degree_major_enrollment_status_dropdowns p
      fill_out_first_grade_level p
      fill_out_years p, this_year
      continue p
      existing_application p
      fill_out_loan_information p
      fill_out_employment_information p
      fill_out_financial_information p
      fill_out_contact_information p
      choose_individual_application p
      submit_application p
      continue_after_submitting_application p
      complete_application_rates_repayment p
      check_for_online_account p, ssn
      expect_to_see_thank_you p
    end
  end
end
