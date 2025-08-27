import ComponentDisplay from '../ComponentDisplay';

const radiosComponent = {
  name: 'Radios',
  description: 'Let users select one option from a list using the radios component',
  variants: [
    {
      name: 'Default',
      preview: `<div class="govuk-form-group">
        <fieldset class="govuk-fieldset" aria-describedby="contact-hint">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 class="govuk-fieldset__heading">
              How would you prefer to be contacted?
            </h1>
          </legend>
          <div id="contact-hint" class="govuk-hint">
            Select one option.
          </div>
          <div class="govuk-radios" data-module="govuk-radios">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="contact" name="contact" type="radio" value="email">
              <label class="govuk-label govuk-radios__label" for="contact">
                Email
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="contact-2" name="contact" type="radio" value="phone">
              <label class="govuk-label govuk-radios__label" for="contact-2">
                Phone
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="contact-3" name="contact" type="radio" value="text">
              <label class="govuk-label govuk-radios__label" for="contact-3">
                Text message
              </label>
            </div>
          </div>
        </fieldset>
      </div>`,
      code: {
        html: `<div class="govuk-form-group">
  <fieldset class="govuk-fieldset" aria-describedby="contact-hint">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 class="govuk-fieldset__heading">How would you prefer to be contacted?</h1>
    </legend>
    <div id="contact-hint" class="govuk-hint">Select one option.</div>
    <div class="govuk-radios" data-module="govuk-radios">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="contact" name="contact" type="radio" value="email">
        <label class="govuk-label govuk-radios__label" for="contact">Email</label>
      </div>
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="contact-2" name="contact" type="radio" value="phone">
        <label class="govuk-label govuk-radios__label" for="contact-2">Phone</label>
      </div>
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="contact-3" name="contact" type="radio" value="text">
        <label class="govuk-label govuk-radios__label" for="contact-3">Text message</label>
      </div>
    </div>
  </fieldset>
</div>`,
        nunjucks: `{{ govukRadios({
  name: "contact",
  fieldset: {
    legend: {
      text: "How would you prefer to be contacted?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  hint: {
    text: "Select one option."
  },
  items: [
    {
      value: "email",
      text: "Email"
    },
    {
      value: "phone",
      text: "Phone"
    },
    {
      value: "text",
      text: "Text message"
    }
  ]
}) }}`
      }
    },
    {
      name: 'Small',
      preview: `<div class="govuk-form-group">
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--s">
            <h3 class="govuk-fieldset__heading">
              Do you have a driving licence?
            </h3>
          </legend>
          <div class="govuk-radios govuk-radios--small" data-module="govuk-radios">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="licence" name="licence" type="radio" value="yes">
              <label class="govuk-label govuk-radios__label" for="licence">
                Yes
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="licence-2" name="licence" type="radio" value="no">
              <label class="govuk-label govuk-radios__label" for="licence-2">
                No
              </label>
            </div>
          </div>
        </fieldset>
      </div>`,
      code: {
        html: `<div class="govuk-form-group">
  <fieldset class="govuk-fieldset">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--s">
      <h3 class="govuk-fieldset__heading">Do you have a driving licence?</h3>
    </legend>
    <div class="govuk-radios govuk-radios--small" data-module="govuk-radios">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="licence" name="licence" type="radio" value="yes">
        <label class="govuk-label govuk-radios__label" for="licence">Yes</label>
      </div>
      <div class="govuk-radios__input" id="licence-2" name="licence" type="radio" value="no">
        <label class="govuk-label govuk-radios__label" for="licence-2">No</label>
      </div>
    </div>
  </fieldset>
</div>`,
        nunjucks: `{{ govukRadios({
  name: "licence",
  fieldset: {
    legend: {
      text: "Do you have a driving licence?",
      classes: "govuk-fieldset__legend--s"
    }
  },
  classes: "govuk-radios--small",
  items: [
    {
      value: "yes",
      text: "Yes"
    },
    {
      value: "no",
      text: "No"
    }
  ]
}) }}`
      }
    }
  ]
};

export default function RadiosPage() {
  return <ComponentDisplay component={radiosComponent} />;
}
