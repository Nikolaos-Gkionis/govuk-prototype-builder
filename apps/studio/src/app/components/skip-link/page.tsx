import ComponentDisplay from '../ComponentDisplay';

const skipLinkComponent = {
  name: 'Skip link',
  description: 'Help keyboard-only users skip to the main content on a page',
  preview: `<a href="#main-content" class="govuk-skip-link" data-module="govuk-skip-link">Skip to main content</a>
  <div id="main-content" style="margin-top: 20px; padding: 20px; border: 2px dashed #ccc;">
    <p class="govuk-body">This is the main content area. The skip link above allows keyboard users to jump directly here.</p>
  </div>`,
  code: {
    html: `<a href="#main-content" class="govuk-skip-link">Skip to main content</a>`,
    nunjucks: `{{ govukSkipLink({
  href: "#main-content",
  text: "Skip to main content"
}) }}`
  }
};

export default function SkipLinkPage() {
  return <ComponentDisplay component={skipLinkComponent} />;
}
