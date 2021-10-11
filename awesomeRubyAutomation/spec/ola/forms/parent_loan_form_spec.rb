describe 'OLA - Student Loan Products', loan_type: 'parent', loan_type_code: 'PNSM', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans
  
  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "Parent Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.parent_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "Parent General Information - First Name Left Blank" do
    it "has a basic information form for parent loans that is filled out incorrectly", :sad do
      goto_page_ola loans.loan_type_id.parent_loan
      parent_ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, parent_ssn, parent = true
      confirm_date_of_birth p
      fill_in p.general_information.first_name, with: ''
      continue p
      last_four_ssn = last_four parent_ssn
      expect_demographic_information_to_be_correct p, last_four_ssn
    end
  end

  describe "Parent Student Information - Student Name Left Blank" do
    it "has a student information form for parent loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.parent
      student_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_student_info p, student_ssn
      fill_in p.school_information.student_first_name, with: ''
      continue p
      existing_application p
      student_last_four_ssn = last_four student_ssn
      expect(find_by_id(p.school_information.student_first_name).value).to eq ''
      expect(find_by_id(p.school_information.student_SSN_last_4).value).to eq student_last_four_ssn
      expect(find_by_id(p.school_information.student_SSN_last_4_confirm).value).to eq student_last_four_ssn
    end
  end

  describe "Parent Loan Happy All Pages" do
    it "has a form for parent student loans that is filled out correctly", :happy do
      goto_page_ola loans.loan_type_id.parent_loan
      parent_ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, parent_ssn, parent = true
      confirm_date_of_birth p
      fill_out_address p
      student_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_student_info p, student_ssn
      fill_out_school p, 'UNIV'
      fill_out_education_degree_information p, this_year
      fill_out_loan_information p
      fill_out_employment_information p
      fill_out_financial_information p
      choose_individual_application p
      dependent_student_confirmation p
      electronic_consent p
      rates_and_fees p
      privacy_policy p
      click_submit_application p
      find_application_status p
      complete_application_rates_repayment p
      check_for_online_account p, parent_ssn
      expect_to_see_thank_you p
    end
  end

  describe "Parent Loan Happy All Pages Saved" do
    it "has a form for parent student loans that is saved and submitted afterwards", :happy, :saved do
      goto_page_ola loans.loan_type_id.parent_loan
      parent_ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, parent_ssn, parent = true
      confirm_date_of_birth p
      fill_out_address p
      student_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_student_info p, student_ssn
      fill_out_school p, 'UNIV'
      fill_out_education_degree_information p, this_year
      fill_out_loan_information p
      fill_out_employment_information p
      fill_out_financial_information p
      save_application_for_later p
      parent_last_four_ssn = last_four parent_ssn
      student_last_four_ssn = last_four student_ssn
      continue_application p, parent_last_four_ssn
      find_general_information_after_save p, parent_last_four_ssn
      find_permanent_address_after_save p
      find_student_information_after_save p, student_last_four_ssn
      continue_with_first_application p
      find_loan_information_after_save p
      find_employment_information_after_save p
      find_financial_information_after_save p
      continue_with_second_application p
      choose_individual_application p
      electronic_consent p
      within_frame find p.finish_application.dialog_frame do
        find(p.finish_application.student_dependent_confirmation, match: :first).click
      end
      submit_application p
      find_application_status p
      complete_application_rates_repayment p
      check_for_online_account p, parent_ssn
      expect_to_see_thank_you p
    end
  end

  private

  def fill_out_student_info p, ssn
    fill_out_student_basic_info p
    fill_out_student_ssn_and_confirm_ssn p, ssn
  end
end
