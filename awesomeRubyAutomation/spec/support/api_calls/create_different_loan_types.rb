module CreateDifferentLoanTypes
  def create_bar_study_loan ssn, lender_referral_id = '440410'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>UNIV OF ALABAMA</SchoolName>
                    <Degree>Juris Doctor</Degree>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <ExpectedGraduationDate>#{this_year + 1}-01-01T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <LicensureExamDate>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-15T09:00:00</LicensureExamDate>
                    <DOESchoolCode>001051</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <IsPreDefinedEnrollmentData>true</IsPreDefinedEnrollmentData>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_career_training_loan ssn, lender_referral_id = '429599'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>GRANDVIEW UNIVERSITY</SchoolName>
                    <Degree>CRT</Degree>
                    <Major>FLM</Major>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <YearInSchool>Freshman</YearInSchool>
                    <ExpectedGraduationDate>#{this_year + 2}-01-01T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>001867</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <EnrollmentStartDate>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-15T09:00:00</EnrollmentStartDate>
                    <EnrollmentEndDate>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-15T09:00:00</EnrollmentEndDate>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_dental_school_loan ssn, lender_referral_id = '432544'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>UNIV OF ALABAMA</SchoolName>
                    <Degree>DDS</Degree>
                    <Major>D03</Major>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <YearInSchool>First Year Masters/Doctorate</YearInSchool>
                    <ExpectedGraduationDate>#{this_year + 2}-12-23T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>001051</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <EnrollmentStartDate>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-15T09:00:00</EnrollmentStartDate>
                    <EnrollmentEndDate>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-15T09:00:00</EnrollmentEndDate>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_dental_residency_and_relocation_loan ssn, lender_referral_id = '440422'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>UNIV OF ALABAMA</SchoolName>
                    <Degree>DDS</Degree>
                    <Major>D05</Major>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <ExpectedGraduationDate>#{this_year + 1}-01-01T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>001051</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <IsPreDefinedEnrollmentData>true</IsPreDefinedEnrollmentData>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_health_graduate_smart_loan ssn, lender_referral_id = '440434'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
            <borrower>
               <SchoolInfo>
                  <SchoolName>ROSS UNIVERSITY SCHOOL OF MEDICINE</SchoolName>
                    <Degree>MD</Degree>
                    <Major>M08</Major>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <ExpectedGraduationDate>#{this_year + 1}-01-01T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>022460</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <IsPreDefinedEnrollmentData>true</IsPreDefinedEnrollmentData>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_k12_loan ssn, lender_referral_id = '429598'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>BERRY COLLEGE ELEMENTARY</SchoolName>
                    <YearInSchool>Fourth Grade</YearInSchool>
                    <ExpectedGraduationDate>#{this_year + 1}-01-01T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>605072</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <IsPreDefinedEnrollmentData>true</IsPreDefinedEnrollmentData>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_parent_loan ssn, lender_referral_id = '429600'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
    <s:Body>
      <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
        <borrower>
              <SchoolInfo>
                <Degree>Bachelors</Degree>
                <Major>FLM</Major>
                <SchoolName>UNIV OF ALABAMA</SchoolName>
                <EnrollmentStatus>FullTime</EnrollmentStatus>
                <YearInSchool>Freshman</YearInSchool>
                <ExpectedGraduationDate>#{this_year + 2}-09-23T09:00:00</ExpectedGraduationDate>
                <CostOfAttendance>20000</CostOfAttendance>
                <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                <RequestedLoanAmount>3000</RequestedLoanAmount>
                <DOESchoolCode>001051</DOESchoolCode>
                <DOEBranchCode>00</DOEBranchCode>
                <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                <EnrollmentStartDate>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-15T09:00:00</EnrollmentStartDate>
                <EnrollmentEndDate>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-15T09:00:00</EnrollmentEndDate>
              </SchoolInfo>" +
              general_information(ssn) +
              employment_and_housing +
              personal_contacts +
              validation_group_list(lender_referral_id) +
              footer
  end

  def create_mba_loan ssn, lender_referral_id = '430460'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>UNIV OF ALABAMA</SchoolName>
                    <Degree>MBA</Degree>
                    <Major>ACT</Major>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <YearInSchool>First Year Masters/Doctorate</YearInSchool>
                    <ExpectedGraduationDate>#{this_year + 2}-12-23T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>001051</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <EnrollmentStartDate>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-15T09:00:00</EnrollmentStartDate>
                    <EnrollmentEndDate>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-15T09:00:00</EnrollmentEndDate>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_medical_residency_and_relocation_loan ssn, lender_referral_id = '440446'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>UNIV OF CALIFORNIA IRVINE</SchoolName>
                    <Degree>Doctor of Medicine</Degree>
                    <Major>M10</Major>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <ExpectedGraduationDate>#{this_year + 1}-01-01T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>001314</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <IsPreDefinedEnrollmentData>true</IsPreDefinedEnrollmentData>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_medical_school_loan ssn, lender_referral_id = '432555'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
       <s:Body>
         <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
           <borrower>
               <SchoolInfo>
                  <SchoolName>UNIV OF CALIFORNIA IRVINE</SchoolName>
                    <Degree>Doctor of Medicine</Degree>
                    <Major>M01</Major>
                    <EnrollmentStatus>FullTime</EnrollmentStatus>
                    <YearInSchool>First Year Masters/Doctorate</YearInSchool>
                    <ExpectedGraduationDate>#{this_year + 2}-09-23T09:00:00</ExpectedGraduationDate>
                    <CostOfAttendance>20000</CostOfAttendance>
                    <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                    <RequestedLoanAmount>3000</RequestedLoanAmount>
                    <DOESchoolCode>001314</DOESchoolCode>
                    <DOEBranchCode>00</DOEBranchCode>
                    <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                    <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                    <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                    <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                    <EnrollmentStartDate>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-15T09:00:00</EnrollmentStartDate>
                    <EnrollmentEndDate>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-15T09:00:00</EnrollmentEndDate>
               </SchoolInfo>" +
               general_information(ssn) +
               employment_and_housing +
               personal_contacts +
               validation_group_list(lender_referral_id) +
               footer
  end

  def create_undergraduate_smart_option_loan ssn, lender_referral_id = '429593'
    "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">
    <s:Body>
      <SaveApplicationData xmlns=\"http://CampusDoor.Application.DataService/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">
        <borrower>
              <SchoolInfo>
                <Degree>Bachelors</Degree>
                <Major>FLM</Major>
                <SchoolName>UNIV OF ALABAMA</SchoolName>
                <EnrollmentStatus>FullTime</EnrollmentStatus>
                <YearInSchool>Freshman</YearInSchool>
                <ExpectedGraduationDate>#{this_year + 2}-09-23T09:00:00</ExpectedGraduationDate>
                <CostOfAttendance>20000</CostOfAttendance>
                <EstimatedFinancialAid>10000</EstimatedFinancialAid>
                <RequestedLoanAmount>3000</RequestedLoanAmount>
                <DOESchoolCode>001051</DOESchoolCode>
                <DOEBranchCode>00</DOEBranchCode>
                <AssumedDisbursementDate1>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-09T09:00:00</AssumedDisbursementDate1>
                <AssumedDisbursementDate2>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-09T09:00:00</AssumedDisbursementDate2>
                <AssumedDisbursementAmount1>1000.00</AssumedDisbursementAmount1>
                <AssumedDisbursementAmount2>1000.00</AssumedDisbursementAmount2>
                <EnrollmentStartDate>#{current_year_plus_months 6}-#{current_month_plus_months_number 6}-15T09:00:00</EnrollmentStartDate>
                <EnrollmentEndDate>#{current_year_plus_months 11}-#{current_month_plus_months_number 11}-15T09:00:00</EnrollmentEndDate>
              </SchoolInfo>" +
              general_information(ssn) +
              employment_and_housing +
              personal_contacts +
              validation_group_list(lender_referral_id) +
              footer
  end

  def general_information ssn
    '
                <LoanPersonInfo>
                <PersonType>Borrower</PersonType>
                <IsActive>true</IsActive>
                <Name>
                  <FirstName>AutoFirst</FirstName>
                  <LastName>AutoLast</LastName>
                </Name>
                <Address>
                  <Street1>1 Main St Apt 1</Street1>
                  <Street2>Apt#1</Street2>
                  <Street3/>
                  <CountryCode/>
                  <City>New York</City>
                  <State>NY</State>
                  <Zipcode>100440052</Zipcode>
                </Address>
                <SSN>' + ssn.to_s + '</SSN>
                <SSNConfirm>' + ssn.to_s + '</SSNConfirm>
                <IsNoSSN>false</IsNoSSN>
                <DOB>1994-01-01</DOB>
                <Citizenship>Citizen</Citizenship>
                <ResidencyLength>10</ResidencyLength>
                <PrimaryEmailAddress>test@salliemae.com</PrimaryEmailAddress>
                <PrimaryPhoneNumber>3173173171</PrimaryPhoneNumber>
                <SecondaryPhoneNumber/>
                <PrimaryIsCell>true</PrimaryIsCell>
                <SecondaryIsCell>false</SecondaryIsCell>
                <PrimaryAllowsTextMessaging xsi:nil="true"/>
                <SecondaryAllowsTextMessaging xsi:nil="true"/>
                <AcceptsEcommunications>true</AcceptsEcommunications>
                <AcceptsEsign>true</AcceptsEsign>
                <MilitaryLendingActCode>N</MilitaryLendingActCode>
                </LoanPersonInfo>'
  end
  def header
      '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
        <s:Body>
          <SaveApplicationData xmlns="http://CampusDoor.Application.DataService/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
  end
  def employment_and_housing
    '
              <LoanPersonEmployment>
                <ID xsi:nil="true"/>
                <EmployedCurrently>true</EmployedCurrently>
                <EmployerName>TestEmployer</EmployerName>
                <CurrentSalary>53500</CurrentSalary>
                <EmploymentLength>8</EmploymentLength>
                <Occupation>Pilot</Occupation>
                <EmployerPhone>6175551212</EmployerPhone>
                <EmployerPhoneExt/>
                <PreviousSalary xsi:nil="true"/>
                <OtherIncome xsi:nil="true"/>
                <OtherIncomeSource/>
                <EmploymentStatus>EmployedFT</EmploymentStatus>
                <EmployerAddressState xsi:nil="true"/>
                <EmploymentLength>8</EmploymentLength>
                <HouseholdIncomeAmount xsi:nil="true"/>
                <HouseholdIncomeSource/>
                <HasAdditionalIncome>false</HasAdditionalIncome>
              </LoanPersonEmployment>
              <LoanPersonHousing>
                <ID xsi:nil="true"/>
                <HousingStatus>Rent</HousingStatus>
                <HousingPayment>850</HousingPayment>
              </LoanPersonHousing>'
  end

  def personal_contacts
    '
                <LoanPersonReferenceList>
                  <LoanPersonReference>
                    <ID xsi:nil="true"/>
                    <ReferenceSeqNumber>1</ReferenceSeqNumber>
                    <Name>
                      <FirstName>TestMomFirst</FirstName>
                      <LastName>TestMomLast</LastName>
                    </Name>
                    <Relationship>Relative</Relationship>
                    <Phone>6175551212</Phone>
                  </LoanPersonReference>
                  <LoanPersonReference>
                    <ID xsi:nil="true"/>
                    <ReferenceSeqNumber>2</ReferenceSeqNumber>
                    <Name>
                      <FirstName>TestDadFirst</FirstName>
                      <LastName>TestDadLast</LastName>
                    </Name>
                    <Relationship>Relative</Relationship>
                    <Phone>6175551213</Phone>
                  </LoanPersonReference>
                </LoanPersonReferenceList>'
  end

  def validation_group_list lender_referral_id
    '
                 <UserName>Auto' + @usernum + '></UserName>
                 <LenderReferralVersionId>'+ lender_referral_id + '</LenderReferralVersionId>
              </borrower>
              <userName>Auto' + @usernum + '</userName>
              <RequestUserType>BO</RequestUserType>
              <SaveType xsi:nil="true"/>
              <ValidationGroupList>
                <string>BO_SchoolInfoModule</string>
                <string>BO_GeneralInfoModule</string>
                <string>BO_EmploymentInfoModule</string>
                <string>BO_PersonalContactsModule</string>
              </ValidationGroupList>'
  end

  def footer
    '
        </SaveApplicationData>
      </s:Body>
    </s:Envelope>'
  end
end
