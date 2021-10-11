find . -name '*_spec.rb' ! -name 'dynamo_spec.rb' ! -name 'template_spec.rb' -exec cat {} \; | # cat files based on name and exclude others \
grep -E '(describe | it | expect)' | # describe or it or expect \
sed 's/ do$//' | # No need for the do \
sed 's/, order\: \:defined//' | # No need for the order: :defined \
sed "s/\, page_type\: \'form\'//" | # No need for page_type: 'form' \
sed "s/\.value)/)/" | # No need for .value \
sed "s/ eq / equal /" | # Change 'eq' to 'equal' \
sed "s/ eq(/ equal (/" | # Change 'eq(' to 'equal (' \
sed "s/).to_s/)/" | # No need for .to_s \
sed -E "s/.(globals|\
loan_amount|\
loan_finder|\
school_management|\
lender_management|\
permanent_address|\
school_information|\
general_information|\
application_management|\
employment_information|\
disbursement_management\
)//" | # Remove scoping names in page object paths \
sed "s/.text)/)/" | # No need for .text \
sed $'s/^describe /\\\ndescribe /' | # Add linefeed between specs \
sed "s/(page\./(/" | # No need for page. \
sed -E "s/find_by_id ?//" | # No need for find_by_id \
sed -E "s/\(find ?/(/" | # No need for find statements \
sed -E "s/\(\(/(/;s/\)\)/)/" | # Remove double parens (( and )) to single parens ( and ) \
sed -E "s/\(p\./(/" | # No need for p. preceeding page objects \
sed -E "s/have_css/have/" | # make have_css more readable for business users \
sed -E "s/\.disabled\?\)\.to/.disabled\? to/" | # Fix parens issue with disabled? \
sed -E $'s/enddescribe/end\\\n\\\ndescribe/' | # Fix enddescribne issue \
sed '/^end$/d' | # Remove lines with just end on them \
grep -v 'xml_doc' | # Exclude these expects for api calls \
sed '1d' # Remove first (blank) line
