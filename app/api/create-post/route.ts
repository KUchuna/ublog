import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { title, content, description, user_id } = body;

    if (!title || !content || !user_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql(
      `
      INSERT INTO blog (title, body, description, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [title, content, description, user_id]
    );

    return NextResponse.json({ message: 'Blog added successfully', blog: result[0] }, { status: 200 });
  } catch (error) {
    console.error('Blog Insertion Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
