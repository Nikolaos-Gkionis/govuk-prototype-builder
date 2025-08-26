import ComponentDisplay from '../ComponentDisplay';

const summaryListComponent = {
  name: 'Summary list',
  description: 'Use the summary list to summarise information, for example, a user\'s responses at the end of a form',
  preview: `<dl class="govuk-summary-list">
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Name
      </dt>
      <dd class="govuk-summary-list__value">
        Sarah Philips
      </dd>
      <dd class="govuk-summary-list__actions">
        <a class="govuk-link" href="#">
          Change<span class="govuk-visually-hidden"> name</span>
        </a>
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Date of birth
      </dt>
      <dd class="govuk-summary-list__value">
        5 January 1978
      </dd>
      <dd class="govuk-summary-list__actions">
        <a class="govuk-link" href="#">
          Change<span class="govuk-visually-hidden"> date of birth</span>
        </a>
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Address
      </dt>
      <dd class="govuk-summary-list__value">
        72 Guild Street<br>London<br>SE23 6FH
      </dd>
      <dd class="govuk-summary-list__actions">
        <a class="govuk-link" href="#">
          Change<span class="govuk-visually-hidden"> address</span>
        </a>
      </dd>
    </div>
    <div class="govuk-summary-list__row">
      <dt class="govuk-summary-list__key">
        Contact details
      </dt>
      <dd class="govuk-summary-list__value">
        <p class="govuk-body">07700 900457</p>
        <p class="govuk-body">sarah.phillips@example.com</p>
      </dd>
      <dd class="govuk-summary-list__actions">
        <a class="govuk-link" href="#">
          Change<span class="govuk-visually-hidden"> contact details</span>
        </a>
      </dd>
    </div>
  </dl>`,
  code: {
    html: `<dl class="govuk-summary-list">
  <div class="govuk-summary-list__row">
    <dt class="govuk-summary-list__key">Name</dt>
    <dd class="govuk-summary-list__value">Sarah Philips</dd>
    <dd class="govuk-summary-list__actions">
      <a class="govuk-link" href="#">Change<span class="govuk-visually-hidden"> name</span></a>
    </dd>
  </div>
  <div class="govuk-summary-list__row">
    <dt class="govuk-summary-list__key">Date of birth</dt>
    <dd class="govuk-summary-list__value">5 January 1978</dd>
    <dd class="govuk-summary-list__actions">
      <a class="govuk-link" href="#">Change<span class="govuk-visually-hidden"> date of birth</span></a>
    </dd>
  </div>
</dl>`,
    nunjucks: `{{ govukSummaryList({
  rows: [
    {
      key: {
        text: "Name"
      },
      value: {
        text: "Sarah Philips"
      },
      actions: {
        items: [
          {
            href: "#",
            text: "Change",
            visuallyHiddenText: "name"
          }
        ]
      }
    }
  ]
}) }}`
  }
};

export default function SummaryListPage() {
  return <ComponentDisplay component={summaryListComponent} />;
}
