import Tiptap from "@/components/Globals/TipTap";
import Featured from "@/components/Home/Featured";
import Hero from "@/components/Home/Hero";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  let user;

  session ? user = session.user : user = null;

  return (
    <div className="max-w-7xl w-full">
      <Hero 
        user={user}
      />
      <Featured />
    </div>
  );
}
