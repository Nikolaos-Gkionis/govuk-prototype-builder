import ComponentDisplay from '../ComponentDisplay';

const phaseBannerComponent = {
  name: 'Phase banner',
  description: 'Use the phase banner component to show users your service is still being worked on',
  variants: [
    {
      name: 'Alpha',
      preview: `<div class="govuk-phase-banner">
        <p class="govuk-phase-banner__content">
          <strong class="govuk-tag govuk-phase-banner__content__tag">
            alpha
          </strong>
          <span class="govuk-phase-banner__text">
            This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.
          </span>
        </p>
      </div>`,
      code: {
        html: `<div class="govuk-phase-banner">
  <p class="govuk-phase-banner__content">
    <strong class="govuk-tag govuk-phase-banner__content__tag">alpha</strong>
    <span class="govuk-phase-banner__text">This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.</span>
  </p>
</div>`,
        nunjucks: `{{ govukPhaseBanner({
  tag: {
    text: "alpha"
  },
  html: 'This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.'
}) }}`
      }
    },
    {
      name: 'Beta',
      preview: `<div class="govuk-phase-banner">
        <p class="govuk-phase-banner__content">
          <strong class="govuk-tag govuk-phase-banner__content__tag">
            beta
          </strong>
          <span class="govuk-phase-banner__text">
            This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.
          </span>
        </p>
      </div>`,
      code: {
        html: `<div class="govuk-phase-banner">
  <p class="govuk-phase-banner__content">
    <strong class="govuk-tag govuk-phase-banner__content__tag">beta</strong>
    <span class="govuk-phase-banner__text">This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.</span>
  </p>
</div>`,
        nunjucks: `{{ govukPhaseBanner({
  tag: {
    text: "beta"
  },
  html: 'This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.'
}) }}`
      }
    }
  ]
};

export default function PhaseBannerPage() {
  return <ComponentDisplay component={phaseBannerComponent} />;
}
