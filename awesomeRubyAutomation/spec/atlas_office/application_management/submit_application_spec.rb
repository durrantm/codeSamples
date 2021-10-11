describe 'AO - Submit Application' do
  p = load_page_objects 'atlas_office'
  loans = load_loans
  
  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers

  it 'should view an approved credit decision for a borrower under loan information', :happy, :api do
    ssn = DynamoActions.increment_ssn
    create_loan ssn, loans.loan_type.health_graduate
    %w(CreditAcknowledgement ConsentToShareWithThirdPartyServiceProviders ElectronicDeliveryConsent LenderPrivacyPolicy PatriotAct LoanPacket LAD LASD).each do |doc|
      acknowledge_document doc
    end
    submit_borrower_loan_application
    visit_atlas_office
    within_atlas_office_frame do
      @loan_application_tab = first_loan_search_result p, ssn
    end
    within_window @loan_application_tab do
      within p.application_management.borrower_loan_information do
        expect(page).to have_css(p.application_management.credit_decision, text: 'Approved')
      end
    end
  end
end
