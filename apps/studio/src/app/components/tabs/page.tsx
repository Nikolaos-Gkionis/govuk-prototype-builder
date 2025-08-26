import ComponentDisplay from '../ComponentDisplay';

const tabsComponent = {
  name: 'Tabs',
  description: 'The tabs component lets users navigate between related sections of content',
  preview: `<div class="govuk-tabs" data-module="govuk-tabs">
    <h2 class="govuk-tabs__title">
      Contents
    </h2>
    <ul class="govuk-tabs__list">
      <li class="govuk-tabs__list-item govuk-tabs__list-item--selected">
        <a class="govuk-tabs__tab" href="#past-day">
          Past day
        </a>
      </li>
      <li class="govuk-tabs__list-item">
        <a class="govuk-tabs__tab" href="#past-week">
          Past week
        </a>
      </li>
      <li class="govuk-tabs__list-item">
        <a class="govuk-tabs__tab" href="#past-month">
          Past month
        </a>
      </li>
    </ul>
    <div class="govuk-tabs__panel" id="past-day">
      <h2 class="govuk-heading-l">Past day</h2>
      <table class="govuk-table">
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header">Case manager</th>
            <th scope="col" class="govuk-table__header">Cases opened</th>
            <th scope="col" class="govuk-table__header">Cases closed</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">David Francis</td>
            <td class="govuk-table__cell">3</td>
            <td class="govuk-table__cell">0</td>
          </tr>
          <tr class="govuk-table__row">
            <td class="govuk-table__cell">Paul Farmer</td>
            <td class="govuk-table__cell">1</td>
            <td class="govuk-table__cell">0</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-week">
      <h2 class="govuk-heading-l">Past week</h2>
      <p class="govuk-body">Past week data would be shown here.</p>
    </div>
    <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-month">
      <h2 class="govuk-heading-l">Past month</h2>
      <p class="govuk-body">Past month data would be shown here.</p>
    </div>
  </div>`,
  code: {
    html: `<div class="govuk-tabs" data-module="govuk-tabs">
  <h2 class="govuk-tabs__title">Contents</h2>
  <ul class="govuk-tabs__list">
    <li class="govuk-tabs__list-item govuk-tabs__list-item--selected">
      <a class="govuk-tabs__tab" href="#past-day">Past day</a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-week">Past week</a>
    </li>
  </ul>
  <div class="govuk-tabs__panel" id="past-day">
    <h2 class="govuk-heading-l">Past day</h2>
    <p class="govuk-body">Content for past day.</p>
  </div>
  <div class="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-week">
    <h2 class="govuk-heading-l">Past week</h2>
    <p class="govuk-body">Content for past week.</p>
  </div>
</div>`,
    nunjucks: `{{ govukTabs({
  items: [
    {
      label: "Past day",
      id: "past-day",
      panel: {
        html: "<h2 class='govuk-heading-l'>Past day</h2><p class='govuk-body'>Content for past day.</p>"
      }
    },
    {
      label: "Past week", 
      id: "past-week",
      panel: {
        html: "<h2 class='govuk-heading-l'>Past week</h2><p class='govuk-body'>Content for past week.</p>"
      }
    }
  ]
}) }}`
  }
};

export default function TabsPage() {
  return <ComponentDisplay component={tabsComponent} />;
}
