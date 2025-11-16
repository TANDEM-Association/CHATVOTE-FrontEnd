import ChatView from '@/components/chat/chat-view';

type Props = {
  params: Promise<{
    chatSessionId: string;
  }>;
  searchParams: Promise<{
    ref_snapshot_id: string;
    q: string;
  }>;
};

async function Page({ params, searchParams }: Props) {
  const { chatSessionId } = await params;
  const { q } = await searchParams;

  return <ChatView sessionId={chatSessionId} initialQuestion={q} />;
}

export default Page;
