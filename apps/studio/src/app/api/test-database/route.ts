import { NextResponse } from 'next/server';
import { projectService } from '@/lib/database';

/**
 * GET /api/test-database - Test database functionality
 * This is a temporary endpoint for testing database operations
 */
export async function GET() {
  try {
    // Test creating a project
    const testProject = projectService.create({
      id: 'test-project-123',
      name: 'Test Project',
      description: 'A test project for database verification',
      startType: 'blank',
      govukFrontendVersion: '5.11.2',
      pages: [],
      settings: {
        serviceName: 'Test Service',
        phase: 'alpha',
        startPage: '',
        sessionSecret: 'test-secret',
        showPhaseBanner: true
      }
    });

    // Test retrieving the project
    const retrievedProject = projectService.getById('test-project-123');
    
    // Test updating the project
    const updateSuccess = projectService.update('test-project-123', {
      name: 'Updated Test Project',
      description: 'Updated description'
    });

    // Test getting all projects
    const allProjects = projectService.getAll();

    // Clean up test project
    projectService.delete('test-project-123');

    return NextResponse.json({
      success: true,
      message: 'Database test completed successfully',
      results: {
        projectCreated: !!testProject,
        projectRetrieved: !!retrievedProject,
        projectUpdated: updateSuccess,
        totalProjects: (await allProjects).length,
        testProjectCleanedUp: true
      }
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
