// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import { db } from "@/lib/db";
// import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  // const session = await getServerSession(authOptions);

  // if (!session?.user?.email) {
  //   redirect("/api/auth/signin");
  // }

  // const user = await db.user.findUnique({
  //   where: { email: session.user.email },
  //   select: {
  //     name: true,
  //     email: true,
  //     gamesWon: true,
  //   },
  // });

  // if (!user) {
  //   redirect("/api/auth/signin");
  // }

  // If you want to use a mock user for development/testing, comment out the above code and uncomment below:
  
  const user = {
    name: "User Name",
    email: "user@example.com",
    gamesWon: 42,
  };

  return (
    <ProfileClient
      user={{
        name: user.name ?? "",
        email: user.email ?? "",
        gamesWon: user.gamesWon ?? 0,
      }}
    />
  );
}