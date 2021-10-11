describe 'AO - Servicing Features Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it 'should view the servicing features page', :smoke do
    visit_atlas_office
    lender_management_tab = window_opened_by { click_link 'Lender Management' }
    within_window lender_management_tab do
      sleep_short
      click_link 'Servicing Features'
      expect(find_by_id p.lender_management.add_new_benefit_button).to be
    end
  end
end
