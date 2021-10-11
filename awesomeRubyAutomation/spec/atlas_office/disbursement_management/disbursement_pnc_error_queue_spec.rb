describe "AO - Disbursement PNC Error Queue" do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it "should view the disbursement rosters page", :smoke do
    visit_atlas_office
    disbursement_management_tab = window_opened_by { click_link 'Disbursement Management' }
    within_window disbursement_management_tab do
      click_link "PNC Error Queue"
      expect(find_by_id p.disbursement_management.pnc_error_queue_search_bar).to be
    end
  end
end
