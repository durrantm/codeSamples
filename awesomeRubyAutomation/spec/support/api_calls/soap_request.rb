module SoapRequest
  def self.get_wsdl
    return 'https://svc.atlas-sprint.internal.slmbank.net/CampusDoor.Application.DataService/Atlas.asmx?WSDL'
  end

  def self.get_endpoint
    'https://svc.atlas-sprint.internal.slmbank.net/CampusDoor.Application.DataService/Atlas.asmx'
  end

  def self.make_soap_call_with_xml request_operation, xml_message
    setup_soap_client.call request_operation, xml: xml_message
  end

  def self.make_soap_call_with_msg request_operation, hash_message
    setup_soap_client.call request_operation, message: hash_message
  end

  def self.setup_soap_client
    set_wsdl = get_wsdl
    set_endpoint = get_endpoint
    client = Savon.client do
      wsdl set_wsdl
      endpoint set_endpoint
      open_timeout 10
      read_timeout 10
      convert_request_keys_to :none
      ssl_verify_mode :none
    end
  end
end