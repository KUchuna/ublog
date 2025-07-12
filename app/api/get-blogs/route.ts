import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const revalidate = 0;

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const blogs = await sql(`
      SELECT 
        blog.*,
        "user".name AS author
      FROM blog
      JOIN "user" ON blog.user_id = "user".id
      ORDER BY blog.createdat ASC;
    `);

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
