import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
// Update the path below to the correct relative path if needed
// Update the path below to the correct relative path if needed
// Update the path below to the correct relative path if needed
import { authOptions } from '../api/auth/[...nextauth]/authOptions' // Adjust the path if your file is in a different location and ensure the extension matches

const prisma = new PrismaClient()

// Types for better TypeScript support
interface UserProfileData {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: Date
  gamesHostedCount: number
  gamesPlayedCount: number
  totalGamesWon: number
  recentGames: Array<{
    id: string
    title: string
    status: string
    createdAt: Date
    isHost: boolean
  }>
}

export async function getUserProfile(userId?: string): Promise<UserProfileData | null> {
  try {
    // If no userId provided, get from session
    let targetUserId = userId
    
    if (!targetUserId) {
      const session = await getServerSession(authOptions)
      if (!session?.user?.email) {
        return null
      }
      
      // Find user by email from session
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
      })
      
      if (!sessionUser) return null
      targetUserId = sessionUser.id
    }

    // Fetch user with related data
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        gamesHosted: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
            players: {
              select: {
                userId: true,
                user: {
                  select: { name: true }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 5 // Get 5 most recent hosted games
        },
        gamesPlayed: {
          include: {
            game: {
              select: {
                id: true,
                title: true,
                status: true,
                createdAt: true,
                hostId: true
              }
            }
          },
          orderBy: { joinedAt: 'desc' },
          take: 5 // Get 5 most recent played games
        }
      }
    })

    if (!user) return null

    // Calculate statistics
    const gamesHostedCount = await prisma.game.count({
      where: { hostId: user.id }
    })

    const gamesPlayedCount = await prisma.gamePlayer.count({
      where: { userId: user.id }
    })

    // For games won, you might need to add logic based on your game completion criteria
    // This is a placeholder - adjust based on how you determine winners
    const totalGamesWon = await prisma.game.count({
      where: {
        status: 'FINISHED',
        OR: [
          { hostId: user.id }, // If host wins by default, or
          {
            players: {
              some: {
                userId: user.id
                // Add additional winning conditions here
              }
            }
          }
        ]
      }
    })

    // Combine recent games (both hosted and played)
    const hostedGamesFormatted = user.gamesHosted.map(game => ({
      id: game.id,
      title: game.title ?? '',
      status: game.status ?? '',
      createdAt: game.createdAt ?? new Date(0),
      isHost: true
    }))

    const playedGamesFormatted = user.gamesPlayed.map(gamePlayer => ({
      id: gamePlayer.game.id,
      title: gamePlayer.game.title ?? '',
      status: gamePlayer.game.status ?? '',
      createdAt: gamePlayer.game.createdAt ?? new Date(0),
      isHost: false
    }))

    // Combine and sort by date
    const recentGames = [...hostedGamesFormatted, ...playedGamesFormatted]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10) // Keep top 10 most recent

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      gamesHostedCount,
      gamesPlayedCount,
      totalGamesWon,
      recentGames
    }

  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

// Get user by email (useful for login scenarios)
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true
      }
    })
    return user
  } catch (error) {
    console.error('Error fetching user by email:', error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

// Get user's game statistics
export async function getUserGameStats(userId: string) {
  try {
    const [gamesHosted, gamesPlayed, activeGames] = await Promise.all([
      prisma.game.count({
        where: { hostId: userId }
      }),
      prisma.gamePlayer.count({
        where: { userId }
      }),
      prisma.game.count({
        where: {
          status: 'IN_PROGRESS',
          OR: [
            { hostId: userId },
            { players: { some: { userId } } }
          ]
        }
      })
    ])

    return {
      gamesHosted,
      gamesPlayed,
      activeGames,
      totalGames: gamesHosted + gamesPlayed
    }
  } catch (error) {
    console.error('Error fetching game stats:', error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

// Server component example
export default async function ProfilePageServer({ userId }: { userId?: string }) {
  const userProfile = await getUserProfile(userId)
  
  if (!userProfile) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">User not found</h1>
        <p className="text-gray-600">The requested user profile could not be loaded.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold">{userProfile.name || 'Anonymous User'}</h1>
            <p className="text-gray-600">{userProfile.email}</p>
            <p className="text-sm text-gray-500">
              Member since {new Date(userProfile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-800">Games Hosted</h3>
          <p className="text-3xl font-bold text-blue-600">{userProfile.gamesHostedCount}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-green-800">Games Played</h3>
          <p className="text-3xl font-bold text-green-600">{userProfile.gamesPlayedCount}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800">Games Won</h3>
          <p className="text-3xl font-bold text-yellow-600">{userProfile.totalGamesWon}</p>
        </div>
      </div>

      {/* Recent Games Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Games</h2>
        {userProfile.recentGames.length > 0 ? (
          <div className="space-y-3">
            {userProfile.recentGames.map((game) => (
              <div key={game.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{game.title}</h3>
                  <p className="text-sm text-gray-600">
                    {game.isHost ? 'Hosted' : 'Played'} • Status: {game.status}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(game.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No games found.</p>
        )}
      </div>
    </div>
  )
}