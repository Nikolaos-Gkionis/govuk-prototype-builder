import ComponentDisplay from '../ComponentDisplay';

const radiosComponent = {
  name: 'Radios',
  description: 'Use the radios component when users can only select one option from a list',
  variants: [
    {
      name: 'Default',
      preview: `<div class="govuk-form-group">
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
            <h2 class="govuk-fieldset__heading">
              Which part of the UK do you live in?
            </h2>
          </legend>
          <div class="govuk-radios" data-module="govuk-radios">
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="where-do-you-live" name="where-do-you-live" type="radio" value="england">
              <label class="govuk-label govuk-radios__label" for="where-do-you-live">
                England
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="where-do-you-live-2" name="where-do-you-live" type="radio" value="scotland">
              <label class="govuk-label govuk-radios__label" for="where-do-you-live-2">
                Scotland
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="where-do-you-live-3" name="where-do-you-live" type="radio" value="wales">
              <label class="govuk-label govuk-radios__label" for="where-do-you-live-3">
                Wales
              </label>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="where-do-you-live-4" name="where-do-you-live" type="radio" value="northern-ireland">
              <label class="govuk-label govuk-radios__label" for="where-do-you-live-4">
                Northern Ireland
              </label>
            </div>
          </div>
        </fieldset>
      </div>`,
      code: {
        html: `<div class="govuk-form-group">
  <fieldset class="govuk-fieldset">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--m">
      <h2 class="govuk-fieldset__heading">Which part of the UK do you live in?</h2>
    </legend>
    <div class="govuk-radios" data-module="govuk-radios">
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="where-do-you-live" name="where-do-you-live" type="radio" value="england">
        <label class="govuk-label govuk-radios__label" for="where-do-you-live">England</label>
      </div>
    </div>
  </fieldset>
</div>`,
        nunjucks: `{{ govukRadios({
  name: "where-do-you-live",
  fieldset: {
    legend: {
      text: "Which part of the UK do you live in?",
      classes: "govuk-fieldset__legend--m"
    }
  },
  items: [
    {
      value: "england",
      text: "England"
    }
  ]
}) }}`
      }
    },
    {
      name: 'With hint text',
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
  idPrefix: "contact",
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
      name: 'With conditional content',
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
              <input class="govuk-radios__input" id="contact" name="contact" type="radio" value="email" data-aria-controls="conditional-contact">
              <label class="govuk-label govuk-radios__label" for="contact">
                Email
              </label>
            </div>
            <div class="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-contact">
              <div class="govuk-form-group">
                <label class="govuk-label" for="contact-email">
                  Email address
                </label>
                <input class="govuk-input" id="contact-email" name="contact-email" type="email" spellcheck="false">
              </div>
            </div>
            <div class="govuk-radios__item">
              <input class="govuk-radios__input" id="contact-2" name="contact" type="radio" value="phone" data-aria-controls="conditional-contact-2">
              <label class="govuk-label govuk-radios__label" for="contact-2">
                Phone
              </label>
            </div>
            <div class="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-contact-2">
              <div class="govuk-form-group">
                <label class="govuk-label" for="contact-phone">
                  Phone number
                </label>
                <input class="govuk-input" id="contact-phone" name="contact-phone" type="tel">
              </div>
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
        <input class="govuk-radios__input" id="contact" name="contact" type="radio" value="email" data-aria-controls="conditional-contact">
        <label class="govuk-label govuk-radios__label" for="contact">Email</label>
      </div>
      <div class="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-contact">
        <div class="govuk-form-group">
          <label class="govuk-label" for="contact-email">Email address</label>
          <input class="govuk-input" id="contact-email" name="contact-email" type="email" spellcheck="false">
        </div>
      </div>
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="contact-2" name="contact" type="radio" value="phone" data-aria-controls="conditional-contact-2">
        <label class="govuk-label govuk-radios__label" for="contact-2">Phone</label>
      </div>
      <div class="govuk-radios__conditional govuk-radios__conditional--hidden" id="conditional-contact-2">
        <div class="govuk-form-group">
          <label class="govuk-label" for="contact-phone">Phone number</label>
          <input class="govuk-input" id="contact-phone" name="contact-phone" type="tel">
        </div>
      </div>
      <div class="govuk-radios__item">
        <input class="govuk-radios__input" id="contact-3" name="contact" type="radio" value="text">
        <label class="govuk-label govuk-radios__label" for="contact-3">Text message</label>
      </div>
    </div>
  </fieldset>
</div>`,
        nunjucks: `{{ govukRadios({
  idPrefix: "contact",
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
      text: "Email",
      conditional: {
        html: govukInput({
          label: {
            text: "Email address"
          },
          type: "email",
          spellcheck: false
        })
      }
    },
    {
      value: "phone",
      text: "Phone",
      conditional: {
        html: govukInput({
          label: {
            text: "Phone number"
          },
          type: "tel"
        })
      }
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
