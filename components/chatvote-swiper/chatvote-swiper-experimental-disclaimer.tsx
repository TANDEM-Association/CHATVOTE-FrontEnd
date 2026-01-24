"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type ChatvoteSwiperExperimentalDisclaimerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ChatvoteSwiperExperimentalDisclaimer: React.FC<
  ChatvoteSwiperExperimentalDisclaimerProps
> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-lg p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">⚠️ Avertissement</h2>
        <p className="text-muted-foreground text-sm">
          Fonctionnalité expérimentale
        </p>
      </div>
      <p className="text-sm">
        Vous avez souhaité une sorte de comparateur politique – voici une
        première tentative de mettre en œuvre vos retours.
        <span className="border-border bg-muted my-2 block rounded-md border p-4 font-semibold">
          Nous tenons à souligner expressément qu&lsquo;il ne s&lsquo;agit que
          d&lsquo;une première ébauche et non d&lsquo;une recommandation de vote
          officielle.
        </span>
        Vos retours nous aident à développer une version finale pour les
        prochaines élections qui résout les problèmes existants.
        <span className="mt-2 block font-semibold">
          Merci pour votre compréhension 🙏 - nous attendons vos retours avec
          impatience ! 🤗
        </span>
      </p>

      <div className="mt-4">
        <Button className="w-full" onClick={onClose}>
          C&apos;est parti !
        </Button>
      </div>
    </Modal>
  );
};

export default ChatvoteSwiperExperimentalDisclaimer;
