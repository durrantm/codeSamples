module ActivityCenterFormHelpers
  def goto_activity_center
    visit URL.activity_center + '/login/qts.aspx'
  end

  def fill_out_login_credentials p
    fill_in p.login_username, with: (p.startup_data.ac_username)
    fill_in p.login_password, with: (p.startup_data.ac_password)
  end
end
