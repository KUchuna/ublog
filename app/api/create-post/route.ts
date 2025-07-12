import { NextRequest, NextResponse } from 'next/server';
import localDb from '@/lib/dblocal';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { title, content, description, user_id } = body;

    if (!title || !content || !user_id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await localDb.query(
      `
      INSERT INTO blog (title, body, description, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [title, content, description, user_id]
    );

    return NextResponse.json({ message: 'Blog added successfully', blog: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Blog Insertion Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
