describe "AO - Disbursement Roster Search" do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  before :each do
    visit_atlas_office
  end

  it "should view the disbursement rosters page", :smoke do
    within_disbursement_roster_search_frame do
      click_link "Disbursement Rosters"
      expect(find_by_id p.disbursement_management.rosters_search_bar).to be
    end
  end

  it "should not be able to search an invalid date range", :sad do
    within_disbursement_roster_search_frame do
      click_link 'Disbursement Rosters'
      find_by_id(p.disbursement_management.rosters_start_date_calendar).click
      find_by_id(p.disbursement_management.rosters_start_date).click
      find_by_id(p.disbursement_management.rosters_end_date_calendar).click
      find_by_id(p.disbursement_management.rosters_end_date).click
      expect(page).to have_text("Invalid Date Range")
    end
  end

  it "should search a valid date range and see roster results", :happy do
    within_disbursement_roster_search_frame do
      click_link 'Disbursement Rosters'
      find_by_id(p.disbursement_management.rosters_start_date_calendar).click
      find_by_id(p.disbursement_management.rosters_start_date).click
      find(p.disbursement_management.rosters_search_button).click
      @roster_details_tab = window_opened_by { first(p.disbursement_management.roster_results).click }
    end
    within_window @roster_details_tab do
      expect(find p.disbursement_management.roster_details_id).to be
    end
  end

  private

  def within_disbursement_roster_search_frame
    disbursement_management_tab = window_opened_by { click_link('Disbursement Management') }
    within_window disbursement_management_tab do
      yield
    end
  end
end
