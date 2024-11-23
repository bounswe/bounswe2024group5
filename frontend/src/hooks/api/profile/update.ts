import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import HostContext from '../../../HostContext';
import { ProfileRequest, ProfileResponse } from '../../../types/profile';

export const useUpdateProfile = () => {
	const hostUrl = useContext(HostContext);
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (payload: ProfileRequest) => {
			const TOKEN = sessionStorage.getItem('token');
			if (!TOKEN) {
				throw new Error('No authentication token found');
			}

			const response = await fetch(`${hostUrl}/api/profile/me`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error('Unauthorized access');
				}
				if (response.status === 400) {
					throw new Error('Invalid profile data');
				}
				throw new Error('Failed to update profile');
			}

			const data = await response.json();
			return data as ProfileResponse;
		},
		onSuccess: () => {
			// Invalidate both the specific profile query and the 'me' query
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
};