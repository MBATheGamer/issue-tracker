import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users);
};
