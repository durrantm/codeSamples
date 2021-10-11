module OLAFormHelpers
  def goto_page_ola id
    visit URL.ola_base + '?NavPoint=APPLY&' + id
  end

  def goto_continue_link continue_code, page
    p = page
    local_path = '/Default.ashx?NavPoint=OLAINVITE&AccessCode='
    visit URL.ola_base + local_path + continue_code
  end

  def select_last_academic_period page
    p = page
    select all('#' + p.school_information.periods + ' option').last.text, from: p.periods
  end

  def extract_borrower_continue_code response
    continue_code_length = response.index("</BorrowerAccessCode>") - response.index("<BorrowerAccessCode>")
    continue_code_length = continue_code_length - 20
    continue_code_start_index = response.index("<BorrowerAccessCode>") + 20
    continue_code = response[continue_code_start_index, continue_code_length]
  end

  def create_loan_using_api_and_continue_to_school_info p, loan_type
    ssn = DynamoActions.increment_ssn
    api_response = create_loan ssn, loan_type
    borrower_continue_code = extract_borrower_continue_code api_response.to_s
    continue_application_from_api p, last_four(ssn), borrower_continue_code
    fill_in p.general_information.phone, with: '6175551212'
    if loan_type == 'parent_loan'
      select 'Parent', from: p.general_information.relationship_to_student
      continue p
    end
    continue p
    ssn
  end
end
