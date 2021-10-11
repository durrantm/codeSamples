describe 'OLS - Home Page' do
  p = load_page_objects'ols'

  include SSNParts
  include OLSFormHelpers
  include OLSFormSections

  it "has a login link", :smoke do
    visit_ols
    expect(find p.login_button).to be
  end
  it "has a login link that goes to a login form", :happy do
    visit_ols
    find(p.login_button).click
    expect(page).to have_css 'form#calmFormMobile'
  end
  it "doesn't allow user to log in when wrong password is entered ", :sad do
    visit_ols
    find(p.login_button).click
    fill_in p.username, with: '719115772qa3'
    fill_in p.password, with: '1 bad password'
    find(p.login_with_credentials).click
    expect(page).to have_content '2 attempts left'
    login p, '719115772qa3', 'Auto2019@'
  end
  it "allows me to login successfully", :happy do
    login p, '719115772qa3', 'Auto2019@'
    check_for_post_login_prompts p, '03/19/1955', '5772'
    expect(find_by_id p.user_logout).to be
  end
end
