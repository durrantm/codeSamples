class OLSAccountBuilder
  def self.build ssn
    builder = new ssn
    yield builder
    builder.get_hash_data
  end

  def initialize ssn
    @ols_account = OLSAccount.new
    @ssn = ssn
  end

  def complete_account_details
    account_attributes_list.reduce({}, :merge)
  end

  def account_attributes_list
    [@ols_account.user_credential, @ols_account.loan_detail, @ols_account.user_detail, @ols_account.network_detail,
     @ols_account.browser_detail]
  end

  def set_user_credential user_credential = get_user_credential
    @ols_account.user_credential = user_credential
  end

  def set_user_personal user_detail = get_user_detail
    @ols_account.user_detail = user_detail
  end

  def set_network_info network_detail = get_network_detail
    @ols_account.network_detail = network_detail
  end

  def set_browser_info browser_detail = get_browser_detail
    @ols_account.browser_detail = browser_detail
  end

  def set_loan_info loan_detail = get_loan_detail
    @ols_account.loan_detail = loan_detail
  end

  private

  def get_user_credential
    {
      'userName' => ('AutoUser' + @ssn.to_s[-4..-1]),
      'password' => 'AutoPass$$44'
    }
  end

  def get_user_detail
    {
      'ssn' => (insert_dashes @ssn.to_s),
      'dob' => '01/01/1994'
    }
  end

  def get_network_detail
    {
      'remoteIPAddress' => '127.0.0.1',
      'authenticate' => 'Y',
      'autoPromote' => 'Y',
      'channel' => 'Web',
      'acceptedTos' => 'SLMA',
      'timeZone' => 'US/Eastern'
    }
  end

  def get_browser_detail
    {
      'browserAgent' => %W['Mozilla/5.0 (Windows NT 6.1; Win64; x64)', 'AppleWebKit/537.36 (KHTML, like Gecko)',
                           'Chrome/59.0.3071.115 Safari/537.36'].join,
      'screenHeightandWidth' => '90016000'
    }
  end

  def get_loan_detail
    {
      'appName' => 'PLOAN',
      'eMail' => 'do-not-reply@salliemae.com'
    }
  end
end
