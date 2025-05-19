import { Redis } from "ioredis";
import Stripe from "stripe";

export function InitFunction() {
  const stripe = new Stripe(process.env.STRIPEKEY!, {
    typescript: true,
    apiVersion: "2023-10-16",
  });
  const redis = new Redis(process.env.REDIS_URI!);

  return { stripe, redis };
}
