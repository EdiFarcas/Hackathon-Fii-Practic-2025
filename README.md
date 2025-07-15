
# Hackathon-Fii-Practic-2025

A full-stack multiplayer web application for collaborative mystery-solving games, inspired by "Dark Stories". Built with Next.js, Prisma, Socket.IO, and OpenAI-compatible chatbots. Includes real-time gameplay, user authentication, AI-powered game master, and a marketplace for story content.

## Features

- **Multiplayer Mystery Game**: Host or join games, solve story-based mysteries with friends in real time.
- **Real-Time Communication**: Sockets for live chat, game state, and turn synchronization.
- **AI Game Master**: Integrated chatbot acts as the game master, answering player questions and guiding the story.
- **User Authentication**: Google OAuth via NextAuth, with user profiles and statistics.
- **Marketplace**: Purchase plans, unlock features, and access/publish stories.
- **Story Creation**: Users can create and submit their own stories.
- **Profile & Stats**: Track games played, hosted, and won, with recent game history.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Node.js, Express, Socket.IO, Prisma ORM
- **Database**: PostgreSQL (via Prisma)
- **Authentication**: NextAuth.js (Google provider)
- **AI/Chatbot**: OpenRouter API (Gemini Pro 1.5 or compatible)
- **Testing**: Jest, React Testing Library

## Project Structure

- `src/app/` — Next.js app, pages, API routes
- `src/components/` — UI components (chat, game, marketplace, etc.)
- `src/services/` — Chatbot service
- `src/interfaces/` — TypeScript interfaces for game, chat, etc.
- `realtime-server/` — Node.js Socket.IO server for real-time game logic
- `socket-server.js` — Simple Socket.IO server for room sync
- `prisma/` — Prisma schema and migrations

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   cd realtime-server && npm install
   ```
2. **Configure environment variables:**
   - Create a `.env` file in the root and in `realtime-server/` with your database, Google OAuth, and OpenRouter API keys.
3. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```
4. **Start servers:**
   - Main app: `npm run dev`
   - Realtime server: `cd realtime-server && node index.js`
   - (Optional) Socket server: `node socket-server.js`
5. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Create/Join Game:** Start a new mystery or join an existing one.
- **Chat & Play:** Ask questions, discuss, and solve the story with help from the AI game master.
- **Profile:** View your stats, recent games, and manage your account.
- **Marketplace:** Upgrade your plan or unlock new stories.

## Marketplace Plans

- **Free Plan:** Up to 5 players, basic stories.
- **Pro Plan:** Up to 8 players, all stories, AI-assisted publishing, 3 hints/day.
- **Exclusive Plan:** Up to 15 players, custom themes, 5 hints/day, advanced publishing.

## Development

- **Testing:**
  ```bash
  npm run test
  ```
- **Linting:**
  ```bash
  npm run lint
  ```
- **Prisma Studio:**
  ```bash
  npx prisma studio
  ```

## Deployment

- Deploy the Next.js app on [Vercel](https://vercel.com/).
- Deploy the realtime server on a Node.js host (e.g., Railway, Heroku).

## License

MIT. See [LICENSE](LICENSE) for details.

---

*Built for Fii Practic Hackathon 2025.*
