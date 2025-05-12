import Pagination from "@/app/components/Pagination";
import { Status } from "@/app/generated/prisma";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

export const dynamic = "force-dynamic";
// export const revalidate = 60;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

type Props = {
  searchParams: Promise<IssueQuery>;
};

export default async (props: Props) => {
  const searchParams = await props.searchParams;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? {
        [searchParams.orderBy]: "asc",
      }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />

      <IssueTable searchParams={searchParams} issues={issues} />

      <Pagination
        currentPage={page}
        itemCount={issuesCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};
