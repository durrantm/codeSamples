describe 'OLA - Student Loan Products', loan_type: 'commerce', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'
  loans = load_loans
  
  include OLAFormHelpers
  include OLAFormSections
  include ExpectHelpers
  include SSNParts
  include LoanManagement
  include SoapRequest
  include CreateDifferentLoanTypes

  describe "Your Future Education Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_page_ola loans.loan_type_id.your_future_education_loan
      expect(find p.globals.main_form).to be
    end
  end
end
