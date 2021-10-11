describe 'AO - School Lender List Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it 'should view the school lender list page', :smoke do
    visit_atlas_office
    lender_management_tab = window_opened_by { click_link 'Lender Management' }
    within_window lender_management_tab do
      sleep_short
      click_link 'School Lender List'
      expect(find_by_id p.lender_management.doe_search).to be
    end
  end
end
