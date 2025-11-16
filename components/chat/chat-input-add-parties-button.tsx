import { PlusIcon } from 'lucide-react';
import ChatGroupPartySelect from './chat-group-party-select';
import { useChatStore } from '../providers/chat-store-provider';

type Props = {
  disabled: boolean;
};

function ChatInputAddPartiesButton({ disabled }: Props) {
  const partyIds = useChatStore((state) => state.partyIds);
  const setPartyIds = useChatStore((state) => state.setPartyIds);

  return (
    <div className="absolute left-2 top-2 z-40">
      <ChatGroupPartySelect
        selectedPartyIdsInStore={Array.from(partyIds)}
        onNewChat={(partyIds) => setPartyIds(partyIds)}
        addPartiesToChat
      >
        <button
          className="shrink-0 rounded-full bg-primary text-primary-foreground p-1 transition-all enabled:hover:scale-95 disabled:cursor-not-allowed flex items-center gap-1 duration-200 ease-out z-40"
          disabled={disabled}
          type="button"
        >
          <PlusIcon className="size-4" />
        </button>
      </ChatGroupPartySelect>
    </div>
  );
}

export default ChatInputAddPartiesButton;
