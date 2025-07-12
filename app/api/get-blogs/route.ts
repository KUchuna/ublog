import { NextResponse } from 'next/server';
import localDb from '@/lib/dblocal';

export const revalidate = 0;

export async function GET() {
  try {
    const blogs = await localDb.query(`
      SELECT 
        blog.*,
        "user".name AS author
      FROM blog
      JOIN "user" ON blog.user_id = "user".id
      ORDER BY blog.createdat ASC;
    `);

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
