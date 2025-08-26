import ComponentDisplay from '../ComponentDisplay';

const textInputComponent = {
  name: 'Text input',
  description: 'Help users enter information with the text input component',
  preview: `<div class="govuk-form-group">
    <label class="govuk-label" for="event-name">
      Event name
    </label>
    <input class="govuk-input" id="event-name" name="event-name" type="text">
  </div>`,
  code: {
    html: `<div class="govuk-form-group">
  <label class="govuk-label" for="event-name">Event name</label>
  <input class="govuk-input" id="event-name" name="event-name" type="text">
</div>`,
    nunjucks: `{{ govukInput({
  label: {
    text: "Event name"
  },
  id: "event-name",
  name: "event-name"
}) }}`
  }
};

export default function TextInputPage() {
  return <ComponentDisplay component={textInputComponent} />;
}
