describe 'AO - Cancel Application Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers

  it 'should create an application and then cancel it', :happy do
    application_id = get_incomplete_loan_application_id
    visit_atlas_office
    within_atlas_office_frame do
      fill_in p.application_management.search_bar, with: application_id
      find_by_id(p.application_management.search_button).click
      @application_details_tab = window_opened_by { click_link application_id }
    end
  end
  
  it 'should create an application and then cancel it', :happy do
    application_details_tab = navigate_to_application_details p
    within_window application_details_tab do
      click_link 'Process Application'
      find(p.application_management.cancel_application).click
      select 'Borrower', from: p.application_management.cancel_application_source
      select 'Other', from: p.application_management.cancel_application_reason
      fill_in p.application_management.cancel_application_journal, with: 'Test'
      find(p.application_management.cancel_application_button).click
      find(p.application_management.cancel_application_confirm).click
      click_link 'Application'
      expect(find(p.application_management.application_status).text).to eq 'Application Canceled by Borrower'
    end
  end
end

private

def navigate_to_application_details p
  application_id = get_incomplete_loan_application_id
  visit_atlas_office
  within_atlas_office_frame do
    fill_in p.application_management.search_bar, with: application_id
    find_by_id(p.application_management.search_button).click
    window_opened_by { click_link application_id }
  end
end