"use client";

import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";

type Statuses = {
  label: string;
  value: Status;
}[];

const statuses: Statuses = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Item value="all">All</Select.Item>
        {statuses.map(status => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
