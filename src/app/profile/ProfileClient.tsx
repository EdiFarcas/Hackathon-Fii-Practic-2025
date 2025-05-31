"use client";

interface User {
  name: string;
  email: string;
  gamesWon: number;
}

export default function ProfileClient({ user }: { user: User }) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-serif text-white">
      <div className="max-w-3xl w-full mx-auto">
        <div className="rounded-3xl shadow-2xl overflow-hidden border border-red-800/40 bg-gray-900/80 backdrop-blur-lg backdrop-saturate-150 transition-all duration-300">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-900/40 via-gray-900/60 to-black/0 p-8 flex items-center space-x-6 border-b border-red-900/30">
            <div className="h-20 w-20 bg-gray-900/70 rounded-full shadow-xl flex items-center justify-center border-4 border-red-900/40 backdrop-blur-md">
              <span className="text-4xl font-extrabold text-red-300 drop-shadow-lg">
                {user.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-red-200 drop-shadow">{user.name}</h1>
              {/* <p className="text-red-400 italic">🌟 Premium Member</p> */}
            </div>
          </div>

          {/* Profile Info & Wallet */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Info Block */}
              <div className="space-y-5">
                {([
                  ["👤", "Shadow Name", user.name],
                  ["📧", "The Lost Letter", user.email],
                ] as [string, string, string | undefined][]).map(([icon, label, value], index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-800/60 border border-red-900/30 rounded-2xl shadow-md backdrop-blur-md"
                  >
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-xs text-red-300 font-semibold">{label}</p>
                      <p className="font-semibold text-red-100 text-lg">{value || "—"}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Wallet */}
              <div className="bg-gray-800/60 border border-red-900/30 rounded-2xl p-6 shadow-lg backdrop-blur-md flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-red-300 mb-1 font-semibold">Stats</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl">🏆</span>
                      <span className="text-3xl font-extrabold text-red-200">{user.gamesWon}</span>
                    </div>
                  </div>
                  {/* <button className="bg-red-700 text-white px-4 py-2 rounded-xl hover:bg-red-800 transition-all shadow-md font-semibold">
                    Add Coins
                  </button> */}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-12 pt-8 border-t border-red-900/30">
              <h3 className="text-2xl font-extrabold mb-6 flex items-center text-red-200">
                <span className="text-3xl mr-3">⭐</span>
                Dark Trophies
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  ["0", "Unraveled Stories"],
                  ["12", "Nights in the Dark"],
                  ["3", "Seals Obtained"],
                ].map(([value, label], idx) => (
                  <div
                    key={idx}
                    className="text-center p-6 bg-gray-800/60 rounded-2xl shadow-md border border-red-900/30 backdrop-blur-md"
                  >
                    <div className="text-3xl font-extrabold text-red-200">{value}</div>
                    <div className="text-sm text-red-300 font-semibold">{label}</div>
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
