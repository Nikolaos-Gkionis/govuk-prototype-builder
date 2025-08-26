import ComponentDisplay from '../ComponentDisplay';

const serviceNavigationComponent = {
  name: 'Service navigation',
  description: 'Help users navigate around your service',
  preview: `<nav class="govuk-service-navigation" aria-label="Service navigation">
    <div class="govuk-service-navigation__container govuk-width-container">
      <span class="govuk-service-navigation__service-name">
        <a href="#" class="govuk-service-navigation__link">Apply for a juggling licence</a>
      </span>
      <ul class="govuk-service-navigation__list">
        <li class="govuk-service-navigation__item">
          <a class="govuk-service-navigation__link" href="#" aria-current="page">
            Home
          </a>
        </li>
        <li class="govuk-service-navigation__item">
          <a class="govuk-service-navigation__link" href="#">
            About
          </a>
        </li>
        <li class="govuk-service-navigation__item">
          <a class="govuk-service-navigation__link" href="#">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </nav>`,
  code: {
    html: `<nav class="govuk-service-navigation" aria-label="Service navigation">
  <div class="govuk-service-navigation__container govuk-width-container">
    <span class="govuk-service-navigation__service-name">
      <a href="#" class="govuk-service-navigation__link">Apply for a juggling licence</a>
    </span>
    <ul class="govuk-service-navigation__list">
      <li class="govuk-service-navigation__item">
        <a class="govuk-service-navigation__link" href="#" aria-current="page">Home</a>
      </li>
      <li class="govuk-service-navigation__item">
        <a class="govuk-service-navigation__link" href="#">About</a>
      </li>
    </ul>
  </div>
</nav>`,
    nunjucks: `{{ govukServiceNavigation({
  serviceName: "Apply for a juggling licence",
  serviceUrl: "#",
  navigation: [
    { href: "#", text: "Home", current: true },
    { href: "#", text: "About" },
    { href: "#", text: "Contact" }
  ]
}) }}`
  }
};

export default function ServiceNavigationPage() {
  return <ComponentDisplay component={serviceNavigationComponent} />;
}
