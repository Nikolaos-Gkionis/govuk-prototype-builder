import ComponentDisplay from '../ComponentDisplay';

const fieldsetComponent = {
  name: 'Fieldset',
  description: 'Use the fieldset component to group related form inputs',
  preview: `<fieldset class="govuk-fieldset">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 class="govuk-fieldset__heading">
        What is your address?
      </h1>
    </legend>
    <div class="govuk-form-group">
      <label class="govuk-label" for="address-line-1">
        Address line 1 <span class="govuk-visually-hidden">line 1 of 2</span>
      </label>
      <input class="govuk-input" id="address-line-1" name="address-line-1" type="text" autocomplete="address-line1">
    </div>
    <div class="govuk-form-group">
      <label class="govuk-label" for="address-line-2">
        Address line 2 <span class="govuk-visually-hidden">line 2 of 2</span>
      </label>
      <input class="govuk-input" id="address-line-2" name="address-line-2" type="text" autocomplete="address-line2">
    </div>
    <div class="govuk-form-group">
      <label class="govuk-label" for="address-town">
        Town or city
      </label>
      <input class="govuk-input govuk-!-width-two-thirds" id="address-town" name="address-town" type="text" autocomplete="address-level2">
    </div>
    <div class="govuk-form-group">
      <label class="govuk-label" for="address-postcode">
        Postcode
      </label>
      <input class="govuk-input govuk-input--width-10" id="address-postcode" name="address-postcode" type="text" autocomplete="postal-code">
    </div>
  </fieldset>`,
  code: {
    html: `<fieldset class="govuk-fieldset">
  <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
    <h1 class="govuk-fieldset__heading">What is your address?</h1>
  </legend>
  <div class="govuk-form-group">
    <label class="govuk-label" for="address-line-1">Building and street</label>
    <input class="govuk-input" id="address-line-1" name="address-line-1" type="text">
  </div>
</fieldset>`,
    nunjucks: `{{ govukFieldset({
  legend: {
    text: "What is your address?",
    classes: "govuk-fieldset__legend--l",
    isPageHeading: true
  }
}) }}`
  }
};

export default function FieldsetPage() {
  return <ComponentDisplay component={fieldsetComponent} />;
}
