import ComponentDisplay from '../ComponentDisplay';

const insetTextComponent = {
  name: 'Inset text',
  description: 'Use the inset text component to differentiate a block of text from the content that surrounds it',
  preview: `<div class="govuk-inset-text">
    It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.
  </div>`,
  code: {
    html: `<div class="govuk-inset-text">
  It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.
</div>`,
    nunjucks: `{{ govukInsetText({
  text: "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application."
}) }}`
  }
};

export default function InsetTextPage() {
  return <ComponentDisplay component={insetTextComponent} />;
}
