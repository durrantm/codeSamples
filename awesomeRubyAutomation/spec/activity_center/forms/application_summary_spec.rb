describe 'AC - Application Summary', page_type: 'form', order: :defined do
  p = load_page_objects 'activity_center'

  include ActivityCenterFormHelpers
  include ActivityCenterFormSections
  include APIHelpers

  describe "Application Summary Page" do
    it "has header displayed correctly.", :smoke do
      goto_activity_center
      fill_out_login_credentials p
      login_continue p
      expect(page).to have_css 'h1', text: 'Application summary'
    end
  end

  describe "Complete Your Application page" do
    it "displays the OLA form correctly", :smoke do
      goto_activity_center
      fill_out_login_credentials p
      login_continue p
      application_summary_complete_your_application_click
      expect(page).to have_css 'div', text: 'Student General Information'
    end
  end

  private

  def application_summary_complete_your_application_click
    all(:css, '#link_resendInviteContainer').last.click
  end
end
