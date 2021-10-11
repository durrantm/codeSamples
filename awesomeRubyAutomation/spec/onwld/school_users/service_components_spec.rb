describe 'ONWLD - Service Components' do
  p = load_page_objects 'onwld'

  include ONWLDFormHelpers

  it 'should load the service components page correctly', :smoke do
    visit_onwld
    opennet_user_login p, 'autouser01'
    fill_in p.school_activities.school_id_input, with: '00105100'
    find_button('Service Components').click
    expect(page).to have_content 'Service Components'
    expect(page).to have_content 'Applications / Certifications'
    expect(page).to have_content 'Individual Inquiry'
    expect(page).to have_content 'Query And Reporting'
    expect(page).to have_content 'File Management'
    expect(page).to have_content 'Servicing Information'
  end
end
