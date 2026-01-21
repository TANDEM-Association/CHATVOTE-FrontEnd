import ChatGroupPartySelectContent from "./chat-group-party-select-content";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "./responsive-drawer-dialog";

type Props = {
  children: React.ReactNode;
  onNewChat?: (partyIds: string[]) => void;
  selectedPartyIdsInStore?: string[];
  addPartiesToChat?: boolean;
};

function ChatGroupPartySelect({
  children,
  onNewChat,
  selectedPartyIdsInStore,
  addPartiesToChat,
}: Props) {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader className="text-left">
          <ResponsiveDialogTitle>Sélection des partis</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {addPartiesToChat
              ? "Modifiez les partis sélectionnés."
              : "Sélectionnez jusqu&lsquo;à sept partis avec lesquels vous souhaitez démarrer le chat."}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ChatGroupPartySelectContent
          selectedPartyIdsInStore={selectedPartyIdsInStore}
          onNewChat={onNewChat}
          addPartiesToChat={addPartiesToChat}
        />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default ChatGroupPartySelect;
