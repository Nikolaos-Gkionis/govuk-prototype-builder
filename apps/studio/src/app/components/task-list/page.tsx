import ComponentDisplay from '../ComponentDisplay';

const taskListComponent = {
  name: 'Task list',
  description: 'Help users understand the tasks they need to complete',
  preview: `<ol class="govuk-task-list">
    <li class="govuk-task-list__item govuk-task-list__item--with-link">
      <div class="govuk-task-list__name-and-hint">
        <a class="govuk-link govuk-task-list__link" href="#" aria-describedby="eligibility-status">
          Check before you start
        </a>
      </div>
      <div class="govuk-task-list__status" id="eligibility-status">
        <strong class="govuk-tag govuk-tag--blue">
          Completed
        </strong>
      </div>
    </li>
    <li class="govuk-task-list__item govuk-task-list__item--with-link">
      <div class="govuk-task-list__name-and-hint">
        <a class="govuk-link govuk-task-list__link" href="#" aria-describedby="read-declaration-status">
          Read declaration
        </a>
      </div>
      <div class="govuk-task-list__status" id="read-declaration-status">
        <strong class="govuk-tag govuk-tag--blue">
          Completed
        </strong>
      </div>
    </li>
    <li class="govuk-task-list__item govuk-task-list__item--with-link">
      <div class="govuk-task-list__name-and-hint">
        <a class="govuk-link govuk-task-list__link" href="#" aria-describedby="company-information-status">
          Company information
        </a>
      </div>
      <div class="govuk-task-list__status" id="company-information-status">
        <strong class="govuk-tag govuk-tag--blue">
          Completed
        </strong>
      </div>
    </li>
    <li class="govuk-task-list__item govuk-task-list__item--with-link">
      <div class="govuk-task-list__name-and-hint">
        <a class="govuk-link govuk-task-list__link" href="#" aria-describedby="contact-details-status">
          Your contact details
        </a>
      </div>
      <div class="govuk-task-list__status" id="contact-details-status">
        <strong class="govuk-tag govuk-tag--blue">
          Completed
        </strong>
      </div>
    </li>
    <li class="govuk-task-list__item">
      <div class="govuk-task-list__name-and-hint">
        <div>List convictions</div>
        <div id="list-convictions-hint" class="govuk-task-list__hint">
          Includes any criminal convictions, for example, motoring convictions
        </div>
      </div>
      <div class="govuk-task-list__status" id="list-convictions-status">
        <strong class="govuk-tag govuk-tag--grey">
          Not started
        </strong>
      </div>
    </li>
    <li class="govuk-task-list__item">
      <div class="govuk-task-list__name-and-hint">
        <div>Medical information</div>
        <div id="medical-information-hint" class="govuk-task-list__hint">
          Includes any medical or health information
        </div>
      </div>
      <div class="govuk-task-list__status" id="medical-information-status">
        <strong class="govuk-tag govuk-tag--grey">
          Cannot start yet
        </strong>
      </div>
    </li>
  </ol>`,
  code: {
    html: `<ol class="govuk-task-list">
  <li class="govuk-task-list__item govuk-task-list__item--with-link">
    <div class="govuk-task-list__name-and-hint">
      <a class="govuk-link govuk-task-list__link" href="#">Check before you start</a>
    </div>
    <div class="govuk-task-list__status">
      <strong class="govuk-tag govuk-tag--blue">Completed</strong>
    </div>
  </li>
  <li class="govuk-task-list__item">
    <div class="govuk-task-list__name-and-hint">
      <div>List convictions</div>
    </div>
    <div class="govuk-task-list__status">
      <strong class="govuk-tag govuk-tag--grey">Not started</strong>
    </div>
  </li>
</ol>`,
    nunjucks: `{{ govukTaskList({
  items: [
    {
      title: {
        text: "Check before you start"
      },
      href: "#",
      status: {
        tag: {
          text: "Completed",
          classes: "govuk-tag--blue"
        }
      }
    },
    {
      title: {
        text: "List convictions"
      },
      status: {
        tag: {
          text: "Not started",
          classes: "govuk-tag--grey"
        }
      }
    }
  ]
}) }}`
  }
};

export default function TaskListPage() {
  return <ComponentDisplay component={taskListComponent} />;
}
