describe 'AO - Status History Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes

  it 'should load the status history for applications', :smoke do
    visit_atlas_office
    within_atlas_office_frame do
      find_by_id(p.application_management.my_recent_applications_button).click
      @loan_application_tab = window_opened_by { find_by_id(p.application_management.first_loan_result).click }
    end
    within_window @loan_application_tab do
      click_link 'Journals'
      expect(page.has_content? 'Journal Items').to eq true
      expect(find_by_id(p.application_management.journal_table)).to be
    end
  end
end