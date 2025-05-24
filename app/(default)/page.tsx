import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user;

  return (
    <main>
      <h1 className="text-4xl w-full text-center text-black-rich">Hello, {user ? user.name : "World!"}</h1>
    </main>
  );
}
