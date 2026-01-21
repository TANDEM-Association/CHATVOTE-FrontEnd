import React from "react";

import Link from "next/link";

import { CircleCheckIcon, FrownIcon } from "lucide-react";
import type Stripe from "stripe";

import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripe } from "@/lib/stripe/stripe";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const actualSearchParams = await searchParams;

  if (!actualSearchParams.session_id) {
    return <PaymentFailed />;
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(actualSearchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  if (paymentIntent.status !== "succeeded") {
    return <PaymentFailed />;
  }

  return (
    <React.Fragment>
      <CardHeader className="flex flex-col items-center justify-center">
        <CircleCheckIcon className="size-16" />
        <CardTitle className="pt-4 text-center">
          Votre don a été effectué avec succès !
        </CardTitle>
        <CardDescription className="pt-2 text-center">
          Merci beaucoup pour votre soutien ! Nous utiliserons votre don pour
          permettre une information neutre et indépendante.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/">Retour à l&lsquo;accueil</Link>
        </Button>
      </CardFooter>
    </React.Fragment>
  );
}

function PaymentFailed() {
  return (
    <React.Fragment>
      <CardHeader className="flex flex-col items-center justify-center">
        <FrownIcon className="size-16" />
        <CardTitle className="pt-4 text-center">
          Votre don n&lsquo;a malheureusement pas abouti.
        </CardTitle>
        <CardDescription className="pt-2 text-center">
          Veuillez réessayer.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/donate">Retour à la page de don</Link>
        </Button>
      </CardFooter>
    </React.Fragment>
  );
}

export default Page;
