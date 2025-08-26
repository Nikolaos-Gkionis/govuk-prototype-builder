import ComponentDisplay from '../ComponentDisplay';

const backLinkComponent = {
  name: 'Back link',
  description: 'Help users go back to the previous page',
  preview: `<a href="#" class="govuk-back-link">Back</a>`,
  code: {
    html: `<a href="#" class="govuk-back-link">Back</a>`,
    nunjucks: `{{ govukBackLink({
  text: "Back",
  href: "#"
}) }}`
  }
};

export default function BackLinkPage() {
  return <ComponentDisplay component={backLinkComponent} />;
}
