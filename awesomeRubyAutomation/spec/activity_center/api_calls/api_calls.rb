include APIHelpers

describe "AC - Creates API calls for Activity Center", order: :defined do
  describe "Create Loan through SOAP API" do
    it "creates loan API call", :happy, :api do
      ssn = DynamoActions.increment_ssn
      puts 'soap ssn: ' + ssn.to_s
      usernum = ssn.to_s[-4..-1]
      puts 'soap usernum: ' + usernum
      xml_string = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
      <SaveApplicationData xmlns="http://CampusDoor.Application.DataService/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <borrower>
      <LoanPersonInfo>
      <Name>
      <FirstName>AutoFirst</FirstName>
      <LastName>AutoLast</LastName>
      </Name>
      <SSN>' + ssn.to_s + '</SSN>
      <SSNConfirm>' + ssn.to_s + '</SSNConfirm>
      <DOB>1994-01-01</DOB>
      <Citizenship>Citizen</Citizenship>
      <PrimaryEmailAddress>do-not-reply@salliemae.com</PrimaryEmailAddress>
      <PrimaryPhoneNumber>3173173171</PrimaryPhoneNumber>
      </LoanPersonInfo>
      <UserName>AutoUser' + usernum + '</UserName>
      <LenderReferralVersionId>139929</LenderReferralVersionId>
      </borrower>
      <userName>AutoUser' + usernum + '</userName>
      <ValidationGroupList>
      <string>BO_GeneralInfoModule</string>
      </ValidationGroupList>
      </SaveApplicationData>
      </s:Body>
      </s:Envelope>'
      client = Savon.client(
        :wsdl => "http://svc.atlas-preint.internal.slmbank.net/CampusDoor.Application.DataService/DataService.asmx?WSDL",
        :open_timeout => 10,
        :read_timeout => 10,
        :log => false
      )
      response = client.call :save_application_data, xml: xml_string
    end
  end

  describe "Create Account through REST API" do
    it "creates account", :happy, :api do
      ssn = DynamoActions.increment_ssn
      usernum = ssn.to_s[-4..-1]
      ssn_rest = insert_dashes(ssn.to_s)
      puts 'insert dashes: ' + ssn_rest
      puts 'rest usernum: ' + usernum
      payload = { "userName" => "AutoUser" + usernum,
                  "password" => "AutoPass$$44",
                  "ssn" => ssn_rest,
                  "remoteIPAddress" => "127.0.0.1",
                  "dob" => "01/01/1994",
                  "authenticate" => "Y",
                  "eMail" => "do-not-reply@salliemae.com",
                  "appName" => "PLOAN",
                  "autoPromote" => "Y",
                  "acceptedTos" => "SLMA",
                  "channel" => "Web",
                  "browserAgent" => "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
                  "timeZone" => "US/Eastern",
                  "screenHeightandWidth" => "90016000" }
      RestClient.post(
        'https://calmtest.internal.slmbank.net/CALMRest/service/createaccount?action=createAccount',
        payload.to_json,
        content_type: :json
      )
    end
  end

  describe "Create Loan through SOAP API and Create Account Associated with the Loan through REST API" do
    it "creates loan and account  API call", :happy do
      ssn = DynamoActions.increment_ssn
      puts 'soap ssn: ' + ssn.to_s
      usernum = ssn.to_s[-4..-1]
      puts 'soap usernum: ' + usernum
      xml_string = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
      <s:Body>
      <SaveApplicationData xmlns="http://CampusDoor.Application.DataService/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <borrower>
      <LoanPersonInfo>
      <Name>
      <FirstName>AutoFirst</FirstName>
      <LastName>AutoLast</LastName>
      </Name>
      <SSN>' + ssn.to_s + '</SSN>
      <SSNConfirm>' + ssn.to_s + '</SSNConfirm>
      <DOB>1994-01-01</DOB>
      <Citizenship>Citizen</Citizenship>
      <PrimaryEmailAddress>do-not-reply@salliemae.com</PrimaryEmailAddress>
      <PrimaryPhoneNumber>3173173171</PrimaryPhoneNumber>
      </LoanPersonInfo>
      <UserName>AutoUser' + usernum + '</UserName>
      <LenderReferralVersionId>139929</LenderReferralVersionId>
      </borrower>
      <userName>AutoUser' + usernum + '</userName>
      <ValidationGroupList>
      <string>BO_GeneralInfoModule</string>
      </ValidationGroupList>
      </SaveApplicationData>
      </s:Body>
      </s:Envelope>'
      client = Savon.client(
        :wsdl => "http://svc.atlas-preint.internal.slmbank.net/CampusDoor.Application.DataService/DataService.asmx?WSDL",
        :open_timeout => 10,
        :read_timeout => 10,
        :log => false
      )

      response = client.call :save_application_data, xml: xml_string
      puts 'rest ssn: ' + ssn.to_s
      ssn_with_dashes = insert_dashes ssn.to_s
      puts 'rest usernum: ' + usernum
      payload = { "userName" => "AutoUser" + usernum,
                  "password" => "AutoPass$$44",
                  "ssn" => ssn_with_dashes,
                  "remoteIPAddress" => "127.0.0.1",
                  "dob" => "01/01/1994",
                  "authenticate" => "Y",
                  "eMail" => "do-not-reply@salliemae.com",
                  "appName" => "PLOAN",
                  "autoPromote" => "Y",
                  "acceptedTos" => "SLMA",
                  "channel" => "Web",
                  "browserAgent" => "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
                  "timeZone" => "US/Eastern",
                  "screenHeightandWidth" => "90016000" }
      sleep 30
      RestClient.post(
        'https://calmtest.internal.slmbank.net/CALMRest/service/createaccount?action=createAccount',
        payload.to_json,
        content_type: :json
      )
    end
  end
end
