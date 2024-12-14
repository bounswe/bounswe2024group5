import { useState } from "react";
import { useLeaderboard } from "../hooks/api/leaderboard/get";
import { motion } from "framer-motion";
import { LeaderboardUser } from "../hooks/api/leaderboard/get";
import { Tabs, Skeleton } from "antd";
import { IconTrophy, IconBrain, IconPencil } from "@tabler/icons-react";
import { Link } from "react-router-dom";

// Separate LeaderboardCard into its own component for better organization
const LeaderboardCard = ({
  title,
  data,
  icon,
  valueKey,
}: {
  title: string;
  data: LeaderboardUser[];
  icon: React.ReactNode;
  valueKey: "solved" | "created" | "points";
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="h-full p-6 bg-white rounded-3xl"
  >
    <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-purple-800">
      {icon}
      {title}
    </h3>
    <div className="space-y-3">
      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        data.map((user, index) => (
          <motion.div
            key={user.username}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 transition-colors bg-purple-50 rounded-xl hover:bg-purple-100"
          >
            <div className="flex items-center gap-3">
              <span
                className={`
                  ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-gray-400"
                      : index === 2
                      ? "bg-amber-600"
                      : "bg-emerald-400"
                  } 
                  w-7 h-7 flex items-center justify-center rounded-full text-white font-bold text-sm
                `}
              >
                {index + 1}
              </span>
              <Link
                to={`/profile/${user.username}`}
                className="text-base font-medium text-purple-800 hover:text-purple-600"
              >
                @{user.username}
              </Link>
            </div>
            <span className="text-base font-semibold text-purple-600">
              {user[valueKey]} {valueKey === "points" ? "pts" : ""}
            </span>
          </motion.div>
        ))
      )}
    </div>
  </motion.div>
);

const LoadingSkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-6 bg-white rounded-3xl">
        <Skeleton.Input style={{ width: 200 }} active size="large" />
        <div className="mt-4 space-y-3">
          {[1, 2, 3, 4, 5].map((j) => (
            <Skeleton key={j} active paragraph={{ rows: 1 }} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default function LeaderboardPage() {
  const { data: leaderboard, isLoading, error } = useLeaderboard();
  const [timeframe, setTimeFrame] = useState<"weekly" | "monthly">("weekly");

  if (isLoading || !leaderboard) {
    return (
      <main className="min-h-screen px-4 py-8 bg-purple-50">
        <div className="container mx-auto">
          <div className="mb-8">
            <Skeleton.Input style={{ width: 300 }} active size="large" />
            <Skeleton className="mt-2" paragraph={{ rows: 1 }} active />
          </div>
          <LoadingSkeleton />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-purple-50">
        <div className="text-xl font-semibold text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load leaderboard"}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentData = leaderboard[timeframe];

  const LeaderboardContent = (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <LeaderboardCard
        title="Most Points"
        data={currentData.pointsEarned}
        icon={<IconTrophy size={24} className="text-purple-600" />}
        valueKey="points"
      />
      <LeaderboardCard
        title="Most Quizzes Solved"
        data={currentData.quizSolved}
        icon={<IconBrain size={24} className="text-purple-600" />}
        valueKey="solved"
      />
      <LeaderboardCard
        title="Most Quizzes Created"
        data={currentData.quizCreated}
        icon={<IconPencil size={24} className="text-purple-600" />}
        valueKey="created"
      />
    </div>
  );

  return (
    <main className="min-h-screen px-12 py-8 bg-purple-50 rounded-xl">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-purple-800">Leaderboard</h1>
          <p className="mt-2 text-gray-600">
            See who's leading the way in our community!
          </p>
        </motion.div>

        <Tabs
          activeKey={timeframe}
          onChange={(key) => setTimeFrame(key as "weekly" | "monthly")}
          items={[
            {
              key: "weekly",
              label: "This Week",
              children: LeaderboardContent,
            },
            {
              key: "monthly",
              label: "This Month",
              children: LeaderboardContent,
            },
          ]}
        />
      </div>
    </main>
  );
}
