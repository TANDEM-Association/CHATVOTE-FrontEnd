import { Button } from '@/components/ui/button';
import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { stripe } from '@/lib/stripe/stripe';
import { CircleCheckIcon, FrownIcon } from 'lucide-react';
import Link from 'next/link';
import type Stripe from 'stripe';
import { getTranslations } from 'next-intl/server';

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const t = await getTranslations('donation');
  const actualSearchParams = await searchParams;

  if (!actualSearchParams.session_id) {
    return <PaymentFailed />;
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(actualSearchParams.session_id, {
      expand: ['line_items', 'payment_intent'],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  if (paymentIntent.status !== 'succeeded') {
    return <PaymentFailed />;
  }

  return (
    <>
      <CardHeader className="flex flex-col items-center justify-center">
        <CircleCheckIcon className="size-16" />
        <CardTitle className="pt-4 text-center">{t('success-title')}</CardTitle>
        <CardDescription className="pt-2 text-center">
          {t('success-description')}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/">{t('back-to-home')}</Link>
        </Button>
      </CardFooter>
    </>
  );
}

async function PaymentFailed() {
  const t = await getTranslations('donation');
  return (
    <>
      <CardHeader className="flex flex-col items-center justify-center">
        <FrownIcon className="size-16" />
        <CardTitle className="pt-4 text-center">{t('failed-title')}</CardTitle>
        <CardDescription className="pt-2 text-center">
          {t('failed-description')}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href="/donate">{t('back-to-donate')}</Link>
        </Button>
      </CardFooter>
    </>
  );
}

export default Page;
