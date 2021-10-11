describe 'ONWLD - Application Search Page' do
  p = load_page_objects 'onwld'

  include ONWLDFormHelpers

  before :each do
    visit_onwld
    opennet_user_login p, 'autouser04'
  end

  it "is able to navigate to the Search Criteria page", :smoke do
    fill_in p.user_menu.school_id, with: '00105100'
    click_button p.user_menu.school_settings
    find_by_id(p.user_menu.application_search).click
    expect(page).to have_text('Search Criteria')
  end

  it "is able to view demographic information associated with a borrower's application", :happy do
    fill_in p.user_menu.school_id, with: '00105100'
    click_button p.user_menu.school_settings
    find_by_id(p.user_menu.application_search).click
    fill_in p.user_menu.ssn, with: '333721196'
    click_button p.user_menu.submit_button
    click_link p.user_menu.view_demographics
    expect(page).to have_content('AUTOLAST')
    expect(page).to have_content('AUTOFIRST')
    expect(page).to have_content('333-72-1196')
    expect(page).to have_content('01/01/1994')
    expect(page).to have_content('317-317-3171')
  end
end
