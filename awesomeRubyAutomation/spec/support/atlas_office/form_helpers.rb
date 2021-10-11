module AtlasOfficeFormHelpers
  def visit_atlas_office
    visit URL.atlas_office
  end

  def within_atlas_office_frame
    application_management_tab = window_opened_by { click_link 'Application Management' }
    within_window application_management_tab do
      within_frame find_by_id 'AtlasOffice' do
        yield
      end
    end
  end

  def first_loan_search_result p, ssn
    fill_in p.application_management.search_bar, with: ssn, wait: sleep_short
    find_by_id(p.application_management.search_button).click
    window_opened_by { find_by_id(p.application_management.first_loan_result).click }
  end

  def navigate_to_school_main_page p, doe_code
    @school_management_tab = window_opened_by { click_link 'School Management' }
    within_window @school_management_tab do
      fill_in p.school_management.school_search_doe_code, with: doe_code
      find_by_id(p.school_management.doe_search_button).click
      click_link doe_code
      yield if block_given?
    end
  end

  def school_group_affiliation_toggle p
    if find_by_id(p.school_management.first_group_of_affiliations).value == true
      find_by_id(p.school_management.first_group_of_affiliations).set false
    else
      find_by_id(p.school_management.first_group_of_affiliations).set true
    end
  end

  def get_alphanumeric_only string
    string.gsub /[^a-zA-Z0-9]/, ''
  end
end
