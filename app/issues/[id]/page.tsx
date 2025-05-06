import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

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

  return (
    <>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </>
  );
};
