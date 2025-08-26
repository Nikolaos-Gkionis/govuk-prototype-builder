import ComponentDisplay from '../ComponentDisplay';

const errorSummaryComponent = {
  name: 'Error summary',
  description: 'Show a summary of errors at the top of the page',
  preview: `<div class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" data-module="govuk-error-summary">
    <h2 class="govuk-error-summary__title" id="error-summary-title">
      There is a problem
    </h2>
    <div class="govuk-error-summary__body">
      <ul class="govuk-list govuk-error-summary__list">
        <li>
          <a href="#passport-issued-day">The date your passport was issued must be in the past</a>
        </li>
        <li>
          <a href="#postcode-input">Enter a postcode, like AA1 1AA</a>
        </li>
      </ul>
    </div>
  </div>`,
  code: {
    html: `<div class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert">
  <h2 class="govuk-error-summary__title" id="error-summary-title">
    There is a problem
  </h2>
  <div class="govuk-error-summary__body">
    <ul class="govuk-list govuk-error-summary__list">
      <li>
        <a href="#passport-issued-day">The date your passport was issued must be in the past</a>
      </li>
    </ul>
  </div>
</div>`,
    nunjucks: `{{ govukErrorSummary({
  titleText: "There is a problem",
  errorList: [
    {
      text: "The date your passport was issued must be in the past",
      href: "#passport-issued-day"
    }
  ]
}) }}`
  }
};

export default function ErrorSummaryPage() {
  return <ComponentDisplay component={errorSummaryComponent} />;
}
