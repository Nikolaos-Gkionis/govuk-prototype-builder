import ComponentDisplay from '../ComponentDisplay';

const tagComponent = {
  name: 'Tag',
  description: 'Use the tag component to show users the status of something',
  preview: `<strong class="govuk-tag">
    Completed
  </strong>`,
  code: {
    html: `<strong class="govuk-tag">Completed</strong>`,
    nunjucks: `{{ govukTag({
  text: "Completed"
}) }}`
  }
};

export default function TagPage() {
  return <ComponentDisplay component={tagComponent} />;
}
