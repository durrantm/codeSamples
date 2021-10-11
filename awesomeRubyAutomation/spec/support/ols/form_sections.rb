module OLSFormSections
  def select_first_dropdown_option select_id
    find('select#' + select_id + ' option:nth-child(2)', wait: Sleep_lengths[:medium]).select_option
  end

  def select_second_dropdown_option select_id
    find('select#' + select_id + ' option:nth-child(3)', wait: Sleep_lengths[:medium]).select_option
  end

  def select_fifth_dropdown_option select_id
    find('select#' + select_id + ' option:nth-child(6)', wait: Sleep_lengths[:medium]).select_option
  end

  def account_timed_out?
    page.has_css? 'h3', text: 'SESSION TIMED OUT.'
  end

  def unexpected_error?
    page.has_css? 'p', text: 'An unexpected error occurred, Please try again.'
  end

  def toggle_communication_preferences form_page
    p = form_page
    click_link 'Communication preferences'
    regulatory_consent = find(p.regulatory_consent_checked).value
    regulatory_consent == 'Yes' ? find(p.regulatory_consent_no).click : find(p.regulatory_consent_yes).click
    consent_1098E = find(p.consent_1098E_checked).value
    consent_1098E == 'Yes' ? find(p.consent_1098E_no).click : find(p.consent_1098E_yes).click
    find_by_id(p.save_communication_preferences).click
    (regulatory_consent == 'No' || consent_1098E == 'No') && find_by_id(p.save_confirm_communication_preferences).click
  end

  def change_security_questions form_page, reset_state = false
    p = form_page
    click_link 'Change security questions'
    select_first_dropdown_option p.security_question_one
    fill_in p.security_answer_one, with: reset_state ? 'test' : 'Bob'
    select_second_dropdown_option p.security_question_two
    fill_in p.security_answer_two, with: reset_state ? 'test' : 'Dogs'
    select_fifth_dropdown_option p.security_question_three
    fill_in p.security_answer_three, with: reset_state ? 'test' : 'Chocolate'
    find_by_id(p.save_security_questions).click
  end

  def update_contact_information form_page, phone_number
    p = form_page
    fill_in p.edit_phone_number, with: phone_number
    find_by_id(p.save_contact_info).click
  end

  def update_account_address form_page, address
    p = form_page
    fill_in p.edit_street_address_one, with: address
    find_by_id(p.save_address).click
  end
end
