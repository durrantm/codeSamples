describe 'AO - Disbursement Search Bar' do
  p = load_page_objects 'atlas_office'

  include AtlasOfficeFormHelpers

  before :each do
    visit_atlas_office
  end

  it 'should view disbursement search page', :smoke do
    within_disbursement_search_frame do
      expect(find_by_id p.disbursement_management.search_bar).to be
    end
  end

  it 'should not bring up a disbursement result with an invalid search', :sad do
    within_disbursement_search_frame do
      fill_in p.disbursement_management.search_bar, with: 'NOT A DISBURSEMENT ID'
      find_by_id(p.disbursement_management.search_button).click
      expect(find p.disbursement_management.search_result_empty).to be
    end
  end

  it 'should bring up a disbursement result with a valid ssn search', :happy do
    within_disbursement_search_frame do
      fill_in p.disbursement_management.search_bar, with: '666-00-0000'
      find_by_id(p.disbursement_management.search_button).click
      sleep_medium
      expect(find_by_id p.disbursement_management.search_result_count).not_to eq 'Showing 0 to 0 of 0 entries'
    end
  end

  it 'should view disbursement information for a borrower', :happy do
    within_disbursement_search_frame do
      fill_in p.disbursement_management.search_bar, with: disbursement_id = '100529269-01'
      sleep_short
      find_by_id(p.disbursement_management.search_button).click
      @disbursement_details_tab = window_opened_by { click_link disbursement_id }
    end
    within_window @disbursement_details_tab do
      expect(page).to have_css(p.disbursement_management.projected_disb_date, text: '04/01/2019')
      expect(page).to have_css(p.disbursement_management.anticipated_disb_date, text: '04/01/2019')
      expect(page).to have_css(p.disbursement_management.disb_amount, text: '$5,000.00')
      expect(page).to have_css(p.disbursement_management.disb_sent_to, text: 'Borrower')
      expect(page).to have_css(p.disbursement_management.disb_recipient, text: 'TESTFIRST T TESTLAST')
      expect(page).to have_css(p.disbursement_management.disb_days, text: 'MTWThF')
    end
  end

  it 'should bring up a disbursement result and bring up additional disbursement details when clicked', :smoke do
    within_disbursement_search_frame do
      fill_in p.disbursement_management.search_bar, with: '666-00-0000'
      find_by_id(p.disbursement_management.search_button).click
      sleep_medium
      @additional_details = window_opened_by { first(p.disbursement_management.additional_details).click }
    end
    within_window @additional_details do
      expect(find p.disbursement_management.additional_details_label, text: 'Requested Loan Amount:').to be
    end
  end

  it 'should let me view my right to cancel disclosures for a disbursement', :smoke do
    within_disbursement_search_frame do
      fill_in p.disbursement_management.search_bar, with: '666-00-0000'
      find_by_id(p.disbursement_management.search_button).click
      sleep_medium
      @additional_details = window_opened_by { first(p.disbursement_management.additional_details).click }
    end
    within_window @additional_details do
      find_by_id(p.disbursement_management.right_to_cancel_disclosures_button).click
      expect(find_by_id p.disbursement_management.disclosure_header, text: 'Disclosure - Required').to be
    end
  end

  it 'should bring up a disbursement result with an valid search with CLUID' do
    within_disbursement_search_table p, '899984AT100715041' do
      rows = find 'tr', wait: sleep_medium
      @table_data_columns = rows.all 'td'
      expect(column 0).to eq '10071504101BS'
      expect(column 1).to eq 'AUTOFIRSTAUTOLAST343721184NANA'
      expect(column 2).to eq '02172019NANA'
      expect(column 3).to eq '200000InProcess'
      expect(column 4).to eq 'NANo'
      expect(column 5).to eq 'CheckAUTOFIRSTAUTOLAST'
      expect(column 6).to eq '00105100900905'
    end
  end

  private

  def within_disbursement_search_frame
    disbursement_management_tab = window_opened_by { click_link('Disbursement Management') }
    within_window disbursement_management_tab do
      yield
    end
  end

  def within_disbursement_search_table p, search_id
    within_disbursement_search_frame do
      fill_in p.disbursement_management.search_bar, with: search_id
      sleep_short
      find_by_id(p.disbursement_management.search_button).click
      sleep_short
      table_results = find_by_id p.disbursement_management.disbursement_search_table
    within table_results do
      yield
     end
    end
  end

  private

  def column number
    get_alphanumeric_only @table_data_columns[number].text
  end

end
