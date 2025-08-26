import ComponentDisplay from '../ComponentDisplay';

const dateInputComponent = {
  name: 'Date input',
  description: 'Help users enter a memorable date or one they can easily look up',
  preview: `<div class="govuk-form-group">
    <fieldset class="govuk-fieldset" aria-describedby="dob-hint" role="group">
      <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 class="govuk-fieldset__heading">
          What is your date of birth?
        </h1>
      </legend>
      <div id="dob-hint" class="govuk-hint">
        For example, 27 3 1985
      </div>
      <div class="govuk-date-input" id="dob">
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label" for="dob-day">
              Day
            </label>
            <input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-day" name="dob-day" type="text" inputmode="numeric">
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label" for="dob-month">
              Month
            </label>
            <input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-month" name="dob-month" type="text" inputmode="numeric">
          </div>
        </div>
        <div class="govuk-date-input__item">
          <div class="govuk-form-group">
            <label class="govuk-label govuk-date-input__label" for="dob-year">
              Year
            </label>
            <input class="govuk-input govuk-date-input__input govuk-input--width-4" id="dob-year" name="dob-year" type="text" inputmode="numeric">
          </div>
        </div>
      </div>
    </fieldset>
  </div>`,
  code: {
    html: `<div class="govuk-form-group">
  <fieldset class="govuk-fieldset" aria-describedby="dob-hint" role="group">
    <legend class="govuk-fieldset__legend govuk-fieldset__legend--l">
      <h1 class="govuk-fieldset__heading">
        What is your date of birth?
      </h1>
    </legend>
    <div id="dob-hint" class="govuk-hint">
      For example, 27 3 1985
    </div>
    <div class="govuk-date-input" id="dob">
      <div class="govuk-date-input__item">
        <div class="govuk-form-group">
          <label class="govuk-label govuk-date-input__label" for="dob-day">Day</label>
          <input class="govuk-input govuk-date-input__input govuk-input--width-2" id="dob-day" name="dob-day" type="text" inputmode="numeric">
        </div>
      </div>
    </div>
  </fieldset>
</div>`,
    nunjucks: `{{ govukDateInput({
  id: "dob",
  namePrefix: "dob",
  fieldset: {
    legend: {
      text: "What is your date of birth?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  hint: {
    text: "For example, 27 3 1985"
  }
}) }}`
  }
};

export default function DateInputPage() {
  return <ComponentDisplay component={dateInputComponent} />;
}
