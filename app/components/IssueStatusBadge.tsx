import { Badge } from "@radix-ui/themes";
import { Status } from "../generated/prisma";

type Props = {
  status: Status;
};

const statusMap: Record<
  Status,
  { label: string; color: "green" | "red" | "violet" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "red" },
};

const IssueStatusBadge = ({ status }: Props) => (
  <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
);
export default IssueStatusBadge;
