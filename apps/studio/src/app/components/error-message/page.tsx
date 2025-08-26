import ComponentDisplay from '../ComponentDisplay';

const errorMessageComponent = {
  name: 'Error message',
  description: 'Show an error message next to the field and in the error summary',
  preview: `<div class="govuk-form-group govuk-form-group--error">
    <label class="govuk-label" for="national-insurance-number">
      National Insurance number
    </label>
    <div id="national-insurance-number-hint" class="govuk-hint">
      It's on your National Insurance card, benefit letter, payslip or P60. For example, 'QQ 12 34 56 C'.
    </div>
    <p id="national-insurance-number-error" class="govuk-error-message">
      <span class="govuk-visually-hidden">Error:</span> Enter a National Insurance number in the correct format
    </p>
    <input class="govuk-input govuk-input--error" id="national-insurance-number" name="national-insurance-number" type="text" aria-describedby="national-insurance-number-hint national-insurance-number-error">
  </div>`,
  code: {
    html: `<div class="govuk-form-group govuk-form-group--error">
  <label class="govuk-label" for="national-insurance-number">
    National Insurance number
  </label>
  <p id="national-insurance-number-error" class="govuk-error-message">
    <span class="govuk-visually-hidden">Error:</span> Enter a National Insurance number in the correct format
  </p>
  <input class="govuk-input govuk-input--error" id="national-insurance-number" name="national-insurance-number" type="text" aria-describedby="national-insurance-number-error">
</div>`,
    nunjucks: `{{ govukInput({
  label: {
    text: "National Insurance number"
  },
  id: "national-insurance-number",
  name: "national-insurance-number",
  errorMessage: {
    text: "Enter a National Insurance number in the correct format"
  }
}) }}`
  }
};

export default function ErrorMessagePage() {
  return <ComponentDisplay component={errorMessageComponent} />;
}
