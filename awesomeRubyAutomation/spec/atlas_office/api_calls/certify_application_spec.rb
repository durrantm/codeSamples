describe 'AO - Certifies application for Smart Option Loan' do
  include LoanManagement
  include CreateDifferentLoanTypes

  LoansByApi = load_loans

  it 'Certify Smart Option Loan', :happy, :api, :smoke do
    application_to_certify = CertifyApplication.new 100709142
    soap_request_message = application_to_certify.get_hash_for_certification_data
    get_soap_response = SoapRequest.make_soap_call_with_msg :certify_application, soap_request_message
    expect(get_soap_response.success?).to be true
  end

  it 'Completes and certifies Smart option Loan ready to be disbursed', :happy, :api do
    ssn = DynamoActions.increment_ssn
    loan = create_loan ssn, LoansByApi.loan_type.undergraduate_smart_option
    application_id = loan.body[:save_application_data_response][:save_application_data_result][:application_id]
    approve_smart_option_loan
    certify_loan application_id
    expect(certify_loan application_id).to be true
  end

  it 'Completes and certifies DTC loan ready to be disbursed', :happy, :api do
    ssn = DynamoActions.increment_ssn
    loan = create_loan ssn, LoansByApi.loan_type.bar_study
    application_id = loan.body[:save_application_data_response][:save_application_data_result][:application_id]
    approve_dtc_loan
    certify_loan application_id
    expect(certify_loan application_id).to be true
  end
end
