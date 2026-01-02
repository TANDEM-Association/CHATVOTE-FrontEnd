import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";
import AuthServiceWorkerProvider from "@/components/providers/auth-service-worker-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";
import { domAnimation, LazyMotion } from "motion/react";
import { IS_EMBEDDED } from "@/lib/utils";
import { THEME_COLOR_SCRIPT, viewport } from "@/lib/theme-script";
import "./globals.css";

export { viewport };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </Head>
      <AuthServiceWorkerProvider />
      <TooltipProvider>
        <body>
          <LazyMotion features={domAnimation}>
            <ThemeProvider
              attribute="class"
              enableSystem={!IS_EMBEDDED}
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster expand duration={1500} position="top-right" />
            <Analytics />
          </LazyMotion>
        </body>
      </TooltipProvider>
    </html>
  );
}