import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import HostContext from "../../../HostContext";



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
	const TOKEN = sessionStorage.getItem('token');
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['leaderboard'],
		queryFn: async () => {
			if (!TOKEN) {
				throw new Error('No authentication token found');
			}

			const response = await fetch(`${hostUrl}/api/leaderboard`, {
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to fetch leaderboard data');
			}

			const data = await response.json();

			return data as LeaderboardData;
		}
	});
};