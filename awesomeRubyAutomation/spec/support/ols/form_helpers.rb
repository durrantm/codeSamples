module OLSFormHelpers
  def visit_ols
    visit URL.ols_base
  end

  def login p, ols_username, password
    visit_ols
    find(p.login_button).click
    fill_in p.username, with: ols_username
    fill_in p.password, with: password
    find(p.login_with_credentials).click
    allow_for_slow_ols_login
  end

  def check_for_post_login_prompts p, date_of_birth, last_four_ssn
    if has_text? 'Validate Personal Information'
      find_by_id(p.personal_info_button).click
      find_by_id(p.continue_button).click
      fill_in p.user_dob, with: date_of_birth
      find_by_id(p.radio_button_ssn).click
      fill_in p.last_four_ssn, with: last_four_ssn
      find_by_id(p.continue_button).click
    end
    if has_text? 'Updates to customer information can be made daily. Your updates are currently pending.'
      find_by_id(p.cancel_button).click
    end
  end

  def allow_for_slow_ols_login
    find 'body', wait: Sleep_lengths[:long]
  end

  def fill_out_new_bank_information p
    click_link p.student_loans
    find_by_id(p.loans_navigation_menu).hover
    find_link(p.manage_bank_accounts).click
    sleep_short
    click_link p.add_bank_account
    fill_in p.routing_number, with: '021000021'
    fill_in p.funding_account_number, with: '5467895321'
    fill_in p.funding_account_number_confirm, with: '5467895321'
    find_by_id(p.radio_button_checking_account).click
    find_by_id(p.save_account_for_future).click
  end

  def reset_password p
    visit_ols
    find(p.login_button).click
    find_link('Forgot password?').click
    fill_in p.user_id_for_reset, with: '719434524qa3'
    fill_in p.user_dob, with: '12/12/1994'
    find_by_id(p.radio_button_ssn).click
    fill_in p.last_four_ssn, with: '4524'
    find_by_id(p.confirm_dob_and_ssn_continue).click
    find_by_id(p.answer_security_hint_radio_button).click
    find_by_id(p.reset_password_continue).click
    within :id, p.security_question do
      fill_in p.security_hint_answer, with: 'test'
    end
    find_by_id(p.security_hint_continue).click
    seed = File.read 'spec/support/ols/seed'[0, 4].to_i
    seed += 1
    fill_in p.new_password_for_reset, with: 'Auto' + seed.to_s + '@'
    find_by_id(p.new_password_continue).click
    require_relative 'update_seed.rb'
    expect(page).to have_content 'Your password has been reset'
  end

  def login_and_reenter_address p, ols_username, password
    login p, ols_username, password
    visit p.account_settings_url
    find_by_id(p.edit_address).click
    fill_in p.edit_street_address_one, with: original_address
    find_by_id(p.save_address).click
  end

  def login_and_reenter_phone_number p, ols_username, password
    login p, ols_username, password
    visit p.account_settings_url
    find_by_id(p.edit_contact_info).click
    fill_in p.edit_phone_number, with: original_phone_number
    find_by_id(p.save_contact_info).click
  end

  def handle_update_timeout type, ols_username, password
    if account_timed_out?
      if type == 'phone'
        login_and_reenter_phone_number p, ols_username, password
      elsif type == 'address'
        login_and_reenter_address_number p, ols_username, password
      else
        raise "timeout type #{type} invalid"
      end
      elseif unexpected_error?
      visit URL.account_settings
    end
  end
end
