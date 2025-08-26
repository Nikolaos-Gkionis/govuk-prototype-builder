import ComponentDisplay from '../ComponentDisplay';

const passwordInputComponent = {
  name: 'Password input',
  description: 'Help users enter a password',
  variants: [
    {
      name: 'Default',
      preview: `<div class="govuk-form-group">
        <label class="govuk-label" for="password-input">
          Password
        </label>
        <input class="govuk-input" id="password-input" name="password" type="password" spellcheck="false" autocomplete="current-password">
      </div>`,
      code: {
        html: `<div class="govuk-form-group">
  <label class="govuk-label" for="password-input">Password</label>
  <input class="govuk-input" id="password-input" name="password" type="password" spellcheck="false" autocomplete="current-password">
</div>`,
        nunjucks: `{{ govukInput({
  label: {
    text: "Password"
  },
  id: "password-input",
  name: "password",
  type: "password",
  autocomplete: "current-password"
}) }}`
      }
    },
    {
      name: 'With show/hide button',
      preview: `<div class="govuk-form-group" data-module="govuk-password-input">
        <label class="govuk-label" for="password-input-with-button">
          Password
        </label>
        <div class="govuk-input__wrapper govuk-password-input__wrapper">
          <input class="govuk-input govuk-password-input__input govuk-js-password-input-input" id="password-input-with-button" name="password" type="password" spellcheck="false" autocomplete="current-password" aria-describedby="password-input-with-button-info">
          <button type="button" class="govuk-button govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle" data-module="govuk-button" aria-controls="password-input-with-button" aria-label="Show password">Show</button>
        </div>
        <div id="password-input-with-button-info" class="govuk-hint govuk-password-input__sr-only govuk-js-password-input-sr-only" aria-live="polite" style="position: absolute; left: -10000px;">Your password is hidden</div>
      </div>`,
      code: {
        html: `<div class="govuk-form-group" data-module="govuk-password-input">
  <label class="govuk-label" for="password-input-with-button">Password</label>
  <div class="govuk-input__wrapper govuk-password-input__wrapper">
    <input class="govuk-input govuk-password-input__input" id="password-input-with-button" name="password" type="password" spellcheck="false" autocomplete="current-password">
    <button type="button" class="govuk-button govuk-button--secondary govuk-password-input__toggle">Show</button>
  </div>
</div>`,
        nunjucks: `{{ govukPasswordInput({
  label: {
    text: "Password"
  },
  id: "password-input-with-button",
  name: "password"
}) }}`
      }
    }
  ]
};

export default function PasswordInputPage() {
  return <ComponentDisplay component={passwordInputComponent} />;
}
