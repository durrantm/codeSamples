module APIHelpers
  def pad_it_with_zeroes number_in
    zero_padding = ''
    size_of_num = number_in.to_s.size
    leading_zeroes = 5 - size_of_num
    spaces = leading_zeroes.times { |zero| zero_padding += '0' }
    zero_padding + number_in.to_s
  end

  def insert_dashes number_in
    number_in.insert(3, '-').insert 6, '-'
  end
end
