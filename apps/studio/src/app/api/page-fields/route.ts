import { NextRequest, NextResponse } from 'next/server';
import { fieldService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json(
        { error: 'pageId is required' },
        { status: 400 }
      );
    }

    const fields = await fieldService.getByPageId(pageId);
    return NextResponse.json({ fields });
  } catch (error) {
    console.error('Error fetching page fields:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page fields' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageId, field } = body;

    if (!pageId || !field) {
      return NextResponse.json(
        { error: 'pageId and field are required' },
        { status: 400 }
      );
    }

    await fieldService.create(pageId, field);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating page field:', error);
    return NextResponse.json(
      { error: 'Failed to create page field' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');

    if (!pageId) {
      return NextResponse.json(
        { error: 'pageId is required' },
        { status: 400 }
      );
    }

    // Delete all fields for this page
    const fields = await fieldService.getByPageId(pageId);
    for (const field of fields) {
      await fieldService.delete(field.id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting page fields:', error);
    return NextResponse.json(
      { error: 'Failed to delete page fields' },
      { status: 500 }
    );
  }
}
