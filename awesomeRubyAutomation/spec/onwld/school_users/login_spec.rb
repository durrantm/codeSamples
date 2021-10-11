describe 'ONWLD - Home Page' do
  p = load_page_objects 'onwld'

  include ONWLDFormHelpers

  it "has a school login link", :smoke do
    visit_onwld
    find_by_id(p.user_menu.school_login).click
    expect(find_by_id p.user_menu.login_button).to be
  end

  it "has a login link that goes to a user menu page", :happy do
    visit_onwld
    opennet_user_login p, 'autouser01'
    expect(page).to have_css('table', text: 'SALLIE MAE OPENNET® MANAGER MENU')
  end
end

