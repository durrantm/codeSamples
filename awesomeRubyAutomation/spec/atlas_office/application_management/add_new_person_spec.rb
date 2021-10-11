describe 'AO - Add New Person' do
  p = load_page_objects 'atlas_office'
  loans = load_loans

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers

  before :each do
    visit_atlas_office
  end

  it 'should load the add a person page', :smoke do
    within_atlas_office_frame do
      click_link 'Add Person'
      expect(find_by_id p.application_management.add_person_ssn_input).to be
    end
  end

  it 'should not let me create a person with an invalid SSN', :sad do
    within_atlas_office_frame do
      click_link 'Add Person'
      fill_in p.application_management.add_person_ssn_input, with: 'not an ssn'
      find_by_id(p.application_management.add_person_ssn_search_button).click
      expect(p.application_management.add_person_invalid_ssn_error).to be
    end
  end

  it 'should not let me create a new person with an existing SSN', :sad do
    ssn = DynamoActions.increment_ssn
    create_loan ssn, loans.loan_type.career_training
    within_atlas_office_frame do
      click_link 'Add Person'
      fill_in p.application_management.add_person_ssn_input, with: ssn
      find_by_id(p.application_management.add_person_ssn_search_button).click
      expect(p.application_management.add_person_ssn_exists_message).to be
      expect(find_by_id(p.application_management.add_person_first_name).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_last_name).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_ssn).value).to eq ssn.to_s
      expect(find_by_id(p.application_management.add_person_dob).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_address).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_city).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_state).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_zip_code).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_email).value).not_to be_empty
      expect(find_by_id(p.application_management.add_person_save_button).value).to be
    end
  end

  it 'should let me search for a created person using an SSN in application search', :happy do
    ssn = DynamoActions.increment_ssn
    within_atlas_office_frame do
      click_link 'Add Person'
      fill_in p.application_management.add_person_ssn_input, with: ssn
      find_by_id(p.application_management.add_person_ssn_search_button).click
      if (find_by_id(p.application_management.add_person_first_name).value).empty?
        fill_in p.application_management.add_person_first_name, with: 'testFirst'
        fill_in p.application_management.add_person_last_name, with: 'testLast'
        fill_in p.application_management.add_person_dob, with: '/01011967'
        fill_in p.application_management.add_person_address, with: '1 Test St'
        fill_in p.application_management.add_person_city, with: 'New York'
        select 'New York', from: p.application_management.add_person_state
        fill_in p.application_management.add_person_zip_code, with: '10024'
        fill_in p.application_management.add_person_phone_number, with: '3175551212'
        fill_in p.application_management.add_person_email, with: 'do-not-reply@salliemae.com'
      end
      find_by_id(p.application_management.add_person_save_button).click
      fill_in p.application_management.search_bar, with: ssn, wait: sleep_short
      find_by_id(p.application_management.search_button).click
      expect(page.has_content? ssn).to eq true
      expect(find_by_id(p.application_management.view_first_person_details)).to be
    end
  end
end