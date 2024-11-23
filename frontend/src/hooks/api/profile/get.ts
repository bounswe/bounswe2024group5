import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import HostContext from '../../../HostContext';
import { ProfileResponse } from '../../../types/profile';

export const useGetProfile = (username?: string) => {
	const hostUrl = useContext(HostContext);
	const isMyProfile = !username;

	return useQuery({
		queryKey: ['profile', username ?? 'me'],
		queryFn: async () => {
			const endpoint = isMyProfile
				? `${hostUrl}/api/profile/me`
				: `${hostUrl}/api/profile/${username}`;

			const headers: HeadersInit = {};

			if (isMyProfile) {
				const TOKEN = sessionStorage.getItem('token');
				if (!TOKEN) {
					throw new Error('No authentication token found');
				}
				headers['Authorization'] = `Bearer ${TOKEN}`;
			}

			const response = await fetch(endpoint, { headers });

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Unauthorized access');
				}
				if (response.status === 404) {
					throw new Error('User not found');
				}
				throw new Error('Failed to fetch profile');
			}

			const data = await response.json();
			return data as ProfileResponse;
		},
		retry: (failureCount, error) => {
			// Don't retry on 401 or 404 errors
			if (error instanceof Error &&
				(error.message === 'Unauthorized access' ||
					error.message === 'User not found')) {
				return false;
			}
			return failureCount < 3;
		},
	});
};