module LoanFinderFormHelpers
  def goto_page_loan_finder p
    visit URL.ola_base + '?NavPoint=APPLY&' + p.loan_type_id.loan_finder_url + p.loan_type_id.loan_finder_id
  end
end
