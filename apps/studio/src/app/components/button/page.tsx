import ComponentDisplay from '../ComponentDisplay';

const buttonComponent = {
  name: 'Button',
  description: 'Help users carry out an action like starting an application',
  variants: [
    {
      name: 'Default button',
      preview: `<button type="submit" class="govuk-button" data-module="govuk-button">
        Save and continue
      </button>`,
      code: {
        html: `<button type="submit" class="govuk-button" data-module="govuk-button">
  Save and continue
</button>`,
        nunjucks: `{{ govukButton({
  text: "Save and continue"
}) }}`
      }
    },
          {
        name: 'Start button',
        preview: `<a href="#" role="button" draggable="false" class="govuk-button govuk-button--start" data-module="govuk-button">
        Start now
        <svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="m0 0h13l20 20-20 20H0l20-20z"/>
        </svg>
      </a>`,
      code: {
        html: `<a href="#" role="button" class="govuk-button govuk-button--start">
  Start now
  <svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="m0 0h13l20 20-20 20H0l20-20z"/>
  </svg>
</a>`,
        nunjucks: `{{ govukButton({
  text: "Start now",
  href: "#",
  isStartButton: true
}) }}`
      }
    },
    {
      name: 'Secondary button',
      preview: `<button type="submit" class="govuk-button govuk-button--secondary" data-module="govuk-button">
        Find address
      </button>`,
      code: {
        html: `<button type="submit" class="govuk-button govuk-button--secondary" data-module="govuk-button">
  Find address
</button>`,
        nunjucks: `{{ govukButton({
  text: "Find address",
  classes: "govuk-button--secondary"
}) }}`
      }
    },
    {
      name: 'Warning button',
      preview: `<button type="submit" class="govuk-button govuk-button--warning" data-module="govuk-button">
        Delete account
      </button>`,
      code: {
        html: `<button type="submit" class="govuk-button govuk-button--warning" data-module="govuk-button">
  Delete account
</button>`,
        nunjucks: `{{ govukButton({
  text: "Delete account",
  classes: "govuk-button--warning"
}) }}`
      }
    }
  ]
};

export default function ButtonPage() {
  return <ComponentDisplay component={buttonComponent} />;
}
