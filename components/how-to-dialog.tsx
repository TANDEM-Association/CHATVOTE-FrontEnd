import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from './chat/responsive-drawer-dialog';
import HowTo from './how-to';

type Props = {
  children: React.ReactNode;
};

function HowToDialog({ children }: Props) {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>{children}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="flex flex-col max-h-[95dvh] overflow-hidden">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            Was kann ich mit <span className="underline">wahl.chat</span> alles
            machen?
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Tipps und Tricks, wie du wahl.chat am besten nutzen kannst.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="px-4 md:px-0 overflow-y-auto grow">
          <HowTo />
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export default HowToDialog;
