describe 'LF - Graduate' do
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
    find_by_id(p.student_radio_button).click
    find_by_id(p.graduate_radio_button).click
    find_by_id(p.phd_radio_button).click
    expect(find_by_id(p.continue_loan_finder).disabled?).to eq true
    select 'New York', from: p.state_dropdown
    expect(find_by_id(p.continue_loan_finder).disabled?).to eq true
  end

  it 'should recommend a Sallie Mae loan and have the correct school info in OLA', :happy do
    find_by_id(p.student_radio_button).click
    find_by_id(p.graduate_radio_button).click
    find_by_id(p.phd_radio_button).click
    select 'New York', from: p.state_dropdown
    fill_out_school_loan_finder p, 'UNIV'
    school = find_by_id(p.school_dropdown_loanfinder).value
    find_by_id(p.continue_loan_finder).click
    find_by_id(p.continue_to_ola).click
    ssn = DynamoActions.increment_ssn
    fill_out_basic_information_form ola_p, ssn, parent = true
    confirm_date_of_birth ola_p
    fill_out_address ola_p
    expect(find 'label', text: school).to be
    expect(find 'label', text: 'Doctorate (PHD)').to be
  end
end
