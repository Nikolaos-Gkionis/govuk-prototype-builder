import ComponentDisplay from '../ComponentDisplay';

const notificationBannerComponent = {
  name: 'Notification banner',
  description: 'Use a notification banner to tell users about something they need to know about, but that\'s not directly related to the page content',
  variants: [
    {
      name: 'Default (blue)',
      preview: `<div class="govuk-notification-banner" role="region" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">
        <div class="govuk-notification-banner__header">
          <h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">
            Important
          </h2>
        </div>
        <div class="govuk-notification-banner__content">
          <p class="govuk-notification-banner__heading">
            You have 7 days left to send your application.
            <a class="govuk-notification-banner__link" href="#">View application</a>.
          </p>
        </div>
      </div>`,
      code: {
        html: `<div class="govuk-notification-banner" role="region" aria-labelledby="govuk-notification-banner-title">
  <div class="govuk-notification-banner__header">
    <h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">Important</h2>
  </div>
  <div class="govuk-notification-banner__content">
    <p class="govuk-notification-banner__heading">You have 7 days left to send your application.</p>
  </div>
</div>`,
        nunjucks: `{{ govukNotificationBanner({
  html: '<p class="govuk-notification-banner__heading">You have 7 days left to send your application.</p>'
}) }}`
      }
    },
    {
      name: 'Success (green)',
      preview: `<div class="govuk-notification-banner govuk-notification-banner--success" role="alert" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">
        <div class="govuk-notification-banner__header">
          <h2 class="govuk-notification-banner__title" id="govuk-notification-banner-title">
            Success
          </h2>
        </div>
        <div class="govuk-notification-banner__content">
          <h3 class="govuk-notification-banner__heading">
            Email address changed successfully
          </h3>
          <p class="govuk-body">We have sent you a confirmation email.</p>
        </div>
      </div>`,
      code: {
        html: `<div class="govuk-notification-banner govuk-notification-banner--success" role="alert">
  <div class="govuk-notification-banner__header">
    <h2 class="govuk-notification-banner__title">Success</h2>
  </div>
  <div class="govuk-notification-banner__content">
    <h3 class="govuk-notification-banner__heading">Email address changed successfully</h3>
    <p class="govuk-body">We have sent you a confirmation email.</p>
  </div>
</div>`,
        nunjucks: `{{ govukNotificationBanner({
  type: "success",
  html: '<h3 class="govuk-notification-banner__heading">Email address changed successfully</h3><p class="govuk-body">We have sent you a confirmation email.</p>'
}) }}`
      }
    }
  ]
};

export default function NotificationBannerPage() {
  return <ComponentDisplay component={notificationBannerComponent} />;
}
