describe 'AO - Configuration Owner Search Bar' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  before :each do
    visit_atlas_office
    @lender_management_tab = window_opened_by { click_link 'Lender Management' }
  end

  it 'should view the configuration owner search', :smoke do
    within_window @lender_management_tab do
      sleep_short
      expect(find_by_id p.lender_management.configuration_owner_name_search_bar).to be
    end
  end

  it 'not return a configuration owner with an invalid search', :sad do
    within_window @lender_management_tab do
      sleep_short
      fill_in p.lender_management.configuration_owner_name_search_bar, with: 'Invalid Search'
      find_by_id(p.lender_management.search_button).click
      expect(find_by_id p.lender_management.search_error).to be
    end
  end

  it 'view the first configuration owner edit page using the wild card character, %', :happy do
    within_window @lender_management_tab do
      sleep_short
      fill_in p.lender_management.configuration_owner_name_search_bar, with: '%'
      find_by_id(p.lender_management.search_button).click
      find_by_id(p.lender_management.edit_first_result_config_owner).click
      expect(find_by_id p.lender_management.config_owner_name, text: 'Sallie Mae').to be
    end
  end
end
