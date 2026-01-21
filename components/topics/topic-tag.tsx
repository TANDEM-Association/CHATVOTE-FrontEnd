import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { type Topic, TOPIC_TITLES } from "./topics.data";

type Props = {
  topic: Topic;
  active?: boolean;
  onClick?: () => void;
};

function TopicTag({ topic, active = false, onClick }: Props) {
  const { title, normal, hover, active: activeStyle } = TOPIC_TITLES[topic];

  if (onClick) {
    return (
      <Button
        size="sm"
        variant="outline"
        className={cn(
          "h-7 w-fit rounded-md border px-2 py-0 text-xs whitespace-nowrap",
          normal,
          hover,
          active && activeStyle,
        )}
        onClick={onClick}
      >
        {title}
      </Button>
    );
  }

  return (
    <span
      className={cn(
        "flex h-7 w-fit items-center justify-center rounded-md border px-2 py-0 text-xs whitespace-nowrap",
        normal,
        active && activeStyle,
      )}
    >
      {title}
    </span>
  );
}

export default TopicTag;
