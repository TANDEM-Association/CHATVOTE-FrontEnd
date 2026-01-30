import { Suspense } from "react";

import Link from "next/link";

import { HeartHandshakeIcon, MessageCircleIcon, UserIcon } from "lucide-react";

import LoginButton from "@/components/auth/login-button";
import DonationDialog from "@/components/donation-dialog";
import FeedbackDialog from "@/components/feedback-dialog";
import LoadingSpinner from "@/components/loading-spinner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getAuth } from "@/lib/firebase/firebase-server";

import ChatSidebarGroupSelect from "./chat-sidebar-group-select";
import SidebarHistorySr from "./sidebar-history-sr";
import SidebarNewChatButtons from "./sidebar-new-chat-buttons";

async function ChatSidebar() {
  const auth = await getAuth();
  const isAuthenticated = auth.session !== null && !auth.session.isAnonymous;

  return (
    <Sidebar
      mobileVisuallyHiddenTitle="chatvote"
      mobileVisuallyHiddenDescription="Démarrez un nouveau chat ou sélectionnez une conversation précédente."
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Nouveau chat</SidebarGroupLabel>
            <SidebarNewChatButtons />

            <ChatSidebarGroupSelect />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Soutenez chatvote</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <LoginButton
                  isAuthenticated={isAuthenticated}
                  user={auth.user}
                  noUserChildren={
                    <SidebarMenuButton>
                      <UserIcon className="size-4" />
                      <span>Se connecter</span>
                    </SidebarMenuButton>
                  }
                  userChildren={
                    <SidebarMenuButton>
                      <UserIcon className="size-4" />
                      <span>Compte</span>
                    </SidebarMenuButton>
                  }
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <DonationDialog>
                  <SidebarMenuButton>
                    <HeartHandshakeIcon className="size-4 text-red-400" />
                    <span>Faire un don</span>
                  </SidebarMenuButton>
                </DonationDialog>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <FeedbackDialog>
                  <SidebarMenuButton>
                    <MessageCircleIcon className="size-4 text-blue-400" />
                    <span>Feedback</span>
                  </SidebarMenuButton>
                </FeedbackDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Suspense
          fallback={
            <div className="text-muted-foreground flex h-32 flex-col items-center justify-center gap-2 text-center text-sm">
              <LoadingSpinner />
              <p>Chargement de l&lsquo;historique...</p>
            </div>
          }
        >
          <SidebarHistorySr />
        </Suspense>
        <SidebarGroup>
          <SidebarGroupLabel>Informations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/about">À propos de chatvote</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/guide">Comment fonctionne chatvote ?</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/sources">Sources</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/legal-notice">Mentions légales</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/privacy-policy">Confidentialité</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default ChatSidebar;
