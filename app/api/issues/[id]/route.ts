import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

type Props = {
  params: Promise<Params>;
};

export const PATCH = async (request: NextRequest, { params }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const { id } = await params;

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, userId } = validation.data;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      userId,
    },
  });

  return NextResponse.json(updatedIssue);
};

export const DELETE = async (_request: NextRequest, { params }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({});
};
