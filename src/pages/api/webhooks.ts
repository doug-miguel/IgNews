import { NextApiRequest, NextApiResponse } from "next";

import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSuscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvent = new Set([
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const secret: string[] | undefined | any = req.headers["stripe-signature"];
    const WEBHOOK: string | undefined | any = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(buf, secret, WEBHOOK);
    } catch (err: any) {
      return res.status(400).send(`Webhook error ${err.message}`);
    }

    const { type } = event;

    if (relevantEvent.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription: any = event.data.object as Stripe.Subscription;
            await saveSuscription(
              subscription.id,
              subscription.customer.toString(),
              false
            );
          case "checkout.session.completed":
            const checkoutSession: any = event.data
              .object as Stripe.Checkout.Session;
            await saveSuscription(
              checkoutSession.subscription?.toString(),
              checkoutSession.customer?.toString(),
              true
            );
            break;
          default:
            throw new Error("Unhandled event.");
        }
      } catch (err) {
        return res.json({ error: "Webhook handler failed." });
      }
    }

    res.status(200).json({ recived: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
