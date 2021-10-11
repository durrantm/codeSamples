describe 'OLA - Student Loan Products', loan_type: 'k12', loan_type_code: 'CTKT', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans
  
  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "K12 Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.k12_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "K12 General Information - First Name Left Blank" do
    it "has a general information form for k12 student loans that is filled out incorrectly", :sad do
      goto_page_ola loans.loan_type_id.k12_loan
      parent_ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, parent_ssn, parent = true
      confirm_date_of_birth p
      fill_in p.general_information.first_name, with: ''
      continue p
      last_four_ssn = last_four parent_ssn
      expect_demographic_information_to_be_correct p, last_four_ssn
    end
  end

  describe "K12 Training Loan Happy All Pages" do
    it "has a form for k12 student loans that is filled out correctly", :happy do
      goto_page_ola loans.loan_type_id.k12_loan
      parent_ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, parent_ssn, parent = true
      confirm_date_of_birth p
      fill_out_address p
      student_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_student_basic_info p, ask_citizenship = false
      fill_out_student_ssn_and_confirm_ssn p, student_ssn
      fill_out_school p, "UNIV"
      fill_out_first_grade_level p
      continue p
      existing_application p
      fill_in p.loan_amount.requested_loan, with: '4000'
      continue p
      fill_out_employment_information p
      fill_out_financial_information p
      fill_out_contact_information p, relative = true
      choose_individual_application p
      electronic_consent p
      privacy_policy p
      click_submit_application p
      find_application_status p
      complete_application p
      check_for_online_account p, parent_ssn
      expect_to_see_thank_you p
    end
  end
end
