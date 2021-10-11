describe 'LF - Parent', page_type: 'form', order: :defined do
  p = load_page_objects 'loan_finder'
  ola_p = load_page_objects 'ola'
  loans = load_loans

  include LoanFinderFormHelpers
  include LoanFinderFormSections
  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts

  before :each do
    goto_page_loan_finder loans
  end

  it 'should load the page', :smoke do
    expect(find 'span', text: 'Loan Needs').to be
  end

  it 'should keep the continue button disabled if the school is not filled in', :sad do
    find_by_id(p.parent_or_sponsor_radio_button).click
    find_by_id(p.k12_radio_button).click
    select 'California', from: p.state_drop_down
    fill_in p.school_dropdown_loanfinder, with: 'school not found'
    expect(find_by_id(p.continue_loan_finder).disabled?).to eq true
  end

  it 'should recommend a Sallie Mae loan and have the correct school info in OLA', :happy do
    find_by_id(p.parent_or_sponsor_radio_button).click
    find_by_id(p.k12_radio_button).click
    select 'California', from: p.state_drop_down
    fill_out_school_loan_finder p, 'DUNN SCHOOL'
    school = find_by_id(p.school_dropdown_loanfinder).value
    find_by_id(p.continue_loan_finder).click
    find_by_id(p.continue_to_ola).click
    ssn = DynamoActions.increment_ssn
    fill_out_basic_information_form ola_p, ssn, parent = true
    confirm_date_of_birth ola_p
    fill_out_address ola_p
    expect(page).to have_content school
  end
end
