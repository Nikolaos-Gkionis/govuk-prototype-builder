import { NextRequest, NextResponse } from 'next/server';
import { ConditionalRulesService } from '@/lib/database';

const conditionalRulesService = new ConditionalRulesService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const pageId = searchParams.get('pageId');

    if (!projectId && !pageId) {
      return NextResponse.json(
        { error: 'Either projectId or pageId is required' },
        { status: 400 }
      );
    }

    let rules;
    if (projectId) {
      rules = await conditionalRulesService.getByProject(projectId);
    } else {
      rules = await conditionalRulesService.getByPage(pageId!);
    }

    return NextResponse.json({ rules });
  } catch (error) {
    console.error('Error fetching conditional rules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch conditional rules' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      projectId,
      sourcePageId,
      targetPageId,
      fieldName,
      conditionType,
      conditionValue,
      conditionLabel,
      jsonlogicExpression
    } = body;

    if (!id || !projectId || !sourcePageId || !targetPageId || !fieldName || !conditionType || !conditionValue || !jsonlogicExpression) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await conditionalRulesService.create({
      id,
      projectId,
      sourcePageId,
      targetPageId,
      fieldName,
      conditionType,
      conditionValue,
      conditionLabel,
      jsonlogicExpression
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating conditional rule:', error);
    return NextResponse.json(
      { error: 'Failed to create conditional rule' },
      { status: 500 }
    );
  }
}
