'use client';

import Image from "next/image";
import { useState } from "react";

export default function GiveawaySystem() {
  const [activeTab, setActiveTab] = useState("how");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 py-12 px-4 sm:px-6 lg:px-8 font-sans text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Image
            src="/images/generic_logo.jpg"
            alt="Giveaway Logo"
            width={100}
            height={100}
            className="mx-auto mb-4 rounded-full border-4 border-gray-500 shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">🎁 Title</h1>
          <p className="text-lg text-gray-300">Mini description</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          {["how", "lottery", "entries", "perks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold shadow transition ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white border border-gray-500"
              }`}
            >
              {tab === "how" && "ℹ️ Title1"}
              {tab === "lottery" && "🎲 Title2"}
              {tab === "entries" && "📊 Title3"}
              {tab === "perks" && "⭐ Title4"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-gray-600 transition-all duration-300">
          {activeTab === "how" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
              <ol className="list-decimal pl-6 space-y-3 text-gray-200">
                <li>💬 Interact to earn points.</li>
                <li>🎁 Spend points to enter giveaways.</li>
                <li>📈 Entry cost increases with volume.</li>
                <li>🔥 Premium rewards may require point burning.</li>
              </ol>
            </div>
          )}

          {activeTab === "lottery" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Weighted Lottery</h2>
              <div className="space-y-3">
                {[
                  { label: "First 100 points", value: "1x", percent: 100 },
                  { label: "Next 100 points", value: "0.5x", percent: 50 },
                  { label: "Next 100 points", value: "0.25x", percent: 25 },
                  { label: "Beyond 300 points", value: "0.1x", percent: 10 },
                ].map((tier, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between font-medium text-sm text-gray-300">
                      <span>{tier.label}</span>
                      <span>{tier.value}</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-600 overflow-hidden">
                      <div
                        className="bg-white h-full"
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
              <h2 className="text-2xl font-bold text-white mb-4">Entry Scaling</h2>
              <p className="text-sm mb-4 text-gray-300">
                Entry costs rise as more participants join:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-200 space-y-2">
                <li>🔹 First 50 entries: standard rate</li>
                <li>🔸 51–100 entries: higher rate</li>
                <li>🔥 100+ entries: premium rate + possible point burn</li>
              </ul>
              <div className="mt-4 bg-gray-700 p-4 rounded-lg text-gray-200 text-sm">
                💡 High-value giveaways may require additional point expenditure.
              </div>
            </div>
          )}

          {activeTab === "perks" && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Supporter Perks</h2>
              <p className="text-gray-300 mb-2">
                Get automatic point rewards and exclusive access by supporting us.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-200 space-y-2">
                <li>💎 Monthly point drops</li>
                <li>🎟️ Private giveaways</li>
                <li>🚀 Support the system’s growth</li>
              </ul>
              <a
                href="#"
                className="inline-block mt-4 px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-gray-300 transition"
              >
                Learn More
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-400">
          <p>⚠️ This system is evolving. Stay tuned for updates.</p>
        </div>
      </div>
    </div>
  );
}