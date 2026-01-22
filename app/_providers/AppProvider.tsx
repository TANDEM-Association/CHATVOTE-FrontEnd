import React from "react";

import { Analytics } from "@vercel/analytics/react";
import { domAnimation, LazyMotion } from "motion/react";

import {
  AnonymousAuthProvider,
  type FullUser,
} from "@/components/anonymous-auth";
import AuthServiceWorkerProvider from "@/components/providers/auth-service-worker-provider";
import { PartiesProvider } from "@/components/providers/parties-provider";
import TenantProvider from "@/components/providers/tenant-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { type Tenant } from "@/lib/firebase/firebase.types";
import { type PartyDetails } from "@/lib/party-details";
import { IS_EMBEDDED } from "@/lib/utils";

type AppProviderProps = {
  children: React.ReactNode;
  user: FullUser | null;
  tenant: Tenant | undefined;
  parties: PartyDetails[];
};

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  user,
  tenant,
  parties,
}) => {
  return (
    <React.Fragment>
      <AuthServiceWorkerProvider />
      <TooltipProvider>
        <AnonymousAuthProvider user={user}>
          <TenantProvider tenant={tenant}>
            <LazyMotion features={domAnimation}>
              <ThemeProvider
                attribute="class"
                enableSystem={!IS_EMBEDDED}
                disableTransitionOnChange
              >
                <PartiesProvider parties={parties}>{children}</PartiesProvider>
              </ThemeProvider>
              <Toaster expand duration={1500} position="top-right" />
              {/* <LoginReminderToast /> */}
              {/* TODO: implement again when problems are fixed <IframeChecker /> */}
              <Analytics />
            </LazyMotion>
          </TenantProvider>
        </AnonymousAuthProvider>
      </TooltipProvider>
    </React.Fragment>
  );
};
