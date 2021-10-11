describe 'AO - School Search Bar' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  doe_code = '001051'

  before :each do
    visit_atlas_office
    @school_management_tab = window_opened_by { click_link 'School Management' }
  end

  it 'should view the school search page', :smoke do
    within_window @school_management_tab do
      expect(find_by_id p.school_management.name).to be
    end
  end

  it 'should not bring up search results with an invalid DOE code search', :sad do
    within_window @school_management_tab do
      fill_in p.school_management.doe_search_bar, with: 'F'
      find_by_id(p.school_management.search_by_doe_button).click
      expect(find_by_id p.school_management.search_error)
    end
  end

  it 'should bring up correct school name with a valid DOE code search', :happy do
    within_window @school_management_tab do
      fill_in p.school_management.doe_search_bar, with: doe_code
      find_by_id(p.school_management.search_by_doe_button).click
      expect(page).to have_text('UNIV OF ALABAMA')
    end
  end

  it 'should bring up correct search results with a valid wild card search', :happy do
    within_window @school_management_tab do
      fill_in p.school_management.name, with: 'UNIV OF ALA%'
      find_by_id(p.school_management.search_by_name_button).click
      expect(page).to have_text('UNIV OF ALABAMA')
    end
  end

  it 'should bring up correct school main page by clicking DOE link', :happy do
    within_window @school_management_tab do
      fill_in p.school_management.doe_search_bar, with: doe_code
      find_by_id(p.school_management.search_by_doe_button).click
      find_link(doe_code).click
      expect(page).to have_text('UNIV OF ALABAMA')
    end
  end

  it 'should bring up correct school branch page by clicking branch image link', :happy do
    within_window @school_management_tab do
      fill_in p.school_management.doe_search_bar, with: doe_code
      find_by_id(p.school_management.search_by_doe_button).click
      find(p.school_management.branch_link_image).click
      expect(page).to have_text('UNIV OF ALABAMA')
    end
  end

  it 'should bring up correct school contact list page by clicking contact image link', :happy do
    within_window @school_management_tab do
      fill_in p.school_management.doe_search_bar, with: doe_code
      find_by_id(p.school_management.search_by_doe_button).click
      find(p.school_management.contact_link_image).click
      expect(page).to have_text('UNIV OF ALABAMA')
    end
  end
end

