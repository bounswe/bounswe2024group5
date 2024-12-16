import {
  IconStar,
  IconTrophy,
  IconTarget,
  IconFlame,
  IconCrown,
  IconRocket,
} from "@tabler/icons-react";

const getLevelInfo = (difficulty: number) => {
  if (difficulty >= 0 && difficulty < 500) {
    return {
      icon: <IconStar size={16} />,
      label: "A1",
      colors: "text-emerald-600 border-emerald-600",
    };
  } else if (difficulty < 1000) {
    return {
      icon: <IconTrophy size={16} />,
      label: "A2",
      colors: "text-blue-600 border-blue-600",
    };
  } else if (difficulty < 1500) {
    return {
      icon: <IconTarget size={16} />,
      label: "B1",
      colors: "text-amber-600 border-amber-600",
    };
  } else if (difficulty < 2000) {
    return {
      icon: <IconFlame size={16} />,
      label: "B2",
      colors: "text-orange-600 border-orange-600",
    };
  } else if (difficulty < 2500) {
    return {
      icon: <IconCrown size={16} />,
      label: "C1",
      colors: "text-purple-600 border-purple-600",
    };
  } else {
    return {
      icon: <IconRocket size={16} />,
      label: "C2",
      colors: "text-red-600 border-red-600",
    };
  }
};

export const DifficultyBadge = ({ difficulty }: { difficulty: number }) => {
  const { icon, label, colors } = getLevelInfo(difficulty);

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold bg-white border rounded-full ${colors} hover:scale-110 transition-transform duration-200`}
    >
      {icon}
      <span className="text-xs">
        {label} ({difficulty})
      </span>
    </div>
  );
};
