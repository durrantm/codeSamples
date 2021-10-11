describe 'OLA - Student Loan Products - Note that this spec has no additional expects in sad path and no additional sad paths
to keep this loan form simple and useful for templating to new loan flows that are created. The functionality has been
tested in other specs which share the same forms.', loan_type: 'bar', loan_type_code: 'BS', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans
  
  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts

  describe "Bar Study Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.bar_study_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "Bar Study General Information Page - First Name Left Blank" do
    it "has a general information form for bar study student loans that is filled out incorrectly", :sad do
      goto_page_ola loans.loan_type_id.bar_study_loan
      ssn = DynamoActions.increment_ssn
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_in p.general_information.first_name, with: ''
      continue p
      expect(find_by_id(p.general_information.first_name).value).to eq ''
      expect(find_by_id(p.general_information.last_name).value).to eq 'testLast'
      expect(find_by_id(p.general_information.email_address).value).to eq 'do-not-reply@salliemae.com'
    end
  end

  describe "Bar Study Loan Happy All Pages" do
    it "has a form for bar study student loans that is filled out correctly", :happy do
      goto_page_ola loans.loan_type_id.bar_study_loan
      ssn = '666123456'
      fill_out_basic_information_form p, ssn
      confirm_date_of_birth p
      fill_out_address p
      fill_out_school p, 'UNIV'
      fill_out_first_degree p
      select 'Full Time', from: p.school_information.enrollment_status
      fill_out_graduation p, this_year - 2
      select 'Jan', from: p.school_information.exam_date_month
      select this_year, from: p.school_information.exam_date_year
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
