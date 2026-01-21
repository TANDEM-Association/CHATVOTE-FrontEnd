import NumberFlow from "@number-flow/react";
import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type Props = {
  voteResults: {
    yes: number;
    no: number;
    abstain: number;
    not_voted: number;
  };

  memberCount: number;
};

const chartConfig = {
  not_voted: {
    label: "Non voté",
    color: "hsl(var(--chart-1))",
  },
  abstain: {
    label: "Abstention",
    color: "hsl(var(--chart-2))",
  },
  no: {
    label: "Non",
    color: "hsl(var(--chart-3))",
  },
  yes: {
    label: "Oui",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

function VoteChart({ voteResults, memberCount }: Props) {
  const chartData = [
    {
      voteType: "yes",
      result: voteResults.yes,
      fill: "hsl(var(--chart-yes))",
    },
    {
      voteType: "no",
      result: voteResults.no,
      fill: "hsl(var(--chart-no))",
    },
    {
      voteType: "abstain",
      result: voteResults.abstain,
      fill: "hsl(var(--chart-abstain))",
    },
    {
      voteType: "not_voted",
      result: voteResults.not_voted,
      fill: "hsl(var(--chart-not-voted))",
    },
  ];

  return (
    <div className="relative h-[150px] w-[150px]">
      <ChartContainer config={chartConfig} className="relative z-20 size-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="result"
            nameKey="voteType"
            innerRadius={50}
            outerRadius={75}
            strokeWidth={5}
          />
        </PieChart>
      </ChartContainer>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
        <NumberFlow className="text-lg font-bold" value={memberCount} />
        <p className="text-muted-foreground text-xs">Membres</p>
      </div>
    </div>
  );
}

export default VoteChart;
