import { IssueStatusBadge, Link } from "@/app/components";
import { Status } from "@/app/generated/prisma";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";

export const dynamic = "force-dynamic";
// export const revalidate = 60;

type SearchParams = {
  status: Status;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async ({ searchParams }: Props) => {
  const { status } = await searchParams;

  const statuses = Object.values(Status);

  const issues = await prisma.issue.findMany({
    where: {
      status: statuses.includes(status) ? status : undefined,
    },
  });

  return (
    <>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(({ id, title, status, createdAt }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
