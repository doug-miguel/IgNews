import Stripe from "stripe";
import { version } from "../../package.json";

const STRIPE_API_KEY: NodeJS.Process | any = process.env.STRIPE_API_KEY;

export const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2022-08-01",
  appInfo: {
    name: "IgnewsDouglas",
    version,
  },
});
