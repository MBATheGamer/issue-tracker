import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@/app/generated/prisma";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";

type Column = {
  label: string;
  value: keyof Issue;
  className?: string;
};

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
};

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value, className }) => (
            <Table.ColumnHeaderCell key={value} className={className}>
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: value,
                  },
                }}
              >
                {label}
              </NextLink>
              {value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
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
  );
};

const columns: Column[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map(({ value }) => value);

export default IssueTable;
