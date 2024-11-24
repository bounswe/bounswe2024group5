import { IconCircleDashedCheck } from "@tabler/icons-react";

export const CompletedBadge = () => {
  return (
    <span className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
      Completed
      <IconCircleDashedCheck className="w-5 h-5" />
    </span>
  );
};
