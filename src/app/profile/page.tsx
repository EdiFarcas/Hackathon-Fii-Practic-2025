"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { useState } from "react";
import ProfileClient from "./ProfileClient";
import MarketPlaceMenu from "../../components/MarketPlaceMenu";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      gamesWon: true,
    },
  });

  if (!user) {
    redirect("/api/auth/signin");
  }

  // If you want to use a mock user for development/testing, comment out the above code and uncomment below:
  // const [userPlan, setUserPlan] = useState<string>("Free Plan");
  // const [showMarket, setShowMarket] = useState(false);

  // const user = {
  //   name: "User Name",
  //   email: "user@example.com",
  //   gamesWon: 42,
  //   plan: userPlan,
  // };

  return (
    <>
      <ProfileClient user={user} />
      {/* {showMarket && (
        <MarketPlaceMenu onClose={() => setShowMarket(false)} setUserPlan={setUserPlan} />
      )} */}
    </>
  );
}