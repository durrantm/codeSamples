describe 'AO - Marketing Partner List Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it 'should view the marketing partner list page', :smoke do
    visit_atlas_office
    lender_management_tab = window_opened_by { click_link 'Lender Management' }
    within_window lender_management_tab do
      sleep_short
      click_link 'Marketing Partner List'
      expect(find_by_id p.lender_management.add_new_marketing_partner_button).to be
    end
  end
end
