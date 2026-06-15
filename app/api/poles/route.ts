import { NextResponse } from 'next/server';
import { getPoles } from '../../../lib/db';

export async function GET() {
  const poles = await getPoles();
  return NextResponse.json(poles);
}
