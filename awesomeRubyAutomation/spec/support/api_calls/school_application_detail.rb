class SchoolApplicationDetail
  def initialize application_id
    @application_id = application_id
  end

  def get_school_application_details_message_hash
    set_application_data
  end

  def set_application_data
    {
        'ApplicationID' => @application_id,
        'ApplicationTransactionID' => 1
    }
  end

end