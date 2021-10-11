describe 'OLA - Student Loan Products', loan_type: 'medical_residency', loan_type_code: 'MX02', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans
  
  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "Medical Residency and Relocation Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.medical_residency_and_relocation_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "Medical Residency and Relocation Form - Smoke Saved" do
    it "is able to continue from a previously saved application", :smoke, :api do
      ssn = DynamoActions.increment_ssn
      api_response = create_loan ssn, loans.loan_type.medical_residency_and_relocation
      borrower_continue_code = extract_borrower_continue_code api_response.to_s
      continue_application_from_api p, last_four(ssn), borrower_continue_code
      expect(find p.globals.main_form).to be
    end
  end

  describe "Medical Residency and Relocation General Information Page - First Name Left Blank" do
    it "has a general information page for medical residency and relocation loans that is filled out incorrectly", :sad do
      goto_page_ola loans.loan_type_id.medical_residency_and_relocation_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_in p.general_information.first_name, with: ''
      continue p
      last_four_ssn = last_four ssn
      expect_demographic_information_to_be_correct p, last_four_ssn
    end
  end

  describe "Medical Residency and Relocation School Information Page - Degree Left Blank" do
    it "has a school information page for medical residency and relocation loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.medical_residency_and_relocation
      continue p
      existing_application p
      expect(find_by_id(p.school_information.saved_school).text).to match /UNIV/
      expect(find_by_id(p.school_information.degree).value).to eq ''
      expect(find_by_id(p.school_information.major).value).to eq 'M10'
      expect(find_by_id(p.school_information.enrollment_status).value).to eq 'FullTime'
      expect(find_by_id(p.school_information.graduation_date_month).value).to eq '01'
      expect(find_by_id(p.school_information.graduation_date_year).value).to eq (this_year + 1).to_s
    end
  end

  describe "Medical Residency and Relocation Loan Happy All Pages" do
    it "has a form for medical residency and relocation student loans that is filled out correctly", :happy do
      goto_page_ola loans.loan_type_id.medical_residency_and_relocation_loan
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
