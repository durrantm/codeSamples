module LoanFinderFormSections
  def fill_out_school_loan_finder p, school
    fill_in p.school_dropdown_loanfinder, with: school
    find p.choose_school, visible: true, wait: Sleep_lengths[:medium]
    select_first_school p.school_dropdown_loanfinder
  end
end
