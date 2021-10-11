module LoanManagement
  @@ola_p = RecursiveOpenStruct.new(YAML.load(File.read("spec/support/loans.yml")))
  @@documents_to_acknowledge = %w[CreditAcknowledgement ConsentToShareWithThirdPartyServiceProviders
                                  ElectronicDeliveryConsent LenderPrivacyPolicy PatriotAct LoanPacket LASD]
  def get_approved_dtc_loan
    ssn = DynamoActions.increment_ssn
    loan = create_loan ssn, @@ola_p.loan_type.bar_study
    application_id = loan.body[:save_application_data_response][:save_application_data_result][:application_id]
    approve_dtc_loan
    certify_loan application_id
    application_id
  end

  def get_incomplete_loan_application_id
    ssn = DynamoActions.increment_ssn
    loan = create_loan ssn, @@ola_p.loan_type.bar_study
    loan.body[:save_application_data_response][:save_application_data_result][:application_id]
  end

  def create_loan ssn, loan_type
    @ssn = ssn
    @usernum = ssn.to_s[-4..-1]
    @loan_application_data_xml = send "create_#{loan_type}".to_sym, ssn

    response = SoapRequest.make_soap_call_with_xml :save_application_data, @loan_application_data_xml
    expect(response.success?).to be
    @application_id = response.body[:save_application_data_response][:save_application_data_result][:application_id]
    @loan_person_id = response.body[:save_application_data_response][:save_application_data_result][:borrower_loan_person_id]
    response
  end

  def approve_smart_option_loan
    @@documents_to_acknowledge.each { |doc| acknowledge_document doc }
    submit_borrower_loan_application
    rate_and_repayment_info
    generate_borrower_loan_packet
    electronic_signature
    generate_borrower_application_disclosure
    approval_acceptance
    generate_borrower_approval_disclosure
    acknowledge_document 'LAD'
  end

  def approve_dtc_loan
    submit_borrower_loan_application
    generate_borrower_loan_packet
    electronic_signature
  end

  def certify_loan application_id
    application_to_certify = CertifyApplication.new application_id
    soap_request_message = application_to_certify.get_hash_for_certification_data
    get_soap_response = SoapRequest.make_soap_call_with_msg :certify_application, soap_request_message
    get_soap_response.success?
  end

  def get_loan_application_details application_id
    application_information = application_id.split('-')
    loan_application_id_message = {
      :ApplicationID => "#{application_information[0]}",
      :ApplicationTransactionID => "#{application_information[1]}"
    }
    SoapRequest.make_soap_call_with_msg(:get_application_details, loan_application_id_message)
               .doc.remove_namespaces!.to_xml
  end

  def acknowledge_document acknowledgement_code
    acknowledgement_indicator_message = {
      LoanPersonID: "#{@loan_person_id}",
      AcknowledgementTypeCode: "#{acknowledgement_code}",
      DispositionValue: "Accepted",
      IpAddress: "10.0.102.97",
      UserName: "Auto#{@usernum}"
    }
    response = SoapRequest.make_soap_call_with_msg :set_acknowledgement_indicator, acknowledgement_indicator_message
    expect(response.success?).to be
  end

  def submit_borrower_loan_application
    submit_application_message = {
      ApplicationID: "#{@application_id}",
      ApplicationTransactionID: "1",
      UserName: "Auto#{@usernum}",
      UserType: "CA",
      ActingUserType: "BO",
      IsDualApply: "false",
      StudentSharingConsent: "true"
    }
    response = SoapRequest.make_soap_call_with_msg :submit_application, submit_application_message
    expect(response.success?).to be
  end

  def rate_and_repayment_info
    rate_and_repayment_info_message = {
      ApplicationID: "#{@application_id}",
      ApplicationTransactionID: "1",
      RateType: "Variable",
      InterestRateSelector: "B",
      PaymentOption: "InterestOnly",
      RepaymentOptionSelector: "B",
      UserName: "Auto#{@usernum}"
    }
    response = SoapRequest.make_soap_call_with_msg :save_rate_repayment_info, rate_and_repayment_info_message
    expect(response.success?).to be
  end

  def approval_acceptance
    approval_acceptance_message = {
      ApplicationID: "#{@application_id}",
      ApplicationTransactionID: "1",
      RequestUserType: "BO",
      IPAddress: "10.0.102.97",
      UserName: "Auto#{@usernum}"
    }
    response = SoapRequest.make_soap_call_with_msg :save_approval_acceptance, approval_acceptance_message
    expect(response.success?).to be
  end

  def generate_borrower_loan_packet
    loan_packet_message = {
      ApplicationID: "#@application_id",
      ApplicationTransactionID: "1",
      RequestUserType: "BO",
      DocumentTypeList: { string: "MultipleImage" },
      UserName: "Auto#{@usernum}"
    }
    response = SoapRequest.make_soap_call_with_msg :generate_loan_packet, loan_packet_message
    expect(response.success?).to be
  end

  def generate_borrower_approval_disclosure
    approval_disclosure_message = {
      ApplicationID: "#@application_id",
      ApplicationTransactionID: "1",
      DocumentTypeList: { string: "MultipleImage" },
      UserName: "Auto#{@usernum}"
    }
    response = SoapRequest.make_soap_call_with_msg :generate_approval_disclosure, approval_disclosure_message
    expect(response.success?).to be
  end

  def electronic_signature
    electronic_signature_message = {
      ApplicationID: "#@application_id",
      ApplicationTransactionID: "1",
      RequestUserType: "BO",
      DocumentTypeList: { string: "MultipleImage" },
      IPAddress: "10.0.102.97",
      UserName: "Auto#{@usernum}"
    }
    response = SoapRequest.make_soap_call_with_msg :save_electronic_signature, electronic_signature_message
    expect(response.success?).to be
  end

  def generate_borrower_application_disclosure
    application_disclosure_message = {
      eCommunicationsFlag: "true",
      ApplicationID: "#@application_id",
      ApplicationTransactionID: "1",
      UserName: "Auto#{@usernum}",
      DocumentTypeList: { string: "MultipleImage" },
      RequestUserType: "BO"
    }
    response = SoapRequest.make_soap_call_with_msg :generate_application_disclosure, application_disclosure_message
    expect(response.success?).to be
  end
end
