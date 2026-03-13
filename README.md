// server/db.ts
import { eq, desc, like, and, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  movies,
  series,
  episodes,
  favorites,
  watchHistory,
  reviews,
  subscriptions,
  notifications,
  userPreferences,
  recommendations
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Movies queries
export async function getAllMovies(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(movies).limit(limit).offset(offset).orderBy(desc(movies.createdAt));
}

export async function getMovieById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(movies).where(eq(movies.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function searchMovies(query: string, limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(movies)
    .where(like(movies.title, `%${query}%`))
    .limit(limit);
}

export async function getMoviesByGenre(genre: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(movies)
    .where(like(movies.genre, `%${genre}%`))
    .limit(limit)
    .orderBy(desc(movies.rating));
}

export async function getFeaturedMovies(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(movies)
    .orderBy(desc(movies.rating))
    .limit(limit);
}

// Series queries
export async function getAllSeries(limit = 20, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(series).limit(limit).offset(offset).orderBy(desc(series.createdAt));
}

export async function getSeriesById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(series).where(eq(series.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function searchSeries(query: string, limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(series)
    .where(like(series.title, `%${query}%`))
    .limit(limit);
}

export async function getSeriesByGenre(genre: string, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(series)
    .where(like(series.genre, `%${genre}%`))
    .limit(limit)
    .orderBy(desc(series.rating));
}

export async function getFeaturedSeries(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(series)
    .orderBy(desc(series.rating))
    .limit(limit);
}

// Episodes queries
export async function getEpisodesBySeriesId(seriesId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(episodes)
    .where(eq(episodes.seriesId, seriesId))
    .orderBy(episodes.seasonNumber, episodes.episodeNumber);
}

export async function getEpisodeById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(episodes).where(eq(episodes.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Favorites queries
export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(favorites).where(eq(favorites.userId, userId));
}

export async function addToFavorites(userId: number, movieId?: number, seriesId?: number, type: 'movie' | 'series' = 'movie') {
  const db = await getDb();
  if (!db) return;
  await db.insert(favorites).values({
    userId,
    movieId: movieId || null,
    seriesId: seriesId || null,
    type,
  });
}

export async function removeFromFavorites(userId: number, movieId?: number, seriesId?: number) {
  const db = await getDb();
  if (!db) return;
  const conditions: any[] = [eq(favorites.userId, userId)];
  if (movieId) conditions.push(eq(favorites.movieId, movieId));
  if (seriesId) conditions.push(eq(favorites.seriesId, seriesId));
  
  await db.delete(favorites).where(and(...conditions));
}

// Watch History queries
export async function addToWatchHistory(userId: number, movieId?: number, episodeId?: number, type: 'movie' | 'episode' = 'movie', duration?: number, totalDuration?: number, quality?: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(watchHistory).values({
    userId,
    movieId: movieId || null,
    episodeId: episodeId || null,
    type,
    duration: duration || null,
    totalDuration: totalDuration || null,
    quality: quality || null,
  });
}

export async function getUserWatchHistory(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(watchHistory)
    .where(eq(watchHistory.userId, userId))
    .orderBy(desc(watchHistory.watchedAt))
    .limit(limit);
}

// Reviews queries
export async function addReview(userId: number, rating: number, movieId?: number, seriesId?: number, type: 'movie' | 'series' = 'movie', title?: string, content?: string) {
  const db = await getDb();
  if (!db) return;
  return db.insert(reviews).values({
    userId,
    rating,
    movieId: movieId || null,
    seriesId: seriesId || null,
    type,
    title: title || null,
    content: content || null,
  });
}

export async function getReviewsForMovie(movieId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews)
    .where(eq(reviews.movieId, movieId))
    .orderBy(desc(reviews.createdAt));
}

export async function getReviewsForSeries(seriesId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(reviews)
    .where(eq(reviews.seriesId, seriesId))
    .orderBy(desc(reviews.createdAt));
}

// Subscriptions queries
export async function getUserSubscription(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSubscription(userId: number, tier: 'Free' | 'Premium' | 'Pro Max Plus', stripeCustomerId?: string, stripeSubscriptionId?: string) {
  const db = await getDb();
  if (!db) return;
  return db.insert(subscriptions).values({
    userId,
    tier,
    stripeCustomerId,
    stripeSubscriptionId,
    status: 'active',
  });
}

// Notifications queries
export async function getUserNotifications(userId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function createNotification(userId: number, type: 'new_content' | 'new_episode' | 'recommendation' | 'subscription', title: string, message?: string, movieId?: number, seriesId?: number) {
  const db = await getDb();
  if (!db) return;
  return db.insert(notifications).values({
    userId,
    type,
    title,
    message,
    movieId,
    seriesId,
  });
}

// User Preferences queries
export async function getUserPreferences(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUserPreferences(userId: number) {
  const db = await getDb();
  if (!db) return;
  return db.insert(userPreferences).values({ userId });
}

// Recommendations queries
export async function getRecommendationsForUser(userId: number, limit = 10) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(recommendations)
    .where(eq(recommendations.userId, userId))
    .orderBy(desc(recommendations.score))
    .limit(limit);
}

export async function addRecommendation(userId: number, movieId?: number, seriesId?: number, type: 'movie' | 'series' = 'movie', score?: number, reason?: string) {
  const db = await getDb();
  if (!db) return;
  const scoreDecimal = score ? (score as any) : null;
  return db.insert(recommendations).values({
    userId,
    type,
    movieId: movieId || null,
    seriesId: seriesId || null,
    score: scoreDecimal,
    reason: reason || null,
  });
}
