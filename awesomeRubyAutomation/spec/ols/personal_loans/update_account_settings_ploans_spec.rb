describe 'OLS - Account Settings' do
  p = load_page_objects'ols'

  include SSNParts
  include Sleepers
  include OLSFormHelpers
  include OLSFormSections

  before :each do
    login p, '666545513qa3', 'Auto2018@'
    check_for_post_login_prompts p, '02/25/1970', '5513'
    visit ENV['account_settings_url']
  end

  it "has a page with account information", :smoke do
    expect(find 'h1', text: 'Account settings').to be
  end

  it "prevents me from changing my security questions", :sad do
    click_link 'Change security questions'
    select_first_dropdown_option p.security_question_one
    fill_in p.security_answer_one, with: 'test'
    find_by_id(p.save_security_questions).click
    find_by_id p.security_question_two_status, text: 'You must select a security hint to continue. Please try again.'
    select_second_dropdown_option p.security_question_two
    fill_in p.security_answer_two, with: 'test'
    select_fifth_dropdown_option p.security_question_three
    fill_in p.security_answer_three, with: 'test'
    find_by_id(p.save_security_questions).click
    expect(find 'p', text: 'Success!').to be
  end

  it "lets me change my security questions", :happy do
    change_security_questions p
    find 'p', text: 'Success!'
    find_by_id(p.continue_security_questions).click
    change_security_questions p, reset_state = true
    expect(find 'p', text: 'Success!').to be
  end

  it "prevents me from updating address information incorrectly", :sad do
    find_by_id(p.edit_address).click
    original_address = find_by_id(p.edit_street_address_one).value
    update_account_address p, ''
    find_by_id p.edit_street_address_one_error, text: 'Enter a valid U.S. Address'
    fill_in p.edit_street_address_one, with: original_address
    find_by_id(p.save_address).click
    handle_update_timeout 'address', '666545513qa3', 'Auto2018@'
    expect(find_by_id p.account_address_info, text: original_address).to be
  end

  it "lets me update address information correctly", :happy do
    find_by_id(p.edit_address).click
    original_address = find_by_id(p.edit_street_address_one).value
    update_account_address p, 'WALNUT COURT'
    login p, '666545513qa3', 'Auto2018@' if account_timed_out?
    visit ENV['account_settings_url']
    find_by_id p.account_address_info, text: 'WALNUT COURT'
    find_by_id(p.edit_address).click
    update_account_address p, original_address
    handle_update_timeout 'address', '666545513qa3', 'Auto2018@'
    expect(find_by_id p.account_address_info, text: original_address).to be
  end

  it "prevents me from updating contact information incorrectly", :sad do
    find_by_id(p.edit_contact_info).click
    original_phone_number = find_by_id(p.edit_phone_number).value
    update_contact_information p, ''
    find_by_id p.edit_phone_number_error, text: 'Enter a valid Phone Number'
    fill_in p.edit_phone_number, with: original_phone_number
    find_by_id(p.save_contact_info).click
    handle_update_timeout 'phone', '666545513qa3', 'Auto2018@'
    expect(find_by_id p.account_contact_info, text: original_phone_number).to be
  end

  it "lets me update contact information correctly", :happy do
    find_by_id(p.edit_contact_info).click
    original_phone_number = find_by_id(p.edit_phone_number).value
    update_contact_information p, '617-555-1213'
    login p, '666545513qa3', 'Auto2018@' if account_timed_out?
    visit ENV['account_settings_url']
    find_by_id p.account_contact_info, text: '617-555-1213'
    find_by_id(p.edit_contact_info).click
    update_contact_information p, original_phone_number
    handle_update_timeout 'phone', '666545513qa3', 'Auto2018@'
    expect(find_by_id p.account_contact_info, text: original_phone_number).to be
  end

  it "lets me change my communication preferences", :happy do
    toggle_communication_preferences p
    find(p.done_changing_communication).click
    toggle_communication_preferences p
    expect(page).to have_content 'Your changes will take effect immediately.'
  end

  private

  def select_second_dropdown_option select_id
    find('select#' + select_id + ' option:nth-child(3)').select_option
  end
end
