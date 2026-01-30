"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useAnonymousAuth } from "@/components/anonymous-auth";
import { useChatStore } from "@/components/providers/chat-store-provider";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { listenToHistory } from "@/lib/firebase/firebase";
import { type ChatSession } from "@/lib/firebase/firebase.types";
import { cn } from "@/lib/utils";

type Props = {
  history?: ChatSession[];
};

function SidebarHistory({ history: initialHistory }: Props) {
  const { user } = useAnonymousAuth();
  const [history, setHistory] = useState<ChatSession[]>(initialHistory ?? []);
  const chatId = useChatStore((state) => state.chatId);
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = listenToHistory(user.uid, (history) => {
      setHistory(history);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  function handleClick() {
    setOpenMobile(false);
  }

  if (history.length === 0) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Historique</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {history.map((item) => {
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  className={cn(chatId === item.id && "bg-muted")}
                >
                  <Link href={`/chat/${item.id}`} onClick={handleClick}>
                    <span className="w-full truncate">
                      {item.title ||
                        item.party_ids?.join(",") ||
                        item.party_id ||
                        "chatvote"}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default SidebarHistory;
