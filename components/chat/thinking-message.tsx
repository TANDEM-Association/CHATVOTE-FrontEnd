import { cx } from "class-variance-authority";

import AnimatedMessageSequence from "./animated-message-sequence";
import { ChatMessageIcon } from "./chat-message-icon";

function ThinkingMessage() {
  const messages = [
    "Recherche des sources pertinentes...",
    "Analyse des sources...",
    "Traitement des données...",
    "Génération des résultats...",
    "Finalisation...",
  ];

  return (
    <div className={cx("flex items-center gap-3 md:gap-4")}>
      <ChatMessageIcon />

      <AnimatedMessageSequence
        className="text-muted-foreground"
        messages={messages}
      />
    </div>
  );
}

export default ThinkingMessage;
