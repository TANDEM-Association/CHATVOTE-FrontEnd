import { useMemo } from "react";

import Link from "next/link";

import { type ExampleQuestionShareableChatSession } from "@/lib/firebase/firebase.types";
import { InternalReferrers } from "@/lib/internal-referrers";

import TopicTag from "./topic-tag";
import { type Topic } from "./topics.data";

export type Question = {
  id: string;
  question: string;
  title: string;
  topic: Topic;
};

type Props = {
  exampleQuestionShareableChatSession: ExampleQuestionShareableChatSession;
};

function TopicQuestionCard({ exampleQuestionShareableChatSession }: Props) {
  const { question, topic } = exampleQuestionShareableChatSession;

  const link = useMemo(() => {
    const searchParams = new URLSearchParams();

    searchParams.append("snapshot_id", exampleQuestionShareableChatSession.id);
    searchParams.append("ref", InternalReferrers.TOPICS);

    return `/share?${searchParams.toString()}`;
  }, [exampleQuestionShareableChatSession.id]);

  return (
    <Link
      href={link}
      className="group border-border ring-offset-background hover:bg-muted focus-visible:ring-ring flex cursor-pointer flex-col gap-2 rounded-md border p-4 text-start transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <TopicTag topic={topic} />
      <h2 className="font-bold group-hover:underline">{question}</h2>
    </Link>
  );
}

export default TopicQuestionCard;
