describe 'LF - Cosigner' do
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
    find_by_id(p.cosigner_radio_button).click
    find_by_id(p.undergraduate_degree_radio_button).click
    select 'Indiana', from: p.state_drop_down
    expect(find_by_id(p.continue_loan_finder).disabled?).to eq true
  end
  it 'should recommend a Sallie Mae loan and have the correct school info in OLA', :happy do
    find_by_id(p.cosigner_radio_button).click
    find_by_id(p.undergraduate_degree_radio_button).click
    select 'Indiana', from: p.state_drop_down
    fill_out_school_loan_finder p, 'PURDUE UNIVERSITY'
    school = find_by_id(p.school_dropdown_loanfinder).value
    find_by_id(p.continue_loan_finder).click
    find_by_id(p.continue_to_ola).click
    ssn = DynamoActions.increment_ssn
    fill_out_cosigner_basic_information_and_ssn ola_p, ssn
    fill_out_cosigner_address ola_p
    continue ola_p
    expect(find 'label', text: school).to be
  end
end
