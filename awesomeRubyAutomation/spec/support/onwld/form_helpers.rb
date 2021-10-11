module ONWLDFormHelpers
  def visit_onwld
    visit URL.onwld_base
  end

  def opennet_user_login p, onwld_userid
    find_by_id(p.user_menu.school_login).click
    fill_in p.user_menu.user_id, with: onwld_userid
    fill_in p.user_menu.password, with: 'Auto2019'
    find_by_id(p.user_menu.login_button).click
  end
end