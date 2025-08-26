import ComponentDisplay from '../ComponentDisplay';

const breadcrumbsComponent = {
  name: 'Breadcrumbs',
  description: 'Help users understand where they are in the service',
  preview: `<div class="govuk-breadcrumbs">
    <ol class="govuk-breadcrumbs__list">
      <li class="govuk-breadcrumbs__list-item">
        <a class="govuk-breadcrumbs__link" href="#">Home</a>
      </li>
      <li class="govuk-breadcrumbs__list-item">
        <a class="govuk-breadcrumbs__link" href="#">Passports, travel and living abroad</a>
      </li>
      <li class="govuk-breadcrumbs__list-item">Travel abroad</li>
    </ol>
  </div>`,
  code: {
    html: `<div class="govuk-breadcrumbs">
  <ol class="govuk-breadcrumbs__list">
    <li class="govuk-breadcrumbs__list-item">
      <a class="govuk-breadcrumbs__link" href="#">Home</a>
    </li>
    <li class="govuk-breadcrumbs__list-item">
      <a class="govuk-breadcrumbs__link" href="#">Passports, travel and living abroad</a>
    </li>
    <li class="govuk-breadcrumbs__list-item">Travel abroad</li>
  </ol>
</div>`,
    nunjucks: `{{ govukBreadcrumbs({
  items: [
    {
      text: "Home",
      href: "#"
    },
    {
      text: "Passports, travel and living abroad", 
      href: "#"
    },
    {
      text: "Travel abroad"
    }
  ]
}) }}`
  }
};

export default function BreadcrumbsPage() {
  return <ComponentDisplay component={breadcrumbsComponent} />;
}
