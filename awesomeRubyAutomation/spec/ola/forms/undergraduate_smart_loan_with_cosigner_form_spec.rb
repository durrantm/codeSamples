describe 'OLA - Student Loan Products', loan_type: 'undergraduate', loan_type_code: 'XSPP', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans

  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "Undergraduate Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.undergraduate_loan
      expect(find p.globals.main_form).to be
    end
  end

  describe "Undergraduate Cosigner General Information - Fields Left Blank" do
    it "has a cosigner information form for undergraduate student loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.undergraduate_smart_option
      proceed_to_cosigner_section p
      cosigner_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_cosigner_basic_information_and_ssn p, cosigner_ssn
      confirm_date_of_birth p
      fill_in p.general_information.cosigner_first_name, with: ''
      continue p
      cosigner_ssn_last_four = last_four cosigner_ssn
      expect(find_by_id(p.general_information.cosigner_first_name).value).to eq ''
      expect(find_by_id(p.general_information.cosigner_last_name).value).to eq 'cosignerLastName'
      expect(find_by_id(p.general_information.cosigner_middle_initial).value).to eq 'a'
      expect(find_by_id(p.general_information.cosigner_relationship_to_student).value).to eq 'Parent'
      expect(find_by_id(p.general_information.cosigner_email).value).to eq 'do-not-reply@google.com'
      expect(find_by_id(p.general_information.cosigner_primary_phone).value).to eq '6175551212'
      expect(find_by_id(p.general_information.cosigner_dob).value).to eq '01/01/1978'
      expect(find_by_id(p.general_information.cosigner_ssn_first_three).value).to eq '***'
      expect(find_by_id(p.general_information.cosigner_ssn_middle_two).value).to eq '**'
      expect(find_by_id(p.general_information.cosigner_ssn_last_four).value).to eq cosigner_ssn_last_four
      expect(find_by_id(p.general_information.cosigner_confirm_ssn_first_three).value).to eq '***'
      expect(find_by_id(p.general_information.cosigner_confirm_ssn_middle_two).value).to eq '**'
      expect(find_by_id(p.general_information.cosigner_confirm_ssn_last_four).value).to eq cosigner_ssn_last_four
    end
  end

  describe "Undergraduate Cosigner Permanent Address - Fields Left Blank" do
    it "has a cosigner permanent address form for undergraduate student loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.undergraduate_smart_option
      proceed_to_cosigner_section p
      cosigner_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_cosigner_basic_information_and_ssn p, cosigner_ssn
      confirm_date_of_birth p
      fill_out_cosigner_address p
      fill_in p.permanent_address.cosigner_street, with: ''
      expect(find_by_id(p.permanent_address.cosigner_street).value).to eq ''
      expect(find_by_id(p.permanent_address.cosigner_street2).value).to eq ''
      expect(find_by_id(p.permanent_address.cosigner_city).value).to eq 'New York'
      expect(find_by_id(p.permanent_address.cosigner_state).value).to eq 'NY'
      expect(find_by_id(p.permanent_address.cosigner_zip).value).to eq '10024'
      expect(find_by_id(p.permanent_address.cosigner_permanent_address_years).value).to eq '10'
    end
  end

  describe "Undergraduate Cosigner Employment Information - Fields Left Blank" do
    it "has a cosigner employment info form for undergraduate student loans that is filled out incorrectly", :sad, :api do
      create_loan_using_api_and_continue_to_school_info p, loans.loan_type.undergraduate_smart_option
      proceed_to_cosigner_section p
      cosigner_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_cosigner_basic_information_and_ssn p, cosigner_ssn
      confirm_date_of_birth p
      fill_out_cosigner_address p
      continue p
      fill_out_cosigner_employment_info p
      fill_in p.employment_information.cosigner_current_employer_name, with: ''
      expect(find_by_id(p.employment_information.cosigner_current_employer_name).value).to eq ''
      expect(find_by_id(p.employment_information.cosigner_occupation).value).to eq 'Pilot'
      expect(find_by_id(p.employment_information.cosigner_work_phone).value).to eq '6175551214'
      expect(find_by_id(p.employment_information.cosigner_work_phone_ext).value).to eq '123'
      expect(find_by_id(p.employment_information.cosigner_employment_length).value).to eq '10'
      expect(find_by_id(p.employment_information.cosigner_gross_annual_income).value).to eq '53500'
    end
  end

  describe "Undergraduate Happy All Pages Saved **with Cosigner**" do
    it "has a form for undergraduate student loans that is saved and submitted afterwards", :happy, :saved, :api do
      borrower_ssn = create_loan_using_api_and_continue_to_school_info p, loans.loan_type.undergraduate_smart_option
      proceed_to_cosigner_section p
      cosigner_ssn = DynamoActions.increment_ssn increment = 2
      fill_out_cosigner_basic_information_and_ssn p, cosigner_ssn
      confirm_date_of_birth p
      fill_out_cosigner_address p
      fill_out_cosigner_mailing_address p
      fill_out_cosigner_employment_info p
      select_first_dropdown_option p.financial_information.cosigner_residence_type
      fill_in p.financial_information.cosigner_mortgage_rent_amount, with: 1000
      save_application_for_later p
      cosigner_last_four_ssn = last_four cosigner_ssn
      continue_application p, cosigner_last_four_ssn, cosigner = true
      find_cosigner_information_after_save p, cosigner_last_four_ssn
      find_cosigner_address_after_save p
      continue_with_first_application p, true
      find_cosigner_employment_information_after_save p
      fill_in p.financial_information.cosigner_mortgage_rent_amount, with: 1000
      find_cosigner_financial_information_after_save p
      continue_with_second_application p, true
      certify_status p
      electronic_consent p
      rates_and_fees p
      privacy_policy p
      click_submit_application p
      continue_after_submitting_application p
      complete_application_rates_repayment p
      check_for_online_account p, cosigner_ssn
      expect_to_see_thank_you p
    end
  end

  private

  def indicate_cosigner p
    find('input#' + p.choose_how_to_apply.how_to_apply + '[type=radio][value=J]', wait: Sleep_lengths[:medium_long])
    sleep_medium # Intermittent failures mdd 02/18/2018
    choose p.choose_how_to_apply.how_to_apply, option: 'J'
    continue p
    sleep_medium # internittents mdd 3/6/18
    within_frame(find(p.finish_application.dialog_frame, visible: true, wait: Sleep_lengths[:medium_long])) do
      find(p.choose_how_to_apply.cosigner_is_with_me, visible: true, wait: Sleep_lengths[:medium_long])
      find(p.choose_how_to_apply.cosigner_is_with_me).click
      find_by_id(p.globals.general_continue).click
    end
  end

  def proceed_to_cosigner_section p
    fill_out_first_degree p
    continue p
    existing_application p
    fill_in p.employment_information.work_phone, with: '6175551212'
    fill_in p.employment_information.work_phone_extension, with: '100'
    sleep_short
    indicate_cosigner p
    electronic_consent p
    rates_and_fees p
    privacy_policy p
    click_submit_application p
  end

  def fill_out_cosigner_mailing_address p
    find_by_id(p.permanent_address.cosigner_address_different_from_mailing).click
    fill_in p.permanent_address.cosigner_current_street, with: '2 test st'
    fill_in p.permanent_address.cosigner_current_street2, with: 'Apt T'
    fill_in p.permanent_address.cosigner_current_city, with: 'New York'
    select 'New York', from: p.permanent_address.cosigner_current_state
    fill_in p.permanent_address.cosigner_current_zip, with: '10024'
    continue p
  end

  def fill_out_cosigner_employment_info p
    select 'Employed FT', from: p.employment_information.cosigner_employment_status
    find_by_id p.employment_information.cosigner_current_employer_name
    fill_in p.employment_information.cosigner_current_employer_name, with: 'Test Inc'
    select 'Pilot', from: p.employment_information.cosigner_occupation
    fill_in p.employment_information.cosigner_work_phone, with: '6175551214'
    fill_in p.employment_information.cosigner_work_phone_ext, with: '123'
    select '10', from: p.employment_information.cosigner_employment_length
    fill_in p.employment_information.cosigner_gross_annual_income, with: '53500'
    continue p
  end

  def certify_status p
    sleep_short
    within_frame find p.finish_application.dialog_frame, visible: true, wait: Sleep_lengths[:medium_long] do
      find 'input#CertifyStatus', visible: true, wait: Sleep_lengths[:medium_long]
      check 'CertifyStatus'
      find_by_id('Continue').click
    end
    sleep_short
  end
end
