describe 'AC - Login', page_type: 'form', order: :defined do
  p = load_page_objects 'activity_center'

  include ActivityCenterFormHelpers
  include ActivityCenterFormSections
  include APIHelpers

  describe "Login Form" do
    it "exists for following tests to use, otherwise they are skipped", :smoke do
      goto_activity_center
      expect(page.title).to match /ODS Phase 2 QA Testing/
    end
  end

  describe "Login Form - Username Blank" do
    it "has login credentials filled out incorrectly", :sad do
      goto_activity_center
      fill_out_login_credentials p
      fill_in p.login_username, with: ''
      login_continue p
      expect(page.title).to match /Login/
    end
  end

  describe "Login Form - Password Incorrect" do
    it "has login credentials filled out incorrectly", :sad do
      goto_activity_center
      fill_out_login_credentials p
      fill_in p.login_password, with: 'this_is_wrong_password!'
      login_continue p
      expect(page.title).to match /Log In/
    end
  end

  describe "Login Form" do
    it "has login credentials filled out correctly", :happy do
      goto_activity_center
      fill_out_login_credentials p
      login_continue p
      expect(page.title).to match /Sallie Mae Activity Center/
    end
  end
end
