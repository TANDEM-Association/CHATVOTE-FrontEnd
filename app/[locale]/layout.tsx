import { AnonymousAuthProvider } from '@/components/anonymous-auth';
import { PartiesProvider } from '@/components/providers/parties-provider';
import TenantProvider from '@/components/providers/tenant-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getParties, getUser } from '@/lib/firebase/firebase-server';
import { headers } from 'next/headers';
import { TENANT_ID_HEADER } from '@/lib/constants';
import { getTenant } from '@/lib/firebase/firebase-admin';
import {
  setRequestLocale,
  getMessages,
} from 'next-intl/server';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { routing } from '@/i18n/routing';
import { generateBaseMetadata } from '@/lib/metadata';
import { viewport } from '@/lib/theme-script';

export { viewport };

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateBaseMetadata(locale);
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for client components
  const messages = await getMessages();
  const parties = await getParties();
  const headersList = await headers();
  const tenantId = headersList.get(TENANT_ID_HEADER);
  const tenant = await getTenant(tenantId);
  const user = await getUser();

  return (
    <AnonymousAuthProvider user={user}>
      <TenantProvider tenant={tenant}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <PartiesProvider parties={parties}>
            <div className="relative flex w-full flex-col">
              <Header />
              <main className="mx-auto min-h-[calc(100vh-var(--header-height)-var(--footer-height))] w-full max-w-xl grow px-4 pb-8 md:px-0">
                {children}
              </main>
              <Footer />
            </div>
          </PartiesProvider>
        </NextIntlClientProvider>
      </TenantProvider>
    </AnonymousAuthProvider>
  );
}
