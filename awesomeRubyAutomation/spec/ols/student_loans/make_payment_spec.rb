describe 'OLS - Make A Payment' do
  p = load_page_objects'ols'

  include SSNParts
  include OLSFormHelpers
  include OLSFormSections

  before :each do
    login p, '666189638qa3', 'SIT12345'
    check_for_post_login_prompts p, '03/12/1967', '9638'
  end

  it "has links for Student and Personal loans", :smoke do
    expect(page).to have_content 'Make a payment'
  end

  it 'catches an error when attempting to make an payment with a bank account', :sad do
    find_by_id(p.credit_card_payment).click
    fill_in p.payment_one, with: '0'
    sleep_short
    click_link p.make_a_payment
    expect(page).to have_content 'Payment Amount must be greater than zero'
  end

  it 'catches an error when user enters a wrong credit card number for visa', :sad do
    find_by_id(p.credit_card_payment).click
    fill_in p.payment_one, with: '0.01'
    fill_in p.credit_card_number, with: '5111111111111111'
    select '01', from: p.credit_card_exp_month
    select Date.today.year + 2, from: p.credit_card_exp_year
    click_link p.make_a_payment
    find(p.auto_debit_continue_payment).click if page.has_text? 'You have one or more loans in automatic debit.'
    find(p.payment_less_than_total_amount_continue).click
    expect(page).to have_content 'Card number must start with a 4'
  end

  it 'lets me make a credit card payment successfully', :happy do
    find_by_id(p.credit_card_payment).click
    fill_in p.payment_one, with: '0.01'
    fill_in p.credit_card_number, with: '4111111111111111'
    select '01', from: p.credit_card_exp_month
    select Date.today.year + 2, from: p.credit_card_exp_year
    click_link p.make_a_payment
    find(p.auto_debit_continue_payment).click if page.has_text? 'You have one or more loans in automatic debit.'
    find(p.payment_less_than_total_amount_continue).click
    find(p.submit_payment).click
    expect(page).to have_content 'Thank you for your payment. You will receive an email confirmation shortly'
  end
end
