describe 'OLA - Student Loan Products', loan_type: 'graduate', loan_type_code: 'XSPP', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans

  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "Graduate Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.graduate_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "Graduate General Information - First Name Left Blank" do
    it "has a general information form for graduate student loans that is filled out incorrectly", :sad do
      goto_page_ola loans.loan_type_id.graduate_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_in p.general_information.first_name, with: ''
      continue p
      last_four_ssn = last_four ssn
      expect_demographic_information_to_be_correct p, last_four_ssn
    end
  end

  describe "Graduate School Information - Degree Left Unselected" do
    it "has a school information form for graduate student loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.undergraduate_smart_option
      continue p
      existing_application p
      expect(find_by_id(p.school_information.saved_school).text).to match /UNIV/
      expect(find_by_id(p.school_information.degree).value).to eq ''
      expect(find_by_id(p.school_information.major).value).to eq 'FLM'
      expect(find_by_id(p.school_information.enrollment_status).value).to eq 'FullTime'
      expect(find_by_id(p.school_information.saved_grade_level).text).to match /Freshman Undergraduate/
      expect(find_by_id(p.school_information.graduation_date_month).value).to eq '09'
      expect(find_by_id(p.school_information.graduation_date_year).value).to eq (this_year + 2).to_s
    end
  end

  describe "Graduate Smart Loan Happy All Pages" do
    it "has a form for graduate student loans that is filled out correctly", :happy do
      goto_page_ola loans.loan_type_id.graduate_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_out_address p
      fill_out_school p, 'UNIV'
      fill_out_education_degree_information p, this_year
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
