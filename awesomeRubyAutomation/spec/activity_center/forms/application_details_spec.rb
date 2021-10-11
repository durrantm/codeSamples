describe 'AC - Application Details', page_type: 'form', order: :defined do
  p = load_page_objects 'activity_center'

  include ActivityCenterFormHelpers
  include ActivityCenterFormSections
  include APIHelpers

  describe "Application Details Page" do
    it "has page load correctly", :smoke do
      goto_activity_center
      fill_out_login_credentials p
      login_continue p
      find(p.application_summary_dropdown).hover.find(p.application_summary_applications_dropdown).hover
      find_link(p.application_details).click
      expect(page).to have_css 'p', text: 'Application #'
    end
  end

  describe "Fill out Information Eligible Form - First Name Left Blank" do
    it "has form filled out incorrectly", :sad do
      goto_activity_center
      fill_out_login_credentials p
      login_continue p
      find(p.application_summary_dropdown).hover.find(p.application_summary_applications_dropdown).hover
      find_link(p.application_details).click
      information_eligible_click p
      information_eligible_fill_out_form p
      fill_in p.information_eligible_firstname, with: ''
      information_eligible_authorize_button_click p
      expect(page).to have_css 'label', text: 'Enter only alphabetical characters'
    end
  end

  describe "View Application History Form" do
    it "has page load correctly", :smoke do
      goto_activity_center
      fill_out_login_credentials p
      login_continue p
      find(p.application_summary_dropdown).hover.find(p.application_summary_applications_dropdown).hover
      find_link(p.application_details).click
      application_details_application_history_click p
      expect(page).to have_css 'h1', text: 'Application details'
    end
  end

  private

  def application_details_application_history_click p
    find(p.application_details_application_history).click
  end

  def information_eligible_fill_out_form p
    fill_in p.information_eligible_firstname, with: 'testFirst'
    fill_in p.information_eligible_lastname, with: 'testLast'
    select 'Father', from: p.information_eligible_relationship
    fill_in p.information_eligible_phone_number, with: '8675555309'
    fill_in p.information_eligible_email, with: 'test@test.com'
    fill_in p.information_eligible_street_address1, with: 'Street 1'
    fill_in p.information_eligible_street_address2, with: 'Street 2'
    fill_in p.information_eligible_city, with: 'Indianapolis'
    select 'Indiana', from: p.information_eligible_state
    fill_in p.information_eligible_zip_code, with: '10024'
  end

  def information_eligible_click p
    find(p.information_eligible_menu).click
  end

  def information_eligible_authorize_button_click p
    find_by_id(p.information_eligible_authorize_button).click
  end
end
