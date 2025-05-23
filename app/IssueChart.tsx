"use client";

import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueChart = ({ closed, inProgress, open }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In-Progress", value: inProgress },
    { label: "Open", value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />{" "}
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
