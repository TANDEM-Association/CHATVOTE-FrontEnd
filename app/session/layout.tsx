import AnonymousUserChatStoreUpdater from '@/components/auth/anonymous-user-chat-store-updater';
import ChatHeader from '@/components/chat/chat-header';
import ChatSidebar from '@/components/chat/sidebar/chat-sidebar';
import { ChatStoreProvider } from '@/components/providers/chat-store-provider';
import SocketProvider from '@/components/providers/socket-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

type Props = {
  children: React.ReactNode;
};

async function Layout({ children }: Props) {
  return (
    <ChatStoreProvider>
      <AnonymousUserChatStoreUpdater />
      <SocketProvider>
        <SidebarProvider defaultOpen={true}>
          <ChatSidebar />
          <SidebarInset className="flex h-dvh flex-col overflow-hidden">
            <ChatHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </SocketProvider>
    </ChatStoreProvider>
  );
}

export default Layout;
