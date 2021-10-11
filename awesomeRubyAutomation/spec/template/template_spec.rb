describe 'Template Test', loan_type: 'template', page_type: 'form', order: :defined do
  p = load_page_objects 'ola'

  describe "Template Test Case" do
    it "exists for following tests to use as a template", :template do
      goto_page_ola(p.loan_type_id.career_training_loan_form)
      expect(true).to be
    end
  end
end
