import ComponentDisplay from '../ComponentDisplay';

const textareaComponent = {
  name: 'Textarea',
  description: 'Help users enter longer text with the textarea component',
  preview: `<div class="govuk-form-group">
    <label class="govuk-label" for="more-detail">
      Can you provide more detail?
    </label>
    <div id="more-detail-hint" class="govuk-hint">
      Do not include personal or financial information.
    </div>
    <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint"></textarea>
  </div>`,
  code: {
    html: `<div class="govuk-form-group">
  <label class="govuk-label" for="more-detail">Can you provide more detail?</label>
  <div id="more-detail-hint" class="govuk-hint">
    Do not include personal or financial information.
  </div>
  <textarea class="govuk-textarea" id="more-detail" name="more-detail" rows="5" aria-describedby="more-detail-hint"></textarea>
</div>`,
    nunjucks: `{{ govukTextarea({
  name: "more-detail",
  id: "more-detail",
  label: {
    text: "Can you provide more detail?"
  },
  hint: {
    text: "Do not include personal or financial information."
  }
}) }}`
  }
};

export default function TextareaPage() {
  return <ComponentDisplay component={textareaComponent} />;
}
