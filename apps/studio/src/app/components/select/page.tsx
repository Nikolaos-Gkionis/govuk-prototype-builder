import ComponentDisplay from '../ComponentDisplay';

const selectComponent = {
  name: 'Select',
  description: 'The select component should only be used as a last resort in public-facing services',
  preview: `<div class="govuk-form-group">
    <label class="govuk-label" for="sort">
      Sort by
    </label>
    <select class="govuk-select" id="sort" name="sort">
      <option value="published">Recently published</option>
      <option value="updated" selected>Recently updated</option>
      <option value="views">Most views</option>
      <option value="comments">Most comments</option>
    </select>
  </div>`,
  code: {
    html: `<div class="govuk-form-group">
  <label class="govuk-label" for="sort">Sort by</label>
  <select class="govuk-select" id="sort" name="sort">
    <option value="published">Recently published</option>
    <option value="updated" selected>Recently updated</option>
    <option value="views">Most views</option>
    <option value="comments">Most comments</option>
  </select>
</div>`,
    nunjucks: `{{ govukSelect({
  id: "sort",
  name: "sort",
  label: {
    text: "Sort by"
  },
  items: [
    {
      value: "published",
      text: "Recently published"
    },
    {
      value: "updated",
      text: "Recently updated",
      selected: true
    }
  ]
}) }}`
  }
};

export default function SelectPage() {
  return <ComponentDisplay component={selectComponent} />;
}
