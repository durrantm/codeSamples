describe 'AO - Complete Approved Application' do
  p = load_page_objects 'atlas_office'
  loans = load_loans

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers

  it 'should view a credit approved bar study loan application ready to be certified', :happy, :api do
    ssn = DynamoActions.increment_ssn
    create_loan ssn, loans.loan_type.bar_study
    %w(CreditAcknowledgement ConsentToShareWithThirdPartyServiceProviders ElectronicDeliveryConsent LenderPrivacyPolicy PatriotAct LoanPacket LAD LASD).each do |doc|
      acknowledge_document doc
    end
    submit_borrower_loan_application
    generate_borrower_loan_packet
    electronic_signature
    visit_atlas_office
    within_atlas_office_frame do
      @loan_application_tab = first_loan_search_result p, ssn
    end
    within_window @loan_application_tab do
      within p.application_management.borrower_loan_information do
        expect(page).to have_css(p.application_management.credit_decision, text: 'Approved')
        expect(page).to have_css(p.application_management.application_status, text: 'Awaiting Certification / Enrollment Verification')
        expect(page).to have_css(p.application_management.repayment_option, text: 'Fully Deferred Principal and Interest')
        expect(page).to have_css(p.application_management.repayment_rate_type, text: 'LiborMonthly')
        expect(page).to have_css(p.application_management.mla_borrower, text: 'No')
        expect(page).to have_css(p.application_management.mla_loan_indicator, text: 'No')
      end
      find_by_id(p.application_management.borrower_application_info).click
      within p.application_management.borrower_information do
        expect(page).to have_css(p.application_management.promissory_note_sign, text: 'E-Signed')
      end
    end
  end

  it 'should view a credit approved career training smart option loan application ready to be certified', :happy, :api do
    ssn = DynamoActions.increment_ssn
    create_loan ssn, loans.loan_type.career_training
    %w(CreditAcknowledgement ConsentToShareWithThirdPartyServiceProviders ElectronicDeliveryConsent LenderPrivacyPolicy PatriotAct LoanPacket LASD).each do |doc|
      acknowledge_document doc
    end
    submit_borrower_loan_application
    rate_and_repayment_info
    generate_borrower_loan_packet
    electronic_signature
    generate_borrower_approval_disclosure
    acknowledge_document 'LAD'
    visit_atlas_office
    within_atlas_office_frame do
      @loan_application_tab = first_loan_search_result p, ssn
    end
    within_window @loan_application_tab do
      within p.application_management.borrower_loan_information do
        expect(page).to have_css(p.application_management.credit_decision, text: 'Approved')
        expect(page).to have_css(p.application_management.application_status, text: 'Awaiting Certification / Enrollment Verification')
        expect(page).to have_css(p.application_management.repayment_option, text: 'Interest Only')
        expect(page).to have_css(p.application_management.repayment_rate_type, text: 'LiborMonthly')
        expect(page).to have_css(p.application_management.mla_borrower, text: 'No')
        expect(page).to have_css(p.application_management.mla_loan_indicator, text: 'No')
      end
      find_by_id(p.application_management.borrower_application_info).click
      within p.application_management.borrower_information do
        expect(page).to have_css(p.application_management.promissory_note_sign, text: 'E-Signed')
        expect(page).to have_css(p.application_management.self_certification_sign, text: 'Electronic')
      end
    end
  end
end
