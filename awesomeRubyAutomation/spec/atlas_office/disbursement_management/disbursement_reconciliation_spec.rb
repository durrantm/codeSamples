describe "AO - Disbursement Roster Search" do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers

  before :each do
    visit_atlas_office
  end

  it "should view the disbursement reconciliation page", :smoke do
    within_disbursement_reconciliation_frame do
      expect(find_by_id p.disbursement_management.borrower_ssn_search_bar).to be
    end
  end

  it "should view an error message when invalid SSN is entered", :sad do
    within_disbursement_reconciliation_frame do
      fill_in p.disbursement_management.borrower_ssn_search_bar, with: "1"
      find_by_id(p.disbursement_management.search_button).click
      expect(page).to have_content 'Borrower SSN should be 9 digits.'
    end
  end

  private

  def within_disbursement_reconciliation_frame
    disbursement_management_tab = window_opened_by { click_link('Disbursement Management') }
    within_window disbursement_management_tab do
      click_link "Disbursement Reconciliation"
      within_frame find_by_id('MainContent_ReconContentIframe') do
        yield
      end
    end
  end
end