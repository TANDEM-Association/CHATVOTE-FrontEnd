import React from "react";

import Link from "next/link";

import { CircleCheckIcon, FrownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stripe } from "@/lib/stripe/stripe";

async function validateStripeSession(sessionId: string): Promise<boolean> {
  try {
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    // Vérifier le statut de la session (expired, open, complete)
    if (checkoutSession.status !== "complete") {
      return false;
    }

    // Vérifier que payment_intent existe et est un objet (pas une string)
    const paymentIntent = checkoutSession.payment_intent;

    if (paymentIntent === null || typeof paymentIntent === "string") {
      return false;
    }

    if (paymentIntent.status !== "succeeded") {
      return false;
    }

    return true;
  } catch (error) {
    // Session invalide, n'existe pas, ou erreur Stripe
    console.error("Stripe session retrieval error:", error);
    return false;
  }
}

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const actualSearchParams = await searchParams;

  if (!actualSearchParams.session_id) {
    return <PaymentFailed />;
  }

  const isValidPayment = await validateStripeSession(
    actualSearchParams.session_id,
  );

  if (isValidPayment === false) {
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
