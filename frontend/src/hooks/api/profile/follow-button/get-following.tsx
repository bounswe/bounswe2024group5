import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import HostContext from "../../../../HostContext";

export type ProfileResponse = {
    username: string
}

export const useFetchFollowing = () => {
    const TOKEN = sessionStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    const username = sessionStorage.getItem('username');

    return useQuery({
        queryKey: ['following'],
        queryFn: async () => {
            if (!username) return;

            const response = await fetch(`${hostUrl}/api/profile/${username}/following`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch following.');
            }

            const body = await response.json();
            return body as ProfileResponse[];
        }
    });
}