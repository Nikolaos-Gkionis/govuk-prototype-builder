import ComponentDisplay from '../ComponentDisplay';

const exitThisPageComponent = {
  name: 'Exit this page',
  description: 'Give users a way to quickly and safely exit a service, website or application',
  preview: `<div class="govuk-exit-this-page" data-module="govuk-exit-this-page">
    <a href="https://www.bbc.co.uk/weather" role="button" draggable="false" class="govuk-button govuk-exit-this-page__button govuk-button--warning" data-module="govuk-button govuk-exit-this-page">
      <span class="govuk-visually-hidden">Emergency</span> Exit this page
    </a>
    <div class="govuk-exit-this-page__indicator" aria-hidden="true"></div>
    <div class="govuk-exit-this-page__overlay" tabindex="-1"></div>
  </div>`,
  code: {
    html: `<div class="govuk-exit-this-page" data-module="govuk-exit-this-page">
  <a href="https://www.bbc.co.uk/weather" role="button" class="govuk-button govuk-exit-this-page__button govuk-button--warning">
    <span class="govuk-visually-hidden">Emergency</span> Exit this page
  </a>
</div>`,
    nunjucks: `{{ govukExitThisPage({
  redirectUrl: "https://www.bbc.co.uk/weather"
}) }}`
  }
};

export default function ExitThisPagePage() {
  return <ComponentDisplay component={exitThisPageComponent} />;
}
