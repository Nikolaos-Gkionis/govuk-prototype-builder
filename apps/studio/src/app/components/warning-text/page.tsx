import ComponentDisplay from '../ComponentDisplay';

const warningTextComponent = {
  name: 'Warning text',
  description: 'Use the warning text component when you need to warn users about something important',
  preview: `<div class="govuk-warning-text">
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
      <span class="govuk-warning-text__assistive">Warning</span>
      You can be fined up to £5,000 if you do not register.
    </strong>
  </div>`,
  code: {
    html: `<div class="govuk-warning-text">
  <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
  <strong class="govuk-warning-text__text">
    <span class="govuk-warning-text__assistive">Warning</span>
    You can be fined up to £5,000 if you do not register.
  </strong>
</div>`,
    nunjucks: `{{ govukWarningText({
  text: "You can be fined up to £5,000 if you do not register.",
  iconFallbackText: "Warning"
}) }}`
  }
};

export default function WarningTextPage() {
  return <ComponentDisplay component={warningTextComponent} />;
}
