import { NextResponse } from 'next/server';
import localDb from '@/lib/dblocal';

export const revalidate = 0;

export async function GET() {
  try {
    const blogs = await localDb.query(`SELECT * FROM blog ORDER BY createdat asc;`);

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}