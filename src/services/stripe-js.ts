import { loadStripe } from "@stripe/stripe-js";

const STRIPE_PUBLIC_KEY: any | string =
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
export async function getStripeJs() {
  const stripeJs = await loadStripe(STRIPE_PUBLIC_KEY);
  return stripeJs;
}
