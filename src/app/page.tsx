'use client';

import { useState, useEffect, useRef } from "react";
import { createStory } from "./homepageServe"
import { io, Socket } from "socket.io-client";
import { createLobby } from "./homepageServe";
import { getStoryByTitle } from "@/data/storyCards";
import type { GameCardData } from "@/models/GameCardData";

export default function MurderMysteryGiveaway() {
  const [activeTab, setActiveTab] = useState("how");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [showCreateStoryModal, setShowCreateStoryModal] = useState(false);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [joinGameId, setJoinGameId] = useState("");
  const [joinError, setJoinError] = useState("");
  const [showLobbyModal, setShowLobbyModal] = useState(false);
  const [lobbyGameId, setLobbyGameId] = useState("");
  const [lobbyTitle, setLobbyTitle] = useState("");
  const [lobbyDescription, setLobbyDescription] = useState("");
  const [lobbyError, setLobbyError] = useState("");
  const [isCreatingLobby, setIsCreatingLobby] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [sharedValue, setSharedValue] = useState("");
  const [currentStory, setCurrentStory] = useState<GameCardData | null>(null);

  const handleStartGame = (title: string) => {
    const story = getStoryByTitle(title);
    if (story) {
      setCurrentStory(story);
      setModalTitle(title);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateLobby = () => {
    setShowLobbyModal(true);
    setLobbyGameId("");
    setLobbyTitle("");
    setLobbyDescription("");
    setLobbyError("");
  };

  const closeLobbyModal = () => {
    setShowLobbyModal(false);
  };

  const handleJoinLobby = async () => {
    setJoinError("");
    if (!joinGameId.trim()) {
      setJoinError("Introdu un Game ID valid!");
      return;
    }
    // Aici poți adăuga logica de verificare în DB sau direct conectare la WebSocket    // Redirect către pagina de game cu id-ul și povestea selectată
    window.location.href = `/game?gameId=${joinGameId}&story=${modalTitle}`;
  };

  const openCreateStoryModal = () => {
    setShowCreateStoryModal(true);
    setStoryTitle("");
    setStoryDescription("");
    setPublishError("");
  };

  const closeCreateStoryModal = () => {
    setShowCreateStoryModal(false);
  };

  const handlePublishStory = async () => {
    setIsPublishing(true);
    setPublishError("");
    try {
      // Folosește apel server action, nu fetch
      await createStory({ title: storyTitle, description: storyDescription });
      setShowCreateStoryModal(false);
    } catch {
      setPublishError("Eroare la publicare. Încearcă din nou.");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLobbySubmit = async () => {
    setIsCreatingLobby(true);
    setLobbyError("");
    try {
      // Folosește apel server action, nu fetch
      await createLobby({ id: lobbyGameId, title: lobbyTitle, description: lobbyDescription });
      setShowLobbyModal(false);
    } catch {
      setLobbyError("Eroare la crearea lobby-ului. Încearcă din nou.");
    } finally {
      setIsCreatingLobby(false);
    }
  };

  // Conectare la WebSocket și join room după Game ID
  useEffect(() => {
    if (!joinGameId) return;
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3001");
    }
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit("join-room", joinGameId);
    const handleServerUpdate = (data: string) => {
      setSharedValue(data);
    };
    socket.on("server-update", handleServerUpdate);
    return () => {
      socket.off("server-update", handleServerUpdate);
    };
  }, [joinGameId]);

  // Trimite update la ceilalți când se schimbă valoarea
  const handleSharedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSharedValue(e.target.value);
    if (socketRef.current && joinGameId) {
      socketRef.current.emit("client-update", { roomId: joinGameId, data: e.target.value });
    }
  };

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
                    Dark Stories are mysterious riddles where you&#39;re given a strange, often macabre scenario. 
                    Your job is to uncover the hidden truth by asking <strong className="text-red-300"> questions to the Master</strong>.
                  </p>
                </div>
                
                <ol className="list-decimal pl-8 space-y-4 text-gray-200 text-lg">
                  <li className="flex items-start">
                    <span className="mr-3 text-2xl">🎭</span>
                    <span>A <strong className="text-red-300">Story Master</strong> reads a mysterious scenario (like A man lives on the 20th floor but only takes the elevator to the 10th floor, then walks the rest)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-2xl">❓</span>
                    <span>Players ask <strong className="text-red-300"> questions only</strong> to gather clues and piece together the truth</span>
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
                    &quot;A woman enters a room, screams, and immediately knows her husband is dead. How?&quot;
                  </p>
                  <p className="text-sm text-gray-400">
                    Players must ask questions like &quot;Was she at home?&quot;, &quot;Did she see the body?&quot;, &quot;Was there a phone call?&quot; to uncover the solution.
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
                  <button
                    onClick={() => handleStartGame("Jack and Judy are dead")} // <-- change title per story
                    className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  >
                    Start game
                  </button>
                  <h3 className="text-xl font-semibold text-red-300 mb-4 flex items-center pr-24">
                    <span className="mr-2">🔍</span>Jack and Judy are dead
                  </h3>
                  <p className="text-gray-200">
                        Jack and Judy were lying on the floor dead. There was a puddle of water and broken glass on the floor. How did they die?</p>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30 relative">
                  <button
                    onClick={() => handleStartGame("Fatal shot")} // <-- change title per story
                    className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  >
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
                  <button
                    onClick={() => handleStartGame("Death: delayed")} // <-- change title per story
                    className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  >
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
                  <button
                    onClick={() => handleStartGame("Red high heels")} // <-- change title per story
                    className="absolute top-4 right-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                  >
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
                      <span>Make sure there&#39;s a logical solution that can be discovered through yes/no questions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-xl">🎯</span>
                      <span>Test your story with friends to ensure it&#39;s solvable but challenging</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-900/20 p-6 rounded-lg border border-red-800/50 flex flex-col gap-4">
                  <p className="text-red-200">
                    <strong>Coming Soon:</strong> Story creation form will be available here where you can submit your own Dark Stories for the community to solve!
                  </p>
                  <button
                    onClick={openCreateStoryModal}
                    className="bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all self-start"
                  >
                    ✍️ Create Story
                  </button>
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

      {/* Modal */}
      {showModal && currentStory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-2xl border-2 border-red-700 max-w-lg w-full relative text-white">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-red-300 hover:text-white text-2xl font-bold transition-colors duration-200"
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold text-red-300 mb-4 text-center">{currentStory.title}</h2>
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-col items-center">
              <img 
                src={currentStory.imageUrl} 
                alt={currentStory.title}
                className="w-32 h-48 object-contain rounded-lg mb-4 border border-red-700"
              />
              <p className="text-gray-800 text-lg font-medium mb-4 text-center">
                {currentStory.description}
              </p>
              <p className="text-base text-center font-semibold text-black">
                Difficulty: <span className={`$ {
                  currentStory.difficulty === 'Hard' ? 'text-red-600' :
                  currentStory.difficulty === 'Easy' ? 'text-green-600' :
                  'text-yellow-600'
                } font-bold`}>
                  {currentStory.difficulty}
                </span>
              </p>
            </div>
            <p className="text-gray-300 mb-4 text-center">
              Introdu Game ID pentru a te conecta la un lobby:
            </p>
            <input
              type="text"
              value={joinGameId}
              onChange={e => setJoinGameId(e.target.value)}
              className="p-3 rounded-lg bg-gray-800 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-full mb-4"
              placeholder="Game ID"
            />
            {joinError && <p className="text-red-400 font-semibold mb-4 text-center">{joinError}</p>}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCreateLobby}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all"
              >
                🔧 Create Lobby
              </button>
              <button
                onClick={handleJoinLobby}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all"
                disabled={!joinGameId.trim()}
              >
                🔑 Join Lobby
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pentru crearea unei povești */}
      {showCreateStoryModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-2xl border-2 border-red-700 max-w-lg w-full relative text-white text-center space-y-6">
            <button
              onClick={closeCreateStoryModal}
              className="absolute top-4 right-4 text-red-300 hover:text-white text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-red-300 mb-4">Creează o poveste nouă</h2>
            <div className="flex flex-col gap-4 text-left">
              <label className="font-semibold text-red-200">Titlu</label>
              <input
                type="text"
                value={storyTitle}
                onChange={e => setStoryTitle(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Titlul poveștii"
              />
              <label className="font-semibold text-red-200 mt-2">Descriere</label>
              <textarea
                value={storyDescription}
                onChange={e => setStoryDescription(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                placeholder="Descrierea poveștii"
              />
            </div>
            {publishError && <p className="text-red-400 font-semibold">{publishError}</p>}
            <button
              onClick={handlePublishStory}
              disabled={isPublishing || !storyTitle.trim() || !storyDescription.trim()}
              className={`bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all ${isPublishing ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isPublishing ? 'Se publică...' : '📢 Publish Story'}
            </button>
          </div>
        </div>
      )}

      {/* Lobby Creation Modal */}
      {showLobbyModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-2xl border-2 border-red-700 max-w-lg w-full relative text-white text-center space-y-6">
            <button
              onClick={closeLobbyModal}
              className="absolute top-4 right-4 text-red-300 hover:text-white text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-red-300 mb-4">Creează un Lobby Nou</h2>
            <div className="flex flex-col gap-4 text-left">
              <label className="font-semibold text-red-200">Game ID</label>
              <input
                type="text"
                value={lobbyGameId}
                onChange={e => setLobbyGameId(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ID-ul unic al jocului"
              />
              <label className="font-semibold text-red-200 mt-2">Titlu</label>
              <input
                type="text"
                value={lobbyTitle}
                onChange={e => setLobbyTitle(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Titlul poveștii"
              />
              <label className="font-semibold text-red-200 mt-2">Descriere</label>
              <textarea
                value={lobbyDescription}
                onChange={e => setLobbyDescription(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 border border-red-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                placeholder="Descrierea poveștii"
              />
            </div>
            {lobbyError && <p className="text-red-400 font-semibold">{lobbyError}</p>}
            <button
              onClick={handleLobbySubmit}
              disabled={isCreatingLobby || !lobbyGameId.trim() || !lobbyTitle.trim() || !lobbyDescription.trim()}
              className={`bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all ${isCreatingLobby ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isCreatingLobby ? 'Se creează...' : '🚀 Creează Lobby'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Add RevealSolution component at the bottom of the file
function RevealSolution({ solution }: { solution: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mt-4 text-center">
      {show && (
        <div className="mt-3 p-3 bg-yellow-100 text-black rounded shadow text-sm border border-yellow-400">
          <strong>Solution:</strong> {solution}
        </div>
      )}
    </div>
  );
}

