'use client';

import { cx } from 'class-variance-authority';

import AnimatedMessageSequence from './animated-message-sequence';
import { ChatMessageIcon } from './chat-message-icon';
import { useTranslations } from 'next-intl';

function ThinkingMessage() {
  const t = useTranslations('chat');
  const messages = t.raw('thinking-messages');

  return (
    <div className={cx('flex gap-3 md:gap-4 items-center')}>
      <ChatMessageIcon />

      <AnimatedMessageSequence
        className="text-muted-foreground"
        messages={messages}
      />
    </div>
  );
}

export default ThinkingMessage;
