describe 'AO - School Main Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  doe_code = '1326'

  before :each do
    visit_atlas_office
  end

  it 'is able to navigate to a main page for a school', :smoke do
    navigate_to_school_main_page(p, doe_code)
    expect(page).to have_text('School Main')
  end

  it 'is able to view the Branch List page', :smoke do
    navigate_to_school_main_page p, doe_code do
      click_link 'Branch List'
      expect(find_by_id p.school_management.school_branch_list_contact).to be
    end
  end

  it 'is able to view the Add Branch page', :smoke do
    navigate_to_school_main_page p, doe_code do
      click_link 'Add Branch'
      expect(find_by_id p.school_management.school_main_page_save_button).to be
    end
  end

  it 'is able to view the Contact List page', :smoke do
    navigate_to_school_main_page p, doe_code do
      click_link 'Contact List'
      expect(find_by_id p.school_management.contact_list_first_contact).to be
    end
  end

  it 'is able to view the Add Contact page', :smoke do
    navigate_to_school_main_page p, doe_code do
      click_link 'Add Contact'
      expect(find_by_id p.school_management.school_main_add_button).to be
    end
  end

  it 'is able to enter the edit mode for a school', :smoke do
    navigate_to_school_main_page p, doe_code do
      find_by_id(p.school_management.school_main_page_edit_button).click
      expect(find_by_id p.school_management.school_main_page_save_button).to be
    end
  end

  it 'is not able to save school information without a ticket number', :sad do
    navigate_to_school_main_page p, doe_code do
      find_by_id(p.school_management.school_main_page_edit_button).click
      school_group_affiliation_toggle p
      find_by_id(p.school_management.school_main_page_save_button).click
      find(p.school_management.ok_button_after_saving).click
      find_by_id(p.school_management.save_confirmation).click
      expect(page).to have_text('Ticket Number Cannot be empty')
    end
  end

  it 'is able to save new school information', :happy do
    navigate_to_school_main_page p, doe_code do
      find_by_id(p.school_management.school_main_page_edit_button).click
      school_group_affiliation_toggle p
      find_by_id(p.school_management.school_main_page_save_button).click
      find(p.school_management.ok_button_after_saving).click
      fill_in p.school_management.ticket_number, with: 'test'
      fill_in p.school_management.save_school_info_comment, with: 'test'
      find_by_id(p.school_management.save_confirmation).click
      expect(find_by_id(p.school_management.maintain_date).text).to eq(current_date)
    end
  end
end
