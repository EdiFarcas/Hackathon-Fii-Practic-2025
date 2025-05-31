'use client';

import { useState } from "react";

export default function MurderMysteryGiveaway() {
  const [activeTab, setActiveTab] = useState("how");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8 font-serif text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-red-900/20 blur-3xl rounded-full"></div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-red-200 drop-shadow-lg relative z-10">
            🔍 Detective&#39;s Evidence Vault
          </h1>
          <p className="text-lg text-gray-300 relative z-10">Solve mysteries, collect clues, win rewards</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4 flex-wrap gap-2">
          {["how", "lottery", "entries", "perks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? "bg-red-700 text-white border-2 border-red-500 shadow-red-900/50"
                  : "bg-gray-800 text-red-200 border-2 border-gray-600 hover:border-red-700"
              }`}
            >
              {tab === "how" && "🕵️ Investigation"}
              {tab === "lottery" && "🎭 Evidence Weight"}
              {tab === "entries" && "📋 Case Files"}
              {tab === "perks" && "👑 Detective Guild"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900/90 rounded-2xl shadow-2xl p-8 border-2 border-red-800/50 transition-all duration-300 backdrop-blur-sm">
          {activeTab === "how" && (
            <div>
              <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center">
                <span className="mr-3">🔍</span>How to Investigate
              </h2>
              <ol className="list-decimal pl-8 space-y-4 text-gray-200 text-lg">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🕵️</span>
                  <span>Participate in murder mystery games to earn <strong className="text-red-300">Evidence Points</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🎁</span>
                  <span>Spend Evidence Points to enter exclusive detective giveaways.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">⚖️</span>
                  <span>Entry costs increase as more detectives join the case.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">🔥</span>
                  <span>Premium cases may require burning evidence for exclusive rewards.</span>
                </li>
              </ol>
            </div>
          )}

          {activeTab === "lottery" && (
            <div>
              <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center">
                <span className="mr-3">⚖️</span>Evidence Weight System
              </h2>
              <p className="text-gray-300 mb-6">Your evidence carries different weight based on accumulation:</p>
              <div className="space-y-4">
                {[
                  { label: "First 100 Evidence Points", value: "Full Weight", percent: 100, icon: "🔍" },
                  { label: "Next 100 Evidence Points", value: "Half Weight", percent: 50, icon: "🕵️" },
                  { label: "Next 100 Evidence Points", value: "Quarter Weight", percent: 25, icon: "📋" },
                  { label: "Beyond 300 Evidence Points", value: "Minimal Weight", percent: 10, icon: "🔬" },
                ].map((tier, i) => (
                  <div key={i} className="bg-gray-800/50 p-4 rounded-lg border border-red-900/30">
                    <div className="flex justify-between items-center font-medium text-sm text-gray-300 mb-2">
                      <span className="flex items-center">
                        <span className="mr-2 text-lg">{tier.icon}</span>
                        {tier.label}
                      </span>
                      <span className="text-red-300 font-bold">{tier.value}</span>
                    </div>
                    <div className="w-full h-4 rounded-full bg-gray-700 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-600 to-red-400 h-full transition-all duration-500"
                        style={{ width: `${tier.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "entries" && (
            <div>
              <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center">
                <span className="mr-3">📋</span>Case File Scaling
              </h2>
              <p className="text-lg mb-6 text-gray-300">
                Entry costs rise as more detectives investigate the same case:
              </p>
              <ul className="list-none space-y-4 text-gray-200">
                <li className="flex items-start bg-gray-800/30 p-4 rounded-lg border-l-4 border-green-600">
                  <span className="mr-3 text-2xl">🟢</span>
                  <div>
                    <strong className="text-green-400">First 50 investigators:</strong> Standard evidence cost
                  </div>
                </li>
                <li className="flex items-start bg-gray-800/30 p-4 rounded-lg border-l-4 border-yellow-600">
                  <span className="mr-3 text-2xl">🟡</span>
                  <div>
                    <strong className="text-yellow-400">51–100 investigators:</strong> Increased evidence cost
                  </div>
                </li>
                <li className="flex items-start bg-gray-800/30 p-4 rounded-lg border-l-4 border-red-600">
                  <span className="mr-3 text-2xl">🔴</span>
                  <div>
                    <strong className="text-red-400">100+ investigators:</strong> Premium cost + possible evidence burning
                  </div>
                </li>
              </ul>
              <div className="mt-6 bg-red-900/20 p-6 rounded-lg border border-red-800/50 text-red-200">
                <div className="flex items-start">
                  <span className="mr-3 text-2xl">💀</span>
                  <div>
                    <strong>High-stakes murder cases</strong> may require sacrificing evidence points for a chance at solving the ultimate mystery.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "perks" && (
            <div>
              <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center">
                <span className="mr-3">👑</span>Detective Guild Membership
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                Join the elite Detective Guild for exclusive benefits and automatic evidence rewards.
              </p>
              <ul className="list-none space-y-4 text-gray-200">
                <li className="flex items-start bg-purple-900/20 p-4 rounded-lg border border-purple-800/50">
                  <span className="mr-3 text-2xl">💎</span>
                  <div>
                    <strong className="text-purple-300">Monthly Evidence Drops:</strong> Receive bonus evidence points automatically
                  </div>
                </li>
                <li className="flex items-start bg-blue-900/20 p-4 rounded-lg border border-blue-800/50">
                  <span className="mr-3 text-2xl">🎫</span>
                  <div>
                    <strong className="text-blue-300">Exclusive Cold Cases:</strong> Access to private, high-reward investigations
                  </div>
                </li>
                <li className="flex items-start bg-green-900/20 p-4 rounded-lg border border-green-800/50">
                  <span className="mr-3 text-2xl">🚀</span>
                  <div>
                    <strong className="text-green-300">Support the Guild:</strong> Help expand our detective network and case library
                  </div>
                </li>
              </ul>
              <a
                href="#"
                className="inline-block mt-6 px-8 py-4 rounded-lg bg-gradient-to-r from-red-700 to-red-600 text-white font-bold shadow-lg hover:from-red-600 hover:to-red-500 transition-all duration-300 transform hover:scale-105 border-2 border-red-500"
              >
                Join the Detective Guild
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gray-900/50 p-6 rounded-lg border border-red-900/30 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-2">
              <span className="mr-2 text-2xl">⚠️</span>
              <p className="text-red-300 font-semibold">Case Status: Under Investigation</p>
            </div>
            <p className="text-gray-400 text-sm">
              This detective system is constantly evolving. New mysteries and rewards are being added regularly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}