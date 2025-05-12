import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Status } from "./generated/prisma";

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

type Statuses = {
  label: string;
  value: number;
  status: Status;
}[];

const IssueSummary = ({ closed, inProgress, open }: Props) => {
  const statuses: Statuses = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="4">
      {statuses.map(({ label, status, value }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${status}`}
            >
              {label}
            </Link>
            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
