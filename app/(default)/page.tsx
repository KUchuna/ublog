import { getSession } from "@/api";
import Featured from "@/components/Home/Featured";
import Hero from "@/components/Home/Hero";

export default async function Home() {

  const session = await getSession()

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
