import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;

  const issue = await fetchIssue(parseInt(id));

  return {
    title: `Issue Tracker - ${issue?.title}`,
    description: `Details of issue ${issue?.id}`,
  } satisfies Metadata;
};

export default async ({ params }: Props) => {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid
      columns={{
        initial: "1",
        sm: "5",
      }}
      gap="5"
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};
