// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
// import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  // Uncomment and use authentication in production
  // const session = await getServerSession(authOptions);

  // if (!session?.user?.email) {
  //   redirect("/api/auth/signin");
  // }

  // const user = await db.user.findUnique({
  //   where: { email: session.user.email },
  //   select: {
  //     name: true,
  //     email: true,
  //     coins: true,
  //     youtubeHandle: true,
  //   },
  // });

  // if (!user) {
  //   redirect("/api/auth/signin");
  // }

  // Temporary mock user for development/testing
  const user = {
    name: "User Name",
    email: "user@example.com",
    coins: 0,
    //youtubeHandle: "userYT",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl shadow-xl overflow-hidden bg-gray-800 border-4 border-gray-700">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 flex items-center space-x-4">
            <div className="h-16 w-16 bg-gray-100 rounded-full shadow-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">
                {user.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow">{user.name}</h1>
              {/* <p className="text-gray-400 italic">🌟 Premium Member</p> */}
            </div>
          </div>

          {/* Profile Info & Wallet */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Block */}
              <div className="space-y-4">
                {([
                  ["👤", "Shadow Name", user.name],
                  ["📧", "The Lost Letter", user.email],
                ] as [string, string, string | undefined][]).map(([icon, label, value], index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-700 border border-gray-600 rounded-xl shadow-sm"
                  >
                    <span className="text-xl">{icon}</span>
                    <div>
                      <p className="text-sm text-gray-300">{label}</p>
                      <p className="font-medium text-gray-100">{value || "—"}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wallet */}
              <div className="bg-gray-700 border border-gray-600 rounded-2xl p-5 shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Stats</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg">💰</span>
                      <span className="text-2xl font-bold text-white">{user.coins}</span>
                    </div>
                  </div>
                  {/* <button className="bg-white text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition-all shadow-md font-semibold">
                    Add Coins
                  </button> */}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-10 pt-6 border-t border-gray-600">
              <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                <span className="text-2xl mr-2">⭐</span>
                Dark Trophies
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["0", "Unraveled Stories"],
                  ["12", "Nights in the Dark"],
                  ["3", "Seals Obtained"],
                ].map(([value, label], idx) => (
                  <div
                    key={idx}
                    className="text-center p-4 bg-gray-700 rounded-xl shadow-sm border border-gray-600"
                  >
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-300">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}