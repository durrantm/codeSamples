describe 'AO - Pricing Codes Search Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it 'should view the pricing codes page', :smoke do
    visit_atlas_office
    lender_management_tab = window_opened_by { click_link 'Lender Management' }
    within_window lender_management_tab do
      sleep_short
      click_link 'Pricing Codes'
      expect(find_by_id(p.lender_management.add_new_pricing_code_button)).to be
    end
  end
end
