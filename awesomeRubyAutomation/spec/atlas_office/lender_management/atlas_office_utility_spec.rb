describe 'AO - Atlas Office Utility page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it 'should view the atlas office utility page', :smoke do
    visit_atlas_office
    lender_management_tab = window_opened_by { click_link 'Lender Management' }
    within_window lender_management_tab do
      sleep_short
      click_link 'Atlas Office Utility'
      expect(find_by_id p.lender_management.agent_speaks).to be
    end
  end
end
