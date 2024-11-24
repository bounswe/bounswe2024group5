import { IconClock } from "@tabler/icons-react";
export const InProgressBadge = () => {
  return (
    <span className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
      In Progress
      <IconClock className="w-5 h-5" />
    </span>
  );
};
