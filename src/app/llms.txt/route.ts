import { NextResponse } from 'next/server';
import { getAggregatedDocs } from '@/lib/docs-aggregator';

export const dynamic = 'force-static';

export async function GET() {
  const aggregated = getAggregatedDocs();

  return new NextResponse(aggregated.fullText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
