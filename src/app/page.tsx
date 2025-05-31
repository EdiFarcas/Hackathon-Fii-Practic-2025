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
          {["how", "lottery", "entries"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? "bg-red-700 text-white border-2 border-red-500 shadow-red-900/50"
                  : "bg-gray-800 text-red-200 border-2 border-gray-600 hover:border-red-700"
              }`}
            >
              {tab === "how" && "🕵️ How to play"}
              {tab === "lottery" && "🎭 Stories"}
              {tab === "entries" && "📋 Create your own story!"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900/90 rounded-2xl shadow-2xl p-8 border-2 border-red-800/50 transition-all duration-300 backdrop-blur-sm">
          {activeTab === "how" && (
            <div>
              <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center">
                <span className="mr-3">🔍</span>How to Play Dark Stories
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-red-900/30">
                  <h3 className="text-xl font-semibold text-red-300 mb-3 flex items-center">
                    <span className="mr-2">📖</span>Game Overview
                  </h3>
                  <p className="text-gray-200">
                    Dark Stories are mysterious riddles where you're given a strange, often macabre scenario. 
                    Your job is to uncover the hidden truth by asking only <strong className="text-red-300">YES or NO questions</strong>.
                  </p>
                </div>
                
                <ol className="list-decimal pl-8 space-y-4 text-gray-200 text-lg">
                  <li className="flex items-start">
                    <span className="mr-3 text-2xl">🎭</span>
                    <span>A <strong className="text-red-300">Story Master</strong> reads a mysterious scenario (like "A man lives on the 20th floor but only takes the elevator to the 10th floor, then walks the rest")</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-2xl">❓</span>
                    <span>Players ask <strong className="text-red-300">YES/NO questions only</strong> to gather clues and piece together the truth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-2xl">🧩</span>
                    <span>Use <strong className="text-red-300">lateral thinking</strong> - the solution often involves an unexpected twist or hidden detail</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-2xl">💡</span>
                    <span>The first player to <strong className="text-red-300">solve the mystery completely</strong> wins and earns Evidence Points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-2xl">⏱️</span>
                    <span>Some stories have <strong className="text-red-300">time limits</strong> - solve faster for bonus points!</span>
                  </li>
                </ol>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                  <h4 className="text-lg font-semibold text-red-300 mb-2 flex items-center">
                    <span className="mr-2">💀</span>Example Dark Story
                  </h4>
                  <p className="text-gray-200 italic mb-2">
                    "A woman enters a room, screams, and immediately knows her husband is dead. How?"
                  </p>
                  <p className="text-sm text-gray-400">
                    Players must ask questions like "Was she at home?", "Did she see the body?", "Was there a phone call?" to uncover the solution.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "lottery" && (
            <div>
              <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center">
                <span className="mr-3">🎭</span>Dark Stories
              </h2>
              <p className="text-gray-300 mb-6">Dive into the fantasy of dark stories:</p>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30 relative">
                  <button className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
                    Start game
                  </button>
                  <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center pr-24">
                    <span className="mr-2">🔍</span>Jack and Judy are dead
                  </h3>
                  <p className="text-gray-200">
                        Jack and Judy were lying on the floor dead. There was a puddle of water and broken glass on the floor. How did they die?</p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30 relative">
                  <button className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
                    Start game
                  </button>
                  <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center pr-24">
                    <span className="mr-2">🕵️</span>Fatal shot
                  </h3>
                  <p className="text-gray-200">
                    A hunter aimed his gun carefully and fired. Seconds later, he realized his mistake. Minutes later, he was dead.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30 relative">
                  <button className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
                    Start game
                  </button>
                  <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center pr-24">
                    <span className="mr-2">📋</span>Death: delayed
                  </h3>
                  <p className="text-gray-200">
                    Helen never thought that her decision to travel by plane would save her life.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30 relative">
                  <button className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
                    Start game
                  </button>
                  <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center pr-24">
                    <span className="mr-2">🔬</span>Red high heels
                  </h3>
                  <p className="text-gray-200">
                    A woman buys a new pair of red high heels. Hours later, she dies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "entries" && (
            <div>
              <h2 className="text-3xl font-bold text-red-200 mb-6 flex items-center">
                <span className="mr-3">📋</span>Create Your Own Story
              </h2>
              <p className="text-lg mb-6 text-gray-300">
                Have a mysterious story to share? Create your own Dark Story for others to solve!
              </p>
              <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30">
                  <h3 className="text-xl font-semibold text-red-300 mb-4">Story Creation Guidelines</h3>
                  <ul className="list-none space-y-3 text-gray-200">
                    <li className="flex items-start">
                      <span className="mr-3 text-xl">✍️</span>
                      <span>Write a mysterious scenario that seems impossible or strange</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-xl">🧩</span>
                      <span>Make sure there's a logical solution that can be discovered through yes/no questions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-xl">🎯</span>
                      <span>Test your story with friends to ensure it's solvable but challenging</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-800/50">
                  <p className="text-red-200">
                    <strong>Coming Soon:</strong> Story creation form will be available here where you can submit your own Dark Stories for the community to solve!
                  </p>
                </div>
              </div>
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