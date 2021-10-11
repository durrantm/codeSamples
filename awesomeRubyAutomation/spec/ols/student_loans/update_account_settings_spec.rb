describe 'OLS - Account Settings' do
  p = load_page_objects'ols'

  include SSNParts
  include OLSFormHelpers
  include OLSFormSections

  before :each do
    login p, '719115772qa3', 'Auto2019@'
    check_for_post_login_prompts p, '03/19/1955', '5772'
    visit ENV['account_settings_url']
    confirm_review_contact_information_popup
  end
  it "has a page with account information", :smoke do
    expect(find 'h1', text: 'Account settings').to be
  end
  it "prevents me from updating contact information incorrectly", :sad do
    find_by_id(p.edit_contact_info).click
    original_phone_number = find_by_id(p.edit_phone_number).value
    update_contact_information p, ''
    find_by_id p.edit_phone_number_error, text: 'Enter a valid Phone Number'
    fill_in p.edit_phone_number, with: original_phone_number
    find_by_id(p.save_contact_info).click
    handle_update_timeout 'phone', '719115772qa3', 'Auto2019@'
    expect(find_by_id p.account_contact_info, text: original_phone_number).to be
  end
  it "lets me update contact information correctly", :happy do
    find_by_id(p.edit_contact_info).click
    original_phone_number = find_by_id(p.edit_phone_number).value
    update_contact_information p, '317-555-1213'
    login p, '719115772qa3', 'Auto2019@' if account_timed_out?
    visit ENV['account_settings_url']
    find_by_id p.account_contact_info, text: '317-957-3456'
    find_by_id(p.edit_contact_info).click
    update_contact_information p, original_phone_number
    handle_update_timeout 'phone', '719115772qa3', 'Auto2019@'
    expect(find_by_id p.account_contact_info, text: original_phone_number).to be
  end
  it "prevents me from updating address information incorrectly", :sad do
    find_by_id(p.edit_address).click
    original_address = find_by_id(p.edit_street_address_one).value
    update_account_address p, ''
    find_by_id p.edit_street_address_one_error, text: 'Enter a valid U.S. Address'
    fill_in p.edit_street_address_one, with: original_address
    find_by_id(p.save_address).click
    handle_update_timeout 'address', '719115772qa3', 'Auto2019@'
    original_address = remove_double_space original_address
    expect(find_by_id p.account_address_info, text: original_address).to be
  end
  it "lets me update address information correctly", :happy do
    find_by_id(p.edit_address).click
    original_address = find_by_id(p.edit_street_address_one).value
    update_account_address p, 'WALNUT COURT'
    login p, '719115772qa3', 'Auto2019@' if account_timed_out?
    visit ENV['account_settings_url']
    find_by_id p.account_address_info, text: 'WALNUT COURT'
    find_by_id(p.edit_address).click
    update_account_address p, original_address
    handle_update_timeout 'address', '719115772qa3', 'Auto2019@'
    original_address = remove_double_space original_address
    expect(find_by_id p.account_address_info, text: original_address).to be
  end
  it "lets me change my security questions", :happy do
    change_security_questions p
    find 'p', text: 'Success!'
    find_by_id(p.continue_security_questions).click
    change_security_questions p, reset_state = true
    expect(find 'p', text: 'Success!').to be
  end
  it "lets me change my comunication preferences", :happy do
    toggle_communication_preferences p
    find(p.done_changing_communication).click
    toggle_communication_preferences p
    expect(page).to have_content 'Your changes will take effect immediately.'
  end
end

private

def confirm_review_contact_information_popup
  if (page.has_content? 'Please review your contact information')
    find_by_id(p.contact_information_review_confirm).click
  end
end

def remove_double_space original_address
  original_address.sub! '  ', ' '
end
