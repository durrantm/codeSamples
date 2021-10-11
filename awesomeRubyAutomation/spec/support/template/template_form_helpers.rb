module TemplateFormHelpers
  def goto_page url, id, p
    visit_url url, id, p
  end

  def visit_url path, id, page
    p = page
    local_path = '?NavPoint=APPLY&'
    visit local_path + id
  end
end
