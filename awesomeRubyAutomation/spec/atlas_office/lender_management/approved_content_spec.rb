describe 'AO - Approved Content/Template Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it 'should view the approved content/template page', :smoke do
    visit_atlas_office
    lender_management_tab = window_opened_by { click_link 'Lender Management' }
    within_window lender_management_tab do
      sleep_short
      click_link 'Approved Content/Template'
      expect(find_by_id p.lender_management.content_document_dropdown).to be
    end
  end
end
