class CertifyApplication
  def initialize application_id
    @application_id = application_id
  end

  def set_application_identification_data
    {
      'Request' => {
        'ApplicationID' => @application_id,
        'ApplicationTransactionID' => 1,
        'UserName' => '?'
      }
    }
  end

  def set_borrower_data
    { 'Request' => { 'BorrowerInformation' => {
      'PrimaryPhoneNumber' => 3173173171
    } } }
  end

  def set_enrollment_data
    { 'Request' => {
      'EnrollmentStartDate' => (get_iso8601_standard_date_time 5),
      'EnrollmentEndDate' => (get_iso8601_standard_date_time 125),
      'GradeLevel' => 'Freshman',
      'CourseOfStudy' => 'MRK',
      'EnrollmentStatus' => 'FullTime',
      'AnticipatedGradDate' => (get_iso8601_standard_date_time 200)
    } }
  end

  def set_certify_loan_amount_data
    { 'Request' => {
      'CertLoanAmount' => 2000,
      'SchoolUseOnly' => '?',
    } }
  end

  def set_disbursement_data
    { 'Request' => {
      'Disbursements' => ['DisbursementData' => {
        'UpdatedDate' => get_iso8601_standard_date_time,
        'UpdatedBy' => '?',
        'DisbursementDate' => (get_iso8601_standard_date_time 25),
        'GrossAmount' => 2000,
        'HoldReleaseValue' => 'Release',
        'DisbursementNumber' => 1
      }]
    } }
  end

  def merging_hash_data hash_one, hash_two
    hash_one.merge(hash_two) { |key, hash_one_value, hash_two_value| hash_one_value.merge hash_two_value }
  end

  def create_certify_application_data_hash
    hash = merging_hash_data set_application_identification_data, set_borrower_data
    hash = merging_hash_data hash, set_enrollment_data
    hash = merging_hash_data hash, set_certify_loan_amount_data
    hash = merging_hash_data hash, set_disbursement_data
  end

  def get_hash_for_certification_data
    create_certify_application_data_hash
  end
end
