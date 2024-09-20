// File: src/server/stripe/client.ts
import Stripe from "stripe";
import { env } from "src/env.mjs";

export const stripe = new Stripe(env.STRIPE_SK, {
  apiVersion: "2022-11-15",
});
