describe 'OLA - Student Loan Products', loan_type: 'health_graduate', loan_type_code: 'MXIH', page_type: 'form' do
  p = load_page_objects 'ola'
  loans = load_loans

  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "Health Graduate Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.health_graduate_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "Health Graduate General Information - First Name Left Blank" do
    it "has a general information form for health graduate student loans that is filled out incorrectly", :sad do
      goto_page_ola loans.loan_type_id.health_graduate_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_in p.general_information.first_name, with: ''
      continue p
      last_four_ssn = last_four ssn
      expect_demographic_information_to_be_correct p, last_four_ssn
    end
  end

  describe "Health Graduate Loan Information - Disbursement Amount Left Blank" do
    it "has a loan information form for health graduate student loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.health_graduate
      sleep_short
      continue p
      existing_application p
      fill_in p.loan_amount.disbursement_amount_1, with: 0
      expect(find_by_id(p.loan_amount.requested_loan).value).to eq '3000'
      expect(find_by_id(p.loan_amount.disbursement_amount_1).value).to eq '0'
      expect(find_by_id(p.loan_amount.disbursement_amount_2).value).to eq '1500'
    end
  end

  describe "Health Graduate Loan Happy All Pages" do
    it "has a form for health graduate student loans that is filled out correctly", :happy do
      goto_page_ola loans.loan_type_id.health_graduate_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_out_address p
      fill_out_school p, 'UNIV'
      fill_out_first_degree_major_enrollment_status_dropdowns p
      fill_out_graduation p, this_year - 1
      continue p
      existing_application p
      requested_loan_amount = 10000
      fill_in p.loan_amount.requested_loan, with: requested_loan_amount
      fill_out_disbursement_information p, split_loan_amount_into_two_disbursements(requested_loan_amount)
      continue p
      fill_out_employment_information p
      fill_out_financial_information p
      fill_out_contact_information p
      choose_individual_application p
      electronic_consent p
      privacy_policy p
      click_submit_application p
      find_application_status p
      complete_application p
      check_for_online_account p, ssn
      expect_to_see_thank_you p
    end
  end
end
