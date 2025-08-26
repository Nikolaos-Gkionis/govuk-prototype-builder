import ComponentDisplay from '../ComponentDisplay';

const panelComponent = {
  name: 'Panel',
  description: 'The panel component is a visible container used on confirmation or results pages to highlight important content',
  preview: `<div class="govuk-panel govuk-panel--confirmation">
    <h1 class="govuk-panel__title">Application complete</h1>
    <div class="govuk-panel__body">
      Your reference number<br><strong>HDJ2123F</strong>
    </div>
  </div>`,
  code: {
    html: `<div class="govuk-panel govuk-panel--confirmation">
  <h1 class="govuk-panel__title">Application complete</h1>
  <div class="govuk-panel__body">
    Your reference number<br><strong>HDJ2123F</strong>
  </div>
</div>`,
    nunjucks: `{{ govukPanel({
  titleText: "Application complete",
  html: "Your reference number<br><strong>HDJ2123F</strong>"
}) }}`
  }
};

export default function PanelPage() {
  return <ComponentDisplay component={panelComponent} />;
}
