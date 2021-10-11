describe 'Verify School Application Details' do
  @@SchoolResponse = :get_school_application_details_response
  @@SchoolResult = :get_school_application_details_result

  it 'Verifying school detail using CommonLine Unique ID', :happy, :api do
    school_application_details = SchoolApplicationDetail.new 100710491
    school_detail_message = school_application_details.get_school_application_details_message_hash
    response = SoapRequest.make_soap_call_with_msg :get_school_application_details, school_detail_message
    expect(response.success?).to be true
    response.body[@@SchoolResponse][@@SchoolResult][:status_details][:commonline_unique_id].eql? '0899984AT100710491'
  end
end
