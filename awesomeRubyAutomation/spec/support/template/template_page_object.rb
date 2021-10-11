class TemplatePageObject
  def initialize
    load_page_object_file 'spec/support/template/template_page_objects.yml'
  end

  private

  def load_page_object_file file
    page_object = YAML.load File.read(file)
    page_object.each do |k, v|
      self.class.__send__ :define_method, k do v end
    end
  end
end
