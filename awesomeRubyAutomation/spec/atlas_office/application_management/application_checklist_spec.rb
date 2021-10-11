describe 'AO - Application Checklist Page' do
  p = load_page_objects 'atlas_office'
  loans = load_loans

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers

  it 'should view the application checklist page', :smoke do
    visit_atlas_office
    ssn = DynamoActions.increment_ssn
    create_loan ssn, loans.loan_type.career_training
    within_atlas_office_frame do
      @loan_application_tab = first_loan_search_result p, ssn
    end
    within_window @loan_application_tab do
      click_link('Application Checklist')
      expect(find_by_id(p.application_management.application_checklist_save_button).value).to eq 'Save Checklist'
    end
  end
end