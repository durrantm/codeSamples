describe 'LF - Start Over' do
  p = load_page_objects 'loan_finder'
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
    expect(find'span', text: 'Loan Needs').to be
  end

  it 'should keep the continue button disabled if the school is not filled in', :sad do
    find_by_id(p.student_radio_button).click
    find_by_id(p.undergraduate_degree_radio_button).click
    select 'New York', from: p.state_dropdown
    expect(find_by_id(p.continue_loan_finder).disabled?).to eq true
  end

  it "should let you start over from the beginning of Loan Finder", :happy do
    find_by_id(p.student_radio_button).click
    find_by_id(p.undergraduate_degree_radio_button).click
    select 'New York', from: p.state_dropdown
    fill_out_school_loan_finder p, 'UNIV'
    school = find_by_id(p.school_dropdown_loanfinder).value
    find_by_id(p.continue_loan_finder).click
    find_by_id(p.start_over).click
    expect(page).to have_content 'Loan Needs'
  end
end
