import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

class InMemoryRedis {
  private store = new Map<string, { value: string; expireAt?: number }>();

  private isExpired(entry: { expireAt?: number }) {
    return entry.expireAt !== undefined && Date.now() > entry.expireAt;
  }

  async get(key: string) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, _mode?: string, duration?: number) {
    const expireAt =
      duration !== undefined ? Date.now() + duration * 1000 : undefined;
    this.store.set(key, { value, expireAt });
    return "OK";
  }

  async del(key: string) {
    this.store.delete(key);
    return 1;
  }
}

const redisClient = () => {
  if (process.env.REDIS_URL) {
    console.log("Redis connected successfully");
    return new Redis(process.env.REDIS_URL);
  }

  console.warn(
    "REDIS_URL not set — using in-memory cache (fine for local development)",
  );
  return new InMemoryRedis() as unknown as Redis;
};

export const redis = redisClient();
