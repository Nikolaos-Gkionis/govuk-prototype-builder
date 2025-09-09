import { NextRequest, NextResponse } from 'next/server';
import { pageService } from '@/lib/database';

/**
 * POST /api/test-pages - Create test pages for conditional logic testing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectId } = body;
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Create test pages
    const sourcePage = await pageService.create(projectId, {
      id: 'page1',
      key: 'page1',
      type: 'question',
      title: 'Question Page',
      path: '/question',
      metadata: { position: { x: 0, y: 0 } }
    });
    
    const targetPage = await pageService.create(projectId, {
      id: 'page2',
      key: 'page2',
      type: 'confirmation',
      title: 'Success Page',
      path: '/success',
      metadata: { position: { x: 200, y: 0 } }
    });
    
    return NextResponse.json({ 
      success: true, 
      data: { sourcePage, targetPage } 
    });
  } catch (error) {
    console.error('Error creating test pages:', error);
    return NextResponse.json(
      { error: 'Failed to create test pages' },
      { status: 500 }
    );
  }
}
