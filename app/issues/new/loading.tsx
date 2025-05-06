import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

export default () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};
