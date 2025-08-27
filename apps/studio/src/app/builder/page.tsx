import JourneyEditor from '../components/journey-editor/JourneyEditor';

export default function BuilderPage() {
  // For now, we'll use a demo project ID
  // In the future, this will come from the URL params or context
  const demoProjectId = 'demo-project-123';

  return (
    <div className="h-screen">
      <JourneyEditor projectId={demoProjectId} />
    </div>
  );
}
