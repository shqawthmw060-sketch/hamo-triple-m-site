HAMO & TRIPLE M 
// drizzle/schema.ts
import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar,
  decimal,
  boolean,
  json,
  longtext
} from "drizzle-orm/mysql-core";

// Users table
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  subscriptionTier: mysqlEnum("subscriptionTier", ["Free", "Premium", "Pro Max Plus"]).default("Free").notNull(),
  profileImage: text("profileImage"),
  bio: text("bio"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Movies table
export const movies = mysqlTable("movies", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: longtext("description"),
  genre: varchar("genre", { length: 255 }).notNull(),
  releaseYear: int("releaseYear"),
  director: varchar("director", { length: 255 }),
  cast: text("cast"),
  duration: int("duration"),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0"),
  posterUrl: text("posterUrl"),
  backdropUrl: text("backdropUrl"),
  trailerUrl: text("trailerUrl"),
  contentRating: varchar("contentRating", { length: 20 }),
  minSubscriptionTier: mysqlEnum("minSubscriptionTier", ["Free", "Premium", "Pro Max Plus"]).default("Free").notNull(),
  videoUrl: text("videoUrl"),
  availableQualities: varchar("availableQualities", { length: 100 }).default("HD,Full HD,4K"),
  subtitles: json("subtitles"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Movie = typeof movies.$inferSelect;
export type InsertMovie = typeof movies.$inferInsert;

// Series table
export const series = mysqlTable("series", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: longtext("description"),
  genre: varchar("genre", { length: 255 }).notNull(),
  releaseYear: int("releaseYear"),
  director: varchar("director", { length: 255 }),
  cast: text("cast"),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0"),
  posterUrl: text("posterUrl"),
  backdropUrl: text("backdropUrl"),
  trailerUrl: text("trailerUrl"),
  contentRating: varchar("contentRating", { length: 20 }),
  minSubscriptionTier: mysqlEnum("minSubscriptionTier", ["Free", "Premium", "Pro Max Plus"]).default("Free").notNull(),
  totalSeasons: int("totalSeasons"),
  totalEpisodes: int("totalEpisodes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Series = typeof series.$inferSelect;
export type InsertSeries = typeof series.$inferInsert;

// Episodes table
export const episodes = mysqlTable("episodes", {
  id: int("id").autoincrement().primaryKey(),
  seriesId: int("seriesId").notNull(),
  seasonNumber: int("seasonNumber").notNull(),
  episodeNumber: int("episodeNumber").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: longtext("description"),
  duration: int("duration"),
  releaseDate: timestamp("releaseDate"),
  videoUrl: text("videoUrl"),
  posterUrl: text("posterUrl"),
  availableQualities: varchar("availableQualities", { length: 100 }).default("HD,Full HD,4K"),
  subtitles: json("subtitles"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Episode = typeof episodes.$inferSelect;
export type InsertEpisode = typeof episodes.$inferInsert;

// Favorites table
export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  movieId: int("movieId"),
  seriesId: int("seriesId"),
  type: mysqlEnum("type", ["movie", "series"]).notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;

// Watch History table
export const watchHistory = mysqlTable("watchHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  movieId: int("movieId"),
  episodeId: int("episodeId"),
  type: mysqlEnum("type", ["movie", "episode"]).notNull(),
  watchedAt: timestamp("watchedAt").defaultNow().notNull(),
  duration: int("duration"),
  totalDuration: int("totalDuration"),
  quality: varchar("quality", { length: 50 }),
});

export type WatchHistory = typeof watchHistory.$inferSelect;
export type InsertWatchHistory = typeof watchHistory.$inferInsert;

// Reviews table
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  movieId: int("movieId"),
  seriesId: int("seriesId"),
  type: mysqlEnum("type", ["movie", "series"]).notNull(),
  rating: int("rating").notNull(),
  title: varchar("title", { length: 255 }),
  content: longtext("content"),
  helpful: int("helpful").default(0),
  unhelpful: int("unhelpful").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

// Comments table
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  reviewId: int("reviewId").notNull(),
  userId: int("userId").notNull(),
  content: longtext("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

// Subscriptions table
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tier: mysqlEnum("tier", ["Free", "Premium", "Pro Max Plus"]).notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  status: mysqlEnum("status", ["active", "canceled", "past_due", "paused"]).default("active").notNull(),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  canceledAt: timestamp("canceledAt"),
  autoRenew: boolean("autoRenew").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// Notifications table
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["new_content", "new_episode", "recommendation", "subscription"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: longtext("message"),
  movieId: int("movieId"),
  seriesId: int("seriesId"),
  read: boolean("read").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// User Preferences table
export const userPreferences = mysqlTable("userPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  favoriteGenres: varchar("favoriteGenres", { length: 255 }),
  notificationsEnabled: boolean("notificationsEnabled").default(true),
  emailNotifications: boolean("emailNotifications").default(true),
  defaultQuality: varchar("defaultQuality", { length: 50 }).default("Full HD"),
  autoPlayNext: boolean("autoPlayNext").default(true),
  language: varchar("language", { length: 10 }).default("en"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = typeof userPreferences.$inferInsert;

// Recommendations table
export const recommendations = mysqlTable("recommendations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  movieId: int("movieId"),
  seriesId: int("seriesId"),
  type: mysqlEnum("type", ["movie", "series"]).notNull(),
  score: decimal("score", { precision: 5, scale: 2 }),
  reason: varchar("reason", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = typeof recommendations.$inferInsert;
