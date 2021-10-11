describe 'OLS - Make A Payment' do
  p = load_page_objects'ols'

  include SSNParts
  include OLSFormHelpers
  include OLSFormSections

  before :each do
    login p, '666545513qa3', 'Auto2018@'
    check_for_post_login_prompts p, '02/25/1970', '5513'
  end

  it "has links for Student and Personal loans", :smoke do
    expect(page).to have_content 'Make a payment'
  end

  it 'catches an error when attempting to make an payment with a bank account', :sad do
    fill_in p.payment_one, with: '0'
    click_link p.make_a_payment
    expect(page).to have_content 'Payment Amount must be greater than zero'
  end

  it 'lets me make a bank account payment successfully', :happy do
    fill_in p.payment_one, with: '3.00'
    click_link p.make_a_payment
    find(p.continue_payment).click if page.has_text? p.paid_payment_detected
    find(p.pending_payment_continue).click if page.has_css? p.pending_payment_continue
    find(p.payment_less_than_total_amount_continue).click
    find(p.submit_payment).click
    expect(page).to have_content 'Thank you for your payment. You will receive an email confirmation shortly'
  end
end
