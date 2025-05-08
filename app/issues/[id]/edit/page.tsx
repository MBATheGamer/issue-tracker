import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import DynamicIssueForm from "../../_components/DynamicIssueForm";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export default async ({ params }: Props) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();

  return <DynamicIssueForm issue={issue} />;
};
