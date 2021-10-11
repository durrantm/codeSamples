describe 'AO - Application SSN Search' do
  p = load_page_objects 'atlas_office'
  loans = load_loans

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers
  include SSNParts

  before :each do
    visit_atlas_office
  end

  it 'should view the application search page', :smoke do
    within_atlas_office_frame { expect(find_by_id p.application_management.search_bar).to be }
  end

  it 'should view an error message from incorrect info entered in application search', :sad do
    within_atlas_office_frame do
      fill_in p.application_management.search_bar, with: 'this is invalid', wait: sleep_short
      find_by_id(p.application_management.search_button).click
      expect(page).to have_text("Invalid search criteria. Please use Name Search tab.")
    end
  end

  it 'should view updated borrower demographics information after editing date of birth', :happy, :api do
    ssn = create_loan_using_api loans.loan_type.career_training
    navigate_to_loan_application_tab p, ssn
    within_window @loan_application_tab do
      find_by_id(p.application_management.borrower_demographics_info).click
      within p.application_management.borrower_information do
        click_link 'Edit Borrower Demographics'
      end
      fill_in p.application_management.edit_borrower_demographics_dob, with: '1/2/1994'
      find(p.application_management.edit_borrower_demographics_save).click
      expect(page).to have_css(p.application_management.borrower_dob, text: '01/02/1994')
    end
  end

  it 'should enter information about a student for a parent loan', :happy, :api do
    ssn = create_loan_using_api loans.loan_type.parent
    navigate_to_loan_application_tab p, ssn
    within_window @loan_application_tab do
      click_link 'View/Edit Student Info'
      fill_in p.application_management.student_first_name, with: 'studentfirst'
      fill_in p.application_management.student_middle_initial, with: 'S'
      fill_in p.application_management.student_last_name, with: 'studentlast'
      fill_in p.application_management.student_ssn, with: '333720003'
      fill_in p.application_management.student_dob, with: '02022002'
      select 'US Citizen', from: p.application_management.student_citizenship
      find_by_id(p.application_management.save_student_info).click
      click_link 'View/Edit Student Info'
      expect(find_by_id(p.application_management.student_first_name).value).to eq 'studentfirst'
      expect(find_by_id(p.application_management.student_last_name).value).to eq 'studentlast'
      expect(find_by_id(p.application_management.student_middle_initial).value).to eq 'S'
      expect(find_by_id(p.application_management.student_ssn).value).to eq '333-72-0003'
      expect(find_by_id(p.application_management.student_dob).value).to eq '02/02/2002'
      expect(find_by_id(p.application_management.student_citizenship).value).to eq 'Citizen'
    end
  end

  it 'should view information for a borrower', :happy, :api do
    ssn = create_loan_using_api loans.loan_type.career_training
    navigate_to_loan_application_tab p, ssn
    within_window @loan_application_tab do
      find_by_id(p.application_management.borrower_application_info).click
      within p.application_management.borrower_information do
        expect(page).to have_css(p.application_management.borrower_loan_amount, text: '$3,000.00')
      end
      within p.application_management.borrower_school_information do
        expect(page).to have_css(p.application_management.borrower_school, text: 'GRANDVIEW UNIVERSITY')
        expect(page).to have_css(p.application_management.borrower_school_code, text: '001867')
        expect(page).to have_css(p.application_management.borrower_major, text: 'Film')
        expect(page).to have_css(p.application_management.borrower_degree_of_study, text: 'CRT')
        expect(page).to have_css(p.application_management.borrower_grade_level, text: 'Freshman Undergraduate')
        expect(page).to have_css(p.application_management.borrower_enrollment_status, text: 'FullTime')
        expect(page).to have_css(p.application_management.borrower_graduation_date, text: "01/01/#{this_year + 2}")
        expect(page).to have_css(p.application_management.borrower_loan_start_date, text:
        "#{current_month_plus_months_number 6}/15/#{current_year_plus_months 6}")
        expect(page).to have_css(p.application_management.borrower_loan_end_date, text:
        "#{current_month_plus_months_number 11}/15/#{current_year_plus_months 11}")
      end
    end
  end

  it 'should view general information for a borrower', :happy, :api do
    ssn = create_loan_using_api loans.loan_type.bar_study
    navigate_to_loan_application_tab p, ssn
    within_window @loan_application_tab do
      find_by_id(p.application_management.borrower_demographics_info).click
      within p.application_management.borrower_information do
        ssn_formatted = "#{first_three ssn}-#{middle_two ssn}-#{last_four ssn}"
        expect(page).to have_css(p.application_management.borrower_name, text: 'AUTOFIRST AUTOLAST')
        expect(page).to have_css(p.application_management.borrower_citizenship, text: 'Citizen')
        expect(page).to have_css(p.application_management.borrower_ssn, text: ssn_formatted)
        expect(page).to have_css(p.application_management.borrower_dob, text: '01/01/1994')
        expect(page).to have_css(p.application_management.borrower_permanent_address1, text: '1 Main St Apt 1')
        expect(page).to have_css(p.application_management.borrower_permanent_address2, text: 'Apt#1')
        expect(page).to have_css(p.application_management.borrower_permanent_city, text: 'New York')
        expect(page).to have_css(p.application_management.borrower_primary_phone_number, text: '(317) 317-3171')
      end
    end
  end

  it 'should view employment and housing information for a borrower', :happy, :api do
    ssn = create_loan_using_api loans.loan_type.k12
    navigate_to_loan_application_tab p, ssn
    within_window @loan_application_tab do
      find_by_id(p.application_management.borrower_application_info).click
      within p.application_management.borrower_information do
        expect(page).to have_css(p.application_management.borrower_occupation, text: 'Pilot')
        expect(page).to have_css(p.application_management.borrower_employer, text: 'TestEmployer')
        expect(page).to have_content('(617) 555-1212')
        expect(page).to have_content('8')
        expect(page).to have_css(p.application_management.borrower_housing_type, text: 'Rent')
        expect(page).to have_css(p.application_management.borrower_monthly_rent, text: '$850.00')
      end
    end
  end

  it 'should verify borrower and disbursement information with an api call', :happy do
    ssn = 333722958
    navigate_to_loan_application_tab p, ssn
    within_window @loan_application_tab do
      application_id = find(p.application_management.borrower_application_id, wait: sleep_short).text
      all_application_information = get_loan_application_details application_id
      xml_doc = Nokogiri::XML all_application_information
      expect(xml_doc.xpath("//FirstName")[1].text).to eq "TestDadFirst"
      expect(xml_doc.xpath("//LastName")[1].text).to eq "TestDadLast"
      expect(xml_doc.xpath("//Phone")[0].text).to eq "6175551213"
      expect(xml_doc.xpath("//Relationship")[0].text).to eq "Relative"
      expect(xml_doc.xpath("//FirstName")[2].text).to eq "TestMomFirst"
      expect(xml_doc.xpath("//LastName")[2].text).to eq "TestMomLast"
      expect(xml_doc.xpath("//Phone")[1].text).to eq "6175551212"
      expect(xml_doc.xpath("//Relationship")[1].text).to eq "Relative"
      expect(xml_doc.xpath("//RequestedLoanAmount").text).to eq "3000.00"
      expect(xml_doc.xpath("//AssumedDisbursementDate1").text).to eq "2019-08-09T09:00:00"
      expect(xml_doc.xpath("//AssumedDisbursementAmount1").text).to eq "1500.00"
      expect(xml_doc.xpath("//AssumedDisbursementDate2").text).to eq "2020-01-09T09:00:00"
      expect(xml_doc.xpath("//AssumedDisbursementAmount2").text).to eq "1500.00"
    end
  end

  it 'should view a personal loan after searching for it by SSN', :happy do
    visit_atlas_office
    ploan_ssn = '666545513'
    within_atlas_office_frame do
      fill_in p.application_management.search_bar, with: ploan_ssn, wait: sleep_short
      find_by_id(p.application_management.search_button).click
      expect(page).to have_text("BARBARA JONES")
    end
  end
end

private

def create_loan_using_api loan_type
  ssn = DynamoActions.increment_ssn
  create_loan ssn, loan_type
  ssn
end

def navigate_to_loan_application_tab p, ssn
  within_atlas_office_frame do
    @loan_application_tab = first_loan_search_result p, ssn
  end
end
