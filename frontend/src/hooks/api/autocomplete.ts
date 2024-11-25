import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../HostContext";

export const useWordAutocomplete = (prefix: string, language: 'english' | 'turkish') => {
	const TOKEN = sessionStorage.getItem('token');
	const hostUrl = useContext(HostContext);

	return useQuery({
		queryKey: ['autocomplete', prefix, language],
		queryFn: async () => {
			if (!prefix) return [];

			const queryParams = new URLSearchParams({
				prefix,
				language
			});

			const response = await fetch(`${hostUrl}/api/autocomplete?${queryParams.toString()}`, {
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to fetch autocomplete suggestions');
			}

			return response.json() as Promise<string[]>;
		},
		enabled: Boolean(prefix), // Only run query if there's a prefix
	});
};