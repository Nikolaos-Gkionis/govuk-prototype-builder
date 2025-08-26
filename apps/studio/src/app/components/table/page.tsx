import ComponentDisplay from '../ComponentDisplay';

const tableComponent = {
  name: 'Table',
  description: 'Use the table component to make information easier to compare and scan for users',
  preview: `<table class="govuk-table">
    <caption class="govuk-table__caption govuk-table__caption--m">Monthly expenses</caption>
    <thead class="govuk-table__head">
      <tr class="govuk-table__row">
        <th scope="col" class="govuk-table__header">Month</th>
        <th scope="col" class="govuk-table__header">Rent</th>
        <th scope="col" class="govuk-table__header govuk-table__header--numeric">Food</th>
        <th scope="col" class="govuk-table__header govuk-table__header--numeric">Utilities</th>
      </tr>
    </thead>
    <tbody class="govuk-table__body">
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">January</th>
        <td class="govuk-table__cell">£850</td>
        <td class="govuk-table__cell govuk-table__cell--numeric">£200</td>
        <td class="govuk-table__cell govuk-table__cell--numeric">£120</td>
      </tr>
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">February</th>
        <td class="govuk-table__cell">£850</td>
        <td class="govuk-table__cell govuk-table__cell--numeric">£180</td>
        <td class="govuk-table__cell govuk-table__cell--numeric">£115</td>
      </tr>
      <tr class="govuk-table__row">
        <th scope="row" class="govuk-table__header">March</th>
        <td class="govuk-table__cell">£850</td>
        <td class="govuk-table__cell govuk-table__cell--numeric">£220</td>
        <td class="govuk-table__cell govuk-table__cell--numeric">£125</td>
      </tr>
    </tbody>
  </table>`,
  code: {
    html: `<table class="govuk-table">
  <caption class="govuk-table__caption govuk-table__caption--m">Monthly expenses</caption>
  <thead class="govuk-table__head">
    <tr class="govuk-table__row">
      <th scope="col" class="govuk-table__header">Month</th>
      <th scope="col" class="govuk-table__header">Rent</th>
      <th scope="col" class="govuk-table__header govuk-table__header--numeric">Food</th>
    </tr>
  </thead>
  <tbody class="govuk-table__body">
    <tr class="govuk-table__row">
      <th scope="row" class="govuk-table__header">January</th>
      <td class="govuk-table__cell">£850</td>
      <td class="govuk-table__cell govuk-table__cell--numeric">£200</td>
    </tr>
  </tbody>
</table>`,
    nunjucks: `{{ govukTable({
  caption: "Monthly expenses",
  captionClasses: "govuk-table__caption--m",
  head: [
    { text: "Month" },
    { text: "Rent" },
    { text: "Food", format: "numeric" }
  ],
  rows: [
    [
      { text: "January" },
      { text: "£850" },
      { text: "£200", format: "numeric" }
    ]
  ]
}) }}`
  }
};

export default function TablePage() {
  return <ComponentDisplay component={tableComponent} />;
}
