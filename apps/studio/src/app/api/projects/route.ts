import { NextRequest, NextResponse } from 'next/server';
import { projectService } from '@/lib/database';

/**
 * GET /api/projects - Get all projects
 */
export async function GET() {
  try {
    const projects = await projectService.getAll();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects - Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { success: false, error: 'Project name is required' },
        { status: 400 }
      );
    }
    
    // Generate ID if not provided
    const projectId = body.id || `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const project = await projectService.create({
      id: projectId,
      name: body.name,
      description: body.description || '',
      startType: body.startType || 'blank',
      govukFrontendVersion: body.govukFrontendVersion || '5.11.2',
      pages: [],
      settings: {
        serviceName: body.settings?.serviceName || 'Sample Service',
        phase: body.settings?.phase || 'beta',
        startPage: body.settings?.startPage || '',
        sessionSecret: body.settings?.sessionSecret || '',
        showPhaseBanner: body.settings?.showPhaseBanner !== false
      }
    });
    
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
