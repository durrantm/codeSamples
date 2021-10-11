module ActivityCenterFormSections
  def login_continue p
    find(p.login_submit_button).click
    if has_text? 'Validate Personal Information'
      find_by_id(p.validate_personal_info_button).click
      find_by_id(p.validate_continue_button).click
      fill_in p.validate_user_dob, with: '12/25/1980'
      find_by_id(p.validate_radio_button_ssn).click
      fill_in p.validate_last_four_ssn, with: '0550'
      find_by_id(p.validate_continue_button).click
    end
  end
end