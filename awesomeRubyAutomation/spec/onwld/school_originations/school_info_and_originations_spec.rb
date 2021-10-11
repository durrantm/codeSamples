describe "ONWLD - Originations" do
  p = load_page_objects 'onwld'

  include ONWLDFormHelpers

  before :each do
    visit_onwld
    opennet_user_login p, 'autouser01'
  end

  it "should search by DOE code for a school", :happy do
    fill_in p.school_activities.school_id_input, with: '00105100'
    find(p.school_activities.school_profile_button).click
    expect(page).to have_text 'UNIVERSITY OF ALABAMA'
  end

  it "should view loans awaiting certification for a school", :smoke do
    navigate_to_loan_list p
    expect(page).to have_text 'AWAITING CERTIFICATION RESULTS'
  end

  it "can cancel a loan awaiting certification", :happy do
    navigate_to_loan_list p
    page.all(p.school_activities.cancel_application)[0].click
    find(p.school_activities.cancel_loan_submit).click
    find(p.school_activities.view_updated_list).click
    expect(page).to have_text "AWAITING CERTIFICATION RESULTS"
  end

  it "can certify a loan for a school", :happy do
    navigate_to_loan_list p
    page.all(p.school_activities.certify_application)[0].click
    find_by_id(p.school_activities.submit_button).click
    find_by_id(p.school_activities.next_button).click
    find_by_id(p.school_activities.view_awaiting_list).click
    expect(page).to have_text "AWAITING CERTIFICATION RESULTS"
    expect(page).to have_text "Updated"
  end

  private

  def navigate_to_loan_list p
    fill_in p.school_activities.school_id_input, with: '00105100'
    find(p.school_activities.school_settings_button).click
    click_link('View Results', match: :first)
  end
end
