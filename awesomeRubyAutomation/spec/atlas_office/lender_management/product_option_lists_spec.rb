describe 'AO - Product Option Page' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  it 'should view the product option page', :smoke do
    visit_atlas_office
    lender_management_tab = window_opened_by { click_link 'Lender Management' }
    within_window lender_management_tab do
      sleep_short
      click_link 'Product Option List'
      expect(find_by_id p.lender_management.product_option_table).to be
    end
  end
end
