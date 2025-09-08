import { NextRequest, NextResponse } from 'next/server';
import { ConditionalRulesService } from '@/lib/database';

const conditionalRulesService = new ConditionalRulesService();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ruleId = params.id;
    const body = await request.json();
    const { conditionType, conditionValue, conditionLabel, jsonlogicExpression } = body;

    const updates: any = {};
    if (conditionType !== undefined) updates.conditionType = conditionType;
    if (conditionValue !== undefined) updates.conditionValue = conditionValue;
    if (conditionLabel !== undefined) updates.conditionLabel = conditionLabel;
    if (jsonlogicExpression !== undefined) updates.jsonlogicExpression = jsonlogicExpression;

    await conditionalRulesService.update(ruleId, updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating conditional rule:', error);
    return NextResponse.json(
      { error: 'Failed to update conditional rule' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const ruleId = params.id;
    await conditionalRulesService.delete(ruleId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting conditional rule:', error);
    return NextResponse.json(
      { error: 'Failed to delete conditional rule' },
      { status: 500 }
    );
  }
}
