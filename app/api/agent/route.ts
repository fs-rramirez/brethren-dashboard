import { NextResponse } from 'next/server';
import { runAgent } from '@/lib/agent/openclaw';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('[api/agent] Agent request received');
    const result = await runAgent();
    return NextResponse.json(result);
  } catch (error) {
    console.error('[api/agent] Error:', error);
    return NextResponse.json(
      { error: 'Failed to run agent' },
      { status: 500 }
    );
  }
}
