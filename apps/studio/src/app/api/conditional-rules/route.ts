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
    console.log('🔧 API received conditional rule data:', body);
    
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

    console.log('🔍 API field validation:', {
      id: !!id,
      projectId: !!projectId,
      sourcePageId: !!sourcePageId,
      targetPageId: !!targetPageId,
      fieldName: !!fieldName,
      conditionType: !!conditionType,
      conditionValue: !!conditionValue,
      jsonlogicExpression: !!jsonlogicExpression
    });

    if (!id || !projectId || !sourcePageId || !targetPageId || !fieldName || !conditionType || !conditionValue || !jsonlogicExpression) {
      const missingFields = [];
      if (!id) missingFields.push('id');
      if (!projectId) missingFields.push('projectId');
      if (!sourcePageId) missingFields.push('sourcePageId');
      if (!targetPageId) missingFields.push('targetPageId');
      if (!fieldName) missingFields.push('fieldName');
      if (!conditionType) missingFields.push('conditionType');
      if (!conditionValue) missingFields.push('conditionValue');
      if (!jsonlogicExpression) missingFields.push('jsonlogicExpression');
      
      console.error('❌ Missing required fields:', missingFields);
      return NextResponse.json(
        { error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    console.log('💾 Creating conditional rule in database...');
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

    console.log('✅ Conditional rule created successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error creating conditional rule:', error);
    return NextResponse.json(
      { error: 'Failed to create conditional rule' },
      { status: 500 }
    );
  }
}
