module OLAFormSections

  def fill_out_basic_information_form p, ssn, parent = false
    fill_in p.general_information.first_name, with: 'testFirst', wait: Sleep_lengths[:long]
    fill_in p.general_information.middle_initial, with: 't'
    fill_in p.general_information.last_name, with: 'testLast'
    fill_in p.general_information.email_address, with: 'do-not-reply@salliemae.com'
    fill_in p.general_information.phone, with: '6175551212'
    fill_in p.general_information.dob, with: '01/01/1978'
    fill_in p.general_information.confirm_dob, with: '01/01/1978'
    select 'US Citizen', from: p.general_information.us_citizen
    fill_out_ssn_and_confirm_ssn p, ssn
    if parent
      find_by_id p.general_information.relationship_to_student
      select 'Parent', from: p.general_information.relationship_to_student
    end
    continue p
  end

  def fill_out_address p
    fill_in p.permanent_address.street_address, with: '1 main st', wait: Sleep_lengths[:medium_long]
    fill_in p.permanent_address.street_address_2, with: 'Apt#1'
    fill_in p.permanent_address.city, with: 'New York'
    select 'New York', from: p.permanent_address.state
    fill_in p.permanent_address.zip, with: '10024'
    select '10', from: p.permanent_address.years_there
    continue p
  end

  def fill_out_education_degree_information p, this_year
    fill_out_first_degree p
    fill_out_major_enrollment_status p
    select_first_dropdown_option p.school_information.grade_level
    fill_out_years p, this_year
    continue p
    existing_application p
  end

  def fill_out_first_grade_level p
    select_first_dropdown_option p.school_information.grade_level
  end

  def fill_out_loan_information p
    fill_in p.loan_amount.copay, with: '10000'
    fill_in p.loan_amount.financial_assistance, with: '4000'
    find_by_id(p.loan_amount.financial_assistance).send_keys :tab
    fill_in p.loan_amount.requested_loan, with: '2000'
    continue p
  end

  def fill_out_employment_information p
    select 'Employed PT', from: p.employment_information.employment_status
    fill_in p.employment_information.employer, with: 'test inc'
    select 'Engineer', from: p.employment_information.occupation
    fill_in p.employment_information.work_phone, with: '6175551212'
    fill_in p.employment_information.work_phone_extension, with: '100'
    select '10', from: p.employment_information.employment_length
    fill_in p.employment_information.income, with: '53500'
    continue p
  end

  def fill_out_financial_information p
    check p.financial_information.checking_account
    find_by_id p.financial_information.checking_amount, visible: true
    fill_in p.financial_information.checking_amount, with: '1000'
    select 'Own', from: p.financial_information.residence_type
    fill_in p.financial_information.mortgage_rent, with: 1000
    continue p
  end

  def fill_out_contact_information p, relative = false
    fill_in p.personal_contacts.primary_contact_first_name, with: 'testMomFirst'
    fill_in p.personal_contacts.primary_contact_last_name, with: 'testMomLast'
    fill_in p.personal_contacts.primary_contact_phone, with: '6175551212'
    select relative ? 'Relative' : 'Parent(Guardian)', from: p.personal_contacts.primary_relationship
    fill_in p.personal_contacts.secondary_contact_first_name, with: 'testDadFirst'
    fill_in p.personal_contacts.secondary_contact_last_name, with: 'testDadLast'
    fill_in p.personal_contacts.secondary_contact_phone, with: '6175551213'
    select relative ? 'Relative' : 'Parent(Guardian)', from: p.personal_contacts.secondary_relationship
    continue p
  end

  def fill_out_disbursement_information p, disbursement_amount = 5000
    select current_month_plus_months(6), from: p.loan_amount.disbursement_date_1_month
    select_first_dropdown_option p.loan_amount.disbursement_date_1_day
    select current_year_plus_months(6), from: p.loan_amount.disbursement_date_1_year
    select current_month_plus_months(11), from: p.loan_amount.disbursement_date_2_month
    select_first_dropdown_option p.loan_amount.disbursement_date_2_day
    select current_year_plus_months(11), from: p.loan_amount.disbursement_date_2_year
    fill_in p.loan_amount.disbursement_amount_1, with: disbursement_amount
    fill_in p.loan_amount.disbursement_amount_2, with: disbursement_amount
    continue p
  end

  def split_loan_amount_into_two_disbursements loan_amount
    loan_amount / 2
  end

  def fill_out_school p, school
    fill_in p.school_information.school, with: school
    find p.school_information.school_dropdown, visible: true, wait: Sleep_lengths[:long]
    select_first_school p.school_information.school
  end

  def fill_out_first_degree_major_enrollment_status_dropdowns p
    fill_out_first_degree p
    fill_out_major_enrollment_status p
  end

  def fill_out_cosigner_basic_information_and_ssn p, cosigner_ssn
    fill_in p.general_information.cosigner_first_name, with: 'cosignerFirstName'
    fill_in p.general_information.cosigner_last_name, with: 'cosignerLastName'
    fill_in p.general_information.cosigner_middle_initial, with: 'a'
    select 'Parent', from: p.general_information.cosigner_relationship_to_student
    fill_in p.general_information.cosigner_email, with: 'do-not-reply@google.com'
    fill_in p.general_information.cosigner_primary_phone, with: '6175551212'
    fill_in p.general_information.cosigner_dob, with: '01/01/1978'
    fill_in p.general_information.cosigner_confirm_dob, with: '01/01/1978'
    select 'US Citizen', from: p.general_information.cosigner_citizenship
    fill_in p.general_information.cosigner_ssn_first_three, with: first_three(cosigner_ssn)
    fill_in p.general_information.cosigner_ssn_middle_two, with: middle_two(cosigner_ssn)
    fill_in p.general_information.cosigner_ssn_last_four, with: last_four(cosigner_ssn)
    fill_in p.general_information.cosigner_confirm_ssn_first_three, with: first_three(cosigner_ssn)
    fill_in p.general_information.cosigner_confirm_ssn_middle_two, with: middle_two(cosigner_ssn)
    fill_in p.general_information.cosigner_confirm_ssn_last_four, with: last_four(cosigner_ssn)
    continue p
    # find_by_id(p.cosigner_confirm_dob_popup).click     uncomment if this windows pop
    sleep_medium # Intermittents mdd 4/9/2018
  end

  def fill_out_cosigner_address p
    fill_in p.permanent_address.cosigner_street, with: '1 main st'
    fill_in p.permanent_address.cosigner_street2, with: ''
    fill_in p.permanent_address.cosigner_city, with: 'New York'
    select 'New York', from: p.permanent_address.cosigner_state
    fill_in p.permanent_address.cosigner_zip, with: '10024'
    select '10', from: p.permanent_address.cosigner_permanent_address_years
  end

  def choose_individual_application p
    sleep_medium
    choose p.choose_how_to_apply.how_to_apply, option: 'I'
    continue p
  end

  def privacy_policy p
    within_frame find p.finish_application.dialog_frame do
      find p.globals.title, text: /^Privacy Policy$/, visible: true
      take_screenshot"privacy policy"
      find(p.finish_application.button_continue).click
    end
  end

  def electronic_consent p
    within_frame  find p.finish_application.dialog_frame, visible: true, wait: Sleep_lengths[:medium_long] do
      take_screenshot"electronic consent"
      find(p.finish_application.electronic_consent, visible: true, wait: Sleep_lengths[:long]).click
    end
  end

  def rates_and_fees p
    sleep_short # 4 intermittents in 10000 examples mdd 3/5/2018
    within_frame find p.finish_application.dialog_frame, visible: true, wait: Sleep_lengths[:medium_long] do
      find p.globals.title, text: /^Information about Rates and Fees$/, visible: true, wait: Sleep_lengths[:medium_long]
      take_screenshot "rates and fees"
      find(p.finish_application.dialog_continue).click
    end
  end

  def select_the_question_option select_id
    find('select#' + select_id + ' option:first-child').select_option
  end

  def select_fifth_dropdown_option select_id
    find('select#' + select_id + ' option:nth-child(6)').select_option
  end

  def submit_application p
    electronic_consent p
    rates_and_fees p
    privacy_policy p
    click_submit_application p
  end

  def click_submit_application p
    within_frame find p.finish_application.dialog_frame do
      find(p.finish_application.submit_application).click
    end
  end

  def continue p
    find(p.globals.continue).click
  end

  def find_application_status p
    find p.globals.title, text: /^Application Status$/, wait: Sleep_lengths[:long]
    sleep_short
  end

  def save_application_for_later p
    find_by_id(p.globals.save_for_later).click
  end

  def continue_application p, last_four_ssn, cosigner = false
    continue_code = find(p.resume_application.continue_application_code).text
    goto_continue_link continue_code, p
    find_by_id(p.resume_application.continue_loan_code_submit).click
    fill_in p.resume_application.continue_loan_last_name, with: cosigner ? 'cosignerLastName' : 'testLast'
    fill_in p.resume_application.continue_loan_dob, with: '01/01/1978'
    fill_in p.resume_application.continue_loan_ssn, with: last_four_ssn
    find_by_id(p.resume_application.continue_loan_submit_details).click
  end

  def continue_application_from_api p, last_four_ssn, continue_code
    goto_continue_link continue_code, p
    find_by_id(p.resume_application.continue_loan_code_submit).click
    fill_in p.resume_application.continue_loan_last_name, with: 'autoLast'
    fill_in p.resume_application.continue_loan_dob, with: '01/01/1994'
    fill_in p.resume_application.continue_loan_ssn, with: last_four_ssn
    find_by_id(p.resume_application.continue_loan_submit_details).click
  end

  def continue_with_first_application p, cosigner = false
    if cosigner
      fill_in p.general_information.cosigner_primary_phone, with: '6175551213'
    else
      fill_in p.general_information.phone, with: '6175551212'
    end
    continue p
  end

  def continue_with_second_application p, cosigner = false
    if cosigner
      fill_in p.employment_information.cosigner_work_phone, with: '6175551214'
      fill_in p.employment_information.cosigner_work_phone_ext, with: '123'
    else
      fill_in p.employment_information.work_phone, with: '6175551212'
      fill_in p.employment_information.work_phone_extension, with: '100'
    end
    continue p
  end

  def take_screenshot name
    unless ENV["TAKE_SCREENSHOTS"].nil?
      filename = "#{name}_".gsub(' ', '-') + "_#{Time.now.strftime "%Y-%m-%d-%H-%M-%S"}.png"
      page.save_screenshot filename
    end
  end

  def dependent_student_confirmation p
    within_frame find p.finish_application.dialog_frame do
      find(p.finish_application.dependent_student_confirmation).click
    end
  end

  def expect_to_see_thank_you p
    find p.globals.title, text: /^Next steps$/, wait: Sleep_lengths[:medium]
    expect(find p.globals.title, text: /^Next steps$/).to be
    sleep_short
  end

  def choose_variable_repayment_option p
    sleep_short
    choose p.finish_application.repayment_option, option: 'InterestOnly'
    continue p
  end

  def close_interest_rate p
    sleep_short
    find(p.finish_application.close_fixed_interest_rate).click
  end

  def accept_loan_approval_disclosure p
    sleep_short
    within_frame find p.finish_application.dialog_frame do
      find(p.finish_application.accept_terms_option).click
      sleep_short
      find(p.finish_application.continue_loan_approval_disclosure).click
    end
  end

  def loan_packet_documents p
    sleep_short
    within_frame find p.finish_application.dialog_frame do
      find(p.finish_application.continue_loan_packet_documents).click
    end
  end

  def submit_signature p
    sleep_short
    within_frame find p.finish_application.dialog_frame do
      find(p.finish_application.e_signature).click
    end
  end

  def continue_signature p
    sleep_short
    within_frame find p.finish_application.dialog_frame do
      find(p.finish_application.e_signature_continue).click
    end
  end

  def continue_after_submitting_application p
    find p.globals.title, text: /^Application [Ss]tatus$/, wait: Sleep_lengths[:long]
    find(p.finish_application.e_signature_continue).click
  end

  def complete_application p
    continue_application_after_credit_approved p
    loan_packet_documents p
    submit_signature p
    continue_signature p
  end

  def check_for_online_account p, ssn
    if  page.has_css? p.finish_application.dialog_frame
      within_frame find p.finish_application.dialog_frame do
        if  has_text? 'Create Online Account'
          username = first_three(ssn) + middle_two(ssn) + last_four(ssn) + 'qa3'
          create_online_account p, username
        end
      end
    end
  end

  def complete_application_rates_repayment p, variable_interest_rate = true, fixed_interest_rate = true
    if variable_interest_rate and fixed_interest_rate
      close_interest_rate p
    end
    choose_variable_repayment_option p
    continue_application_after_credit_approved p
    accept_loan_approval_disclosure p
    loan_packet_documents p
    submit_signature p
    continue_signature p
  end

  def create_online_account p, username
    sleep_short
    fill_in p.finish_application.account_username, with: username
    fill_in p.finish_application.account_password, with: 'Auto2018@'
    find_by_id(p.finish_application.account_terms_of_use).click
    find_by_id(p.finish_application.create_account_continue).click
  end

  def view_account_applications p
    find(p.finish_application.your_account).click
    sleep_short
    expect(page).to have_content 'Application summary'
    sleep_medium
  end

  def existing_application p
    sleep_short
    if page.has_css? p.finish_application.dialog_frame
      within_frame find p.finish_application.dialog_frame do
        find_by_id(p.globals.continue_new).click
      end
    end
  end

  def confirm_date_of_birth p
    if (page.has_content?('Confirm your birthdate'))
      find(p.general_information.cosigner_confirm_dob_popup, wait: Sleep_lengths[:medium_long]).click
      sleep_short
    end
  end

  private

  def continue_application_after_credit_approved p
    find_by_id(p.finish_application.continue_application_credit_approved).click
  end

  def fill_out_ssn_and_confirm_ssn p, ssn
    fill_in p.general_information.ssn_first_three, with: first_three(ssn)
    fill_in p.general_information.ssn_middle_two, with: middle_two(ssn)
    fill_in p.general_information.ssn_last_four, with: last_four(ssn)
    fill_in p.general_information.ssn_first_three_confirm, with: first_three(ssn)
    fill_in p.general_information.ssn_middle_two_confirm, with: middle_two(ssn)
    fill_in p.general_information.ssn_last_four_confirm, with: last_four(ssn)
  end

  def fill_out_student_basic_info p, ask_citizenship = true
    fill_in p.school_information.student_first_name, with: 'testFirst'
    fill_in p.school_information.student_last_name, with: 'testLast'
    fill_in p.school_information.student_dob, with: '01/01/1996'
    fill_in p.school_information.student_dob_confirm, with: '01/01/1996'
    select 'US Citizen', from: 'BO_ST_Citizenship' if ask_citizenship
  end

  def fill_out_student_ssn_and_confirm_ssn p, student_ssn
    fill_in p.school_information.student_SSN_first_3, with: first_three(student_ssn)
    fill_in p.school_information.student_SSN_middle_2, with: middle_two(student_ssn)
    fill_in p.school_information.student_SSN_last_4, with: last_four(student_ssn)
    fill_in p.school_information.student_SSN_first_3_confirm, with: first_three(student_ssn)
    fill_in p.school_information.student_SSN_middle_2_confirm, with: middle_two(student_ssn)
    fill_in p.school_information.student_SSN_last_4_confirm, with: last_four(student_ssn)
  end

  def fill_out_first_degree p
    select_first_dropdown_option p.school_information.degree
  end

  def fill_out_major_enrollment_status p
    select_first_dropdown_option p.school_information.enrollment_status
    select_first_dropdown_option p.school_information.major
  end

  def select_first_dropdown_option select_id
    find('select#' + select_id + ' option:nth-child(2)').select_option
  end

  def select_second_dropdown_option select_id
    find('select#' + select_id + ' option:nth-child(3)').select_option
  end

  def select_first_school select_id
    find_by_id(select_id).send_keys :arrow_down
    find_by_id(select_id).send_keys :tab
  end

  def fill_out_loan_years p, this_year
    select 'Jan', from: p.school_information.loan_start_month
    select this_year, from: p.school_information.loan_start_year
    select 'Jan', from: p.school_information.loan_end_month
    select this_year + 1, from: p.school_information.loan_end_year
  end

  def fill_out_years p, this_year
    fill_out_loan_years p, this_year
    fill_out_graduation p, this_year
  end

  def fill_out_graduation p, this_year
    select current_month_plus_months(1), from: p.school_information.graduation_date_month
    select this_year + 1, from: p.school_information.graduation_date_year
  end
end
