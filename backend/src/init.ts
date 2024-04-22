import { Queue } from "bullmq";
import DF from "ioredis";
import Stripe from "stripe";

export function InitFunction() {
  const myQueue = new Queue("job", {
    connection: {
      host: process.env.REDISHOST || "localhost",
      port: Number(process.env.REDISPORT) || 6378,
    },
  });

  const stripe = new Stripe(process.env.STRIPEKEY!, {
    typescript: true,
    apiVersion: "2023-10-16",
  });
  const redis = new DF({
    host: process.env.CACHEHOST || "localhost",
    port: Number(process.env.CACHEPORT) || 6380,
  });

  return { myQueue, stripe, redis };
}
