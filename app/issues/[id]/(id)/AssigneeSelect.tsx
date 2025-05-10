"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  issue: Issue;
};

const AssigneeSelect = ({ issue }: Props) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get<User[]>("/api/users").then(response => response.data),
    staleTime: 60 * 1_000, // 60s
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <>
      <Select.Root
        onValueChange={async userId => {
          axios
            .patch(`/api/issues/${issue.id}`, {
              userId: userId !== "unassigned" ? userId : null,
            })
            .catch(() => toast.error("Changes could not be saved."));
        }}
        defaultValue={issue.userId || "unassigned"}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
