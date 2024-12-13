import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import HostContext from '../../HostContext';

export type HintResponse = string[];

export const useHint = (word: string) => {
	const TOKEN = sessionStorage.getItem('token');
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['hint', word],
		queryFn: async () => {
			if (!TOKEN) {
				throw new Error('No authentication token found');
			}

			const response = await fetch(`${hostUrl}/api/hint?word=${encodeURIComponent(word)}`, {
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				if (response.status === 400) {
					throw new Error('Invalid word parameter');
				}
				if (response.status === 401) {
					throw new Error('Unauthorized access');
				}
				if (response.status === 500) {
					throw new Error('Server error while fetching hints');
				}
				throw new Error('Failed to fetch word hints');
			}

			const data = await response.json() as HintResponse;

			return data;
		},
	});
};