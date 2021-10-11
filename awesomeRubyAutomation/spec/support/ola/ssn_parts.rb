module SSNParts
  def first_three ssn
    ssn.to_s[0..2]
  end

  def middle_two ssn
    ssn.to_s[3..4]
  end

  def last_four ssn
    ssn.to_s[5..8]
  end
end
