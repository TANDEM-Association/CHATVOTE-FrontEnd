import Stripe from "stripe";

import "server-only";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(stripeSecretKey, {
  appInfo: {
    name: "chatvote",
    url: "https://chatvote.fr",
  },
});
