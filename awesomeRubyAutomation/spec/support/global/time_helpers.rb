module TimeHelpers
  def get_iso8601_standard_date_time days_offset = 0
    %W[
    #{current_year_plus_days days_offset}-
      #{current_month_plus_days_number days_offset}-
      #{current_day_plus_days days_offset}
      T
      #{get_hours_minutes_seconds}
    ].join
  end

  def get_hours_minutes_seconds
    Time.now.strftime '%T'
  end

  def this_year
    Date.today.strftime('%Y').to_i
  end

  def current_year_plus_days days
    (Date.today + days).strftime '%Y'
  end

  def current_month_plus_days_number days
    (Date.today + days).strftime('%m')
  end

  def current_day_plus_days days
    (Date.today + days).strftime '%d'
  end

  def current_year_plus_one
    (Date.today >> 12).strftime '%Y'
  end

  def current_year_plus_months months
    (Date.today >> months).strftime '%Y'
  end

  def current_month_plus_months months
    (Date.today >> months).strftime '%b'
  end

  def current_month_plus_months_number months
    (Date.today >> months).strftime '%m'
  end

  def current_date
    Date.today.strftime '%m/%d/%Y'
  end
end