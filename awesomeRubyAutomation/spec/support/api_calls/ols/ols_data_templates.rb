module OlsDataTemplates
  def username ssn
    "AutoUser#{ssn.to_s[-4..-1]}"
  end

  def user_credential ssn
    {
      'userName' => (username ssn),
      "password" => "AutoPass$$44"
    }
  end

  def user_detail ssn
    {
      'ssn' => (ssn.to_s),
      'dob' => '01/01/1994'
    }
  end

  def network_detail
    {
      'remoteIPAddress' => '127.0.0.1',
      'authenticate' => 'Y',
      'autoPromote' => 'Y',
      'channel' => 'Web',
      'acceptedTos' => 'SLMA',
      'timeZone' => 'US/Eastern'
    }
  end

  def browser_detail
    {
      'browserAgent' => %W['Mozilla/5.0 (Windows NT 6.1; Win64; x64)', 'AppleWebKit/537.36 (KHTML, like Gecko)',
                           'Chrome/59.0.3071.115 Safari/537.36'].join,
      'screenHeightandWidth' => '90016000'
    }
  end

  def loan_detail loan
    {
      'appName' => loan,
      'eMail' => 'do-not-reply@salliemae.com'
    }
  end
end
