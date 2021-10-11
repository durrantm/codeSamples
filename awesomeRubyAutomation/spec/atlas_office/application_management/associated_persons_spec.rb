describe 'AO - Associate Person to a Loan' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers
  include LoanManagement
  include CreateDifferentLoanTypes
  include OLAFormHelpers

  it 'should have ability to view newly appended Person to a Loan ', :happy do
    application_id = get_incomplete_loan_application_id
    visit_atlas_office
    within_atlas_office_frame do
      @application_search_result = first_loan_search_result p, application_id
    end
    within_window @application_search_result do
      click_link p.application_management.associated_person
      click_button p.application_management.add_associated_person_button
      select('Other', from: p.application_management.associate_person_type).select_option
      fill_in p.application_management.associated_person_firstname, with: 'TestFirst'
      fill_in p.application_management.associated_person_last_name, with: 'TestLast'
      fill_in p.application_management.associated_person_dob, with: '06/23/1994'
      select('Friend', from: p.application_management.associated_person_relationship_borrower)
        .select_option
      fill_in p.application_management.associated_person_phone, with: ''
      fill_in p.application_management.associated_person_phone, with: '(22125)39000-0045'
      find_by_id(p.application_management.associated_person_save).click
      expect(find_by_id(p.application_management.associated_person_view_name).text).to eq 'TestFirst TestLast'
      expect(get_alphanumeric_only find_by_id(p.application_management.associated_person_view_phone)
                                               .text).to eq '2129000045'
    end
  end
end