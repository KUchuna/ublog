import { NextResponse } from "next/server";
import localDb from "@/lib/dblocal";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const blog = await localDb.query(
      `
      SELECT 
        blog.*,
        "user".name AS author
      FROM blog
      JOIN "user" ON blog.user_id = "user".id
      WHERE blog.id = $1
      LIMIT 1;
    `,
      [id]
    );

    if (blog.rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog: blog.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
