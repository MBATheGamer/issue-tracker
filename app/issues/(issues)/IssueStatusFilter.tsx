"use client";

import { Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={status => {
        const query = new URLSearchParams();

        const orderBy = searchParams.get("orderBy");
        if (orderBy) query.append("orderBy", orderBy);

        if (status && status !== "all") query.append("status", status);

        router.push(`/issues${query ? `?${query}` : ""}`);
      }}
      defaultValue={searchParams.get("status") || "all"}
    >
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
