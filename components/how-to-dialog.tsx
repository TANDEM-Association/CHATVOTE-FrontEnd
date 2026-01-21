import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "./chat/responsive-drawer-dialog";
import HowTo from "./how-to";

type Props = {
  children: React.ReactNode;
};

function HowToDialog({ children }: Props) {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="flex max-h-[95dvh] flex-col overflow-hidden">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            Que puis-je faire avec <span className="underline">chatvote</span> ?
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Trucs et astuces pour utiliser au mieux chatvote.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="grow overflow-y-auto px-4 md:px-0">
          <HowTo />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default HowToDialog;
