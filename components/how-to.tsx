import {
  MessageCircleQuestionIcon,
  MessageCircleReplyIcon,
  TextSearchIcon,
  VoteIcon,
  WaypointsIcon,
} from 'lucide-react';
import ChatActionButtonHighlight from './chat/chat-action-button-highlight';
import ProConIcon from './chat/pro-con-icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
import Link from 'next/link';
import { MAX_SELECTABLE_PARTIES } from './chat/chat-group-party-select-content';
import { useTranslations } from 'next-intl';

function HowTo() {
  const t = useTranslations('how-to');
  const partySpecificQuestions = t.raw('questions-party-specific');
  const compareQuestions = t.raw('questions-compare');
  const generalQuestions = t.raw('questions-general');

  const buildQuestionLink = (question: string) => {
    return `/session?q=${question}`;
  };

  return (
    <Accordion type="single" collapsible asChild>
      <article>
        <section>
          <p>
            {t.rich('intro', {
              underline: (chunks) => <span className="font-bold underline">{chunks}</span>,
              bold: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </p>

          <p className="mt-4 text-sm font-semibold">{t('process-title')}</p>

          <ul className="[&_li]:mt-4 [&_li]:text-sm">
            <li className="relative pl-10">
              <MessageCircleQuestionIcon className="absolute left-0 top-0" />
              {t('process-step-1')}
            </li>
            <li className="relative pl-10">
              <TextSearchIcon className="absolute left-0 top-0" />
              {t.rich('process-step-2', {
                underline: (chunks) => <span className="font-bold underline">{chunks}</span>,
              })}
            </li>
            <li className="relative pl-10">
              <MessageCircleReplyIcon className="absolute left-0 top-0" />
              {t('process-step-3')}
            </li>
            <li className="relative pl-10">
              <WaypointsIcon className="absolute left-0 top-0" />
              {t('process-step-4')}
            </li>
          </ul>
        </section>

        <section className="mt-6">
          <AccordionItem value="questions">
            <AccordionTrigger className="font-bold">
              {t('questions-trigger')}
            </AccordionTrigger>
            <AccordionContent>
              {t('questions-content-intro')}
              <br />
              <br />
              <span className="font-bold">
                {t('questions-party-specific-title')}
              </span>
              <ul className="list-outside list-disc py-2 pl-4 [&_li]:pt-1">
                {partySpecificQuestions.map((question: string) => (
                  <li key={question}>
                    <Link
                      className="underline"
                      href={buildQuestionLink(question)}
                    >
                      {question}
                    </Link>
                  </li>
                ))}
              </ul>
              <br />
              <span className="font-bold">
                {t('questions-compare-title')}
              </span>
              <ul className="list-outside list-disc py-2 pl-4 [&_li]:pt-1">
                {compareQuestions.map((question: string) => (
                  <li key={question}>
                    <Link
                      className="underline"
                      href={buildQuestionLink(question)}
                    >
                      {question}
                    </Link>
                  </li>
                ))}
              </ul>
              <br />
              <span className="font-bold">
                {t('questions-general-title')}
              </span>
              <ul className="list-outside list-disc py-2 pl-4 [&_li]:pt-1">
                {generalQuestions.map((question: string) => (
                  <li key={question}>
                    <Link
                      className="underline"
                      href={buildQuestionLink(question)}
                    >
                      {question}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="number-parties">
            <AccordionTrigger className="font-bold">
              {t('number-parties-trigger')}
            </AccordionTrigger>
            <AccordionContent>
              {t.rich('number-parties-content', {
                bold: (chunks) => <span className="font-bold">{chunks}</span>,
                max: MAX_SELECTABLE_PARTIES
              })}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="position">
            <AccordionTrigger className="font-bold">
              {t('position-trigger')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="my-2 flex items-center justify-center">
                <div className="relative rounded-md">
                  <Button
                    variant="outline"
                    className="h-8 px-2 group-data-[has-message-background]:bg-zinc-100 group-data-[has-message-background]:hover:bg-zinc-200 group-data-[has-message-background]:dark:bg-zinc-900 group-data-[has-message-background]:dark:hover:bg-zinc-800"
                    tooltip={t('position-tooltip')}
                    type="button"
                  >
                    <ProConIcon />
                    <span className="text-xs">{t('position-button')}</span>
                  </Button>
                  <ChatActionButtonHighlight showHighlight />
                </div>
              </div>
              <p>
                {t('position-content')}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="voting-behavior-analyze">
            <AccordionTrigger className="font-bold">
              {t('voting-behavior-trigger')}
            </AccordionTrigger>
            <AccordionContent>
              <div className="my-2 flex items-center justify-center">
                <div className="relative rounded-md">
                  <Button
                    variant="outline"
                    className="h-8 px-2 group-data-[has-message-background]:bg-zinc-100 group-data-[has-message-background]:hover:bg-zinc-200 group-data-[has-message-background]:dark:bg-zinc-900 group-data-[has-message-background]:dark:hover:bg-zinc-800"
                    tooltip={t('voting-behavior-tooltip')}
                  >
                    <VoteIcon />
                    <span className="text-xs">{t('voting-behavior-button')}</span>
                  </Button>

                  <ChatActionButtonHighlight showHighlight />
                </div>
              </div>
              <p>
                {t.rich('voting-behavior-content', {
                  italic: (chunks) => <span className="italic">{chunks}</span>
                })}
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data">
            <AccordionTrigger className="font-bold">
              {t('data-trigger')}
            </AccordionTrigger>
            <AccordionContent>
              {t.rich('data-content-intro', {
                underline: (chunks) => <span className="font-bold underline">{chunks}</span>
              })}
              <ol className="list-outside list-decimal py-4 pl-4 [&_li]:pt-1">
                {t.raw('data-sources').map((source: { title: string; description: string }) => (
                  <li key={source.title}>
                    <div className="pl-2">
                      <span className="font-bold">{source.title}</span>{' '}
                      {source.description}
                    </div>
                  </li>
                ))}
              </ol>
              <br />
              {t.rich('data-sources-link', {
                underline: (chunks) => <span className="font-bold underline">{chunks}</span>,
                link: (chunks) => <Link href="/sources" className="underline">{chunks}</Link>
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="guidelines">
            <AccordionTrigger className="font-bold">
              {t('guidelines-trigger')}
            </AccordionTrigger>
            <AccordionContent>
              {t('guidelines-content-intro')}
              <ol className="list-outside list-decimal py-4 pl-4 [&_li]:pt-1">
                {t.raw('guidelines-list').map((item: { title: string; description: string }) => (
                  <li key={item.title}>
                    <div className="pl-2">
                      <span className="font-bold">{item.title}</span>{' '}
                      {item.description}
                    </div>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="party-selection">
            <AccordionTrigger className="font-bold">
              {t('party-selection-trigger')}
            </AccordionTrigger>
            <AccordionContent>
              {t.rich('party-selection-content', {
                email: (chunks) => <a href="mailto:info@wahl.chat" className="underline">{chunks}</a>
              })}
            </AccordionContent>
          </AccordionItem>
        </section>
      </article>
    </Accordion>
  );
}

export default HowTo;
