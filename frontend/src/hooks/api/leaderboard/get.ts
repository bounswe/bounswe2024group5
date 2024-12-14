// import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
// import HostContext from "../../../HostContext";

const generateMockData = (): LeaderboardData => {
	const usernames = [
		"utku",
		"alice",
		"bob",
		"charlie",
		"david",
		"emma",
		"frank",
		"grace",
		"henry",
		"ivy",
	];

	const generateUsers = (
		valueGenerator: () => number,
		valueKey: "solved" | "created" | "points"
	): LeaderboardUser[] => {
		return usernames
			.map((username) => ({
				username,
				[valueKey]: valueGenerator(),
			}))
			.sort((a, b) => (Number(b[valueKey]) || 0) - (Number(a[valueKey]) || 0));
	};

	return {
		weekly: {
			quizSolved: generateUsers(
				() => Math.floor(Math.random() * 20 + 5),
				"solved"
			),
			quizCreated: generateUsers(
				() => Math.floor(Math.random() * 5 + 1),
				"created"
			),
			pointsEarned: generateUsers(
				() => Math.floor(Math.random() * 100 + 50),
				"points"
			),
		},
		monthly: {
			quizSolved: generateUsers(
				() => Math.floor(Math.random() * 50 + 20),
				"solved"
			),
			quizCreated: generateUsers(
				() => Math.floor(Math.random() * 15 + 5),
				"created"
			),
			pointsEarned: generateUsers(
				() => Math.floor(Math.random() * 300 + 100),
				"points"
			),
		},
	};
};

export type LeaderboardUser = {
	username: string;
	solved?: number;
	created?: number;
	points?: number;
}

export type LeaderboardData = {
	weekly: {
		quizSolved: LeaderboardUser[];
		quizCreated: LeaderboardUser[];
		pointsEarned: LeaderboardUser[];
	};
	monthly: {
		quizSolved: LeaderboardUser[];
		quizCreated: LeaderboardUser[];
		pointsEarned: LeaderboardUser[];
	};
}
export const useLeaderboard = () => {
	// const TOKEN = sessionStorage.getItem('token');
	// const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['leaderboard'],
		queryFn: async () => {
			// if (!TOKEN) {
			// 	throw new Error('No authentication token found');
			// }

			// const response = await fetch(`${hostUrl}/api/leaderboard`, {
			// 	headers: {
			// 		'Authorization': `Bearer ${TOKEN}`,
			// 		'Content-Type': 'application/json'
			// 	}
			// });

			// if (!response.ok) {
			// 	throw new Error('Failed to fetch leaderboard data');
			// }

			// const data = await response.json();

			// return data as LeaderboardData;

			await new Promise(resolve => setTimeout(resolve, 1000));
			return generateMockData();
		}
	});
};