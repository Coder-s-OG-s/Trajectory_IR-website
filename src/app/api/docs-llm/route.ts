import { NextResponse } from 'next/server';
import { getAggregatedDocs } from '@/lib/docs-aggregator';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');
  const aggregated = getAggregatedDocs();

  if (format === 'raw' || format === 'text') {
    return new NextResponse(aggregated.fullText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return NextResponse.json(
    {
      success: true,
      totalPages: aggregated.totalPages,
      charCount: aggregated.fullText.length,
      fullText: aggregated.fullText,
    }
  );
}
