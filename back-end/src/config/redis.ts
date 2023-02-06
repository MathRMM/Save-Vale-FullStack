import { createClient } from "redis";

export async function connectRedis() {
  const redisClient = createClient();
  await redisClient.connect();

  return redisClient;
}
