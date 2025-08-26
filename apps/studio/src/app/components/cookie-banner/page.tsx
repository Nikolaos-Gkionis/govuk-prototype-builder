import ComponentDisplay from '../ComponentDisplay';

const cookieBannerComponent = {
  name: 'Cookie banner',
  description: 'Allow users to accept or reject cookies that are not essential to making your service work',
  preview: `<div class="govuk-cookie-banner " data-nosnippet role="region" aria-label="Cookies on [name of service]">
    <div class="govuk-cookie-banner__message govuk-width-container">
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h2 class="govuk-cookie-banner__heading govuk-heading-m">Cookies on this government service</h2>
          <div class="govuk-cookie-banner__content">
            <p class="govuk-body">We use some essential cookies to make this service work.</p>
            <p class="govuk-body">We'd also like to use analytics cookies so we can understand how you use the service and make improvements.</p>
          </div>
        </div>
      </div>
      <div class="govuk-button-group">
        <button value="accept" type="button" name="cookies" class="govuk-button" data-module="govuk-button">
          Accept analytics cookies
        </button>
        <button value="reject" type="button" name="cookies" class="govuk-button govuk-button--secondary" data-module="govuk-button">
          Reject analytics cookies
        </button>
        <a class="govuk-link" href="#">View cookies</a>
      </div>
    </div>
  </div>`,
  code: {
    html: `<div class="govuk-cookie-banner" data-nosnippet role="region" aria-label="Cookies on [name of service]">
  <div class="govuk-cookie-banner__message govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h2 class="govuk-cookie-banner__heading govuk-heading-m">Cookies on this government service</h2>
        <div class="govuk-cookie-banner__content">
          <p class="govuk-body">We use some essential cookies to make this service work.</p>
        </div>
      </div>
    </div>
    <div class="govuk-button-group">
      <button value="accept" type="button" name="cookies" class="govuk-button">
        Accept analytics cookies
      </button>
    </div>
  </div>
</div>`,
    nunjucks: `{{ govukCookieBanner({
  ariaLabel: "Cookies on [name of service]",
  messages: [
    {
      headingText: "Cookies on this government service",
      html: "<p class='govuk-body'>We use some essential cookies to make this service work.</p>",
      actions: [
        {
          text: "Accept analytics cookies",
          type: "button",
          name: "cookies",
          value: "accept"
        }
      ]
    }
  ]
}) }}`
  }
};

export default function CookieBannerPage() {
  return <ComponentDisplay component={cookieBannerComponent} />;
}
