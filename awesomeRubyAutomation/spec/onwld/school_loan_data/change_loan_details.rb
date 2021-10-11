describe 'ONWLD - Application Loan Details Page' do
  p = load_page_objects 'onwld'

  include ONWLDFormHelpers

  before :each do
    visit_onwld
    opennet_user_login p, 'autouser04'
  end

  it "is able to view the criteria search for pending disbursements ", :smoke do
    fill_in p.user_menu.school_id, with: '00258900'
    click_button p.user_menu.school_settings
    find_by_id(p.user_menu.inquiry_reporting).hover
    find_link(p.user_menu.pending_disbursements).click
    expect(page).to have_text('PRE-DISBURSEMENT SELECTION')
  end

  it "is not able to see pre-disbursement results with empty selection criteria ", :sad do
    fill_in p.user_menu.school_id, with: '00258900'
    click_button p.user_menu.school_settings
    find_by_id(p.user_menu.inquiry_reporting).hover
    find_link(p.user_menu.pending_disbursements).click
    click_button p.user_menu.submit_button
    expect(page).to have_text('Invalid Selection combination. At least Loan Period From date is required.')
  end

  it "is able to update loan details associated with a borrower's application", :happy do
    fill_in p.user_menu.school_id, with: '00258900'
    click_button p.user_menu.school_settings
    find_by_id(p.user_menu.inquiry_reporting).hover
    find_link(p.user_menu.pending_disbursements).click
    select "Last 6 Months", from: p.user_menu.disbursement_range
    click_button p.user_menu.submit_button
    page.all(p.user_menu.view_update)[2].click
    find_all(p.user_menu.update_loan_data).first.click
    select get_grade_level.sample, from: p.user_menu.grade_level
    select 'Full Time', from: p.user_menu.enrollment_status
    click_button p.user_menu.review_button
    click_button p.user_menu.submit_button
    expect(p.user_menu.view_app_details).to be
  end

  private

  def get_grade_level
    grade_level = %w(Freshman\ Undergraduate Sophomore\ Undergraduate Junior\ Undergraduate
                     Senior\ Undergraduate\ (Fourth\ Year) First\ Year\ Masters/Doctorate
                     Second\ Year\ Masters/Doctoratate Third\ Year\ Masters/Doctorate Fourth\ Year\ Masters/Doctorate)
  end
end
