// useUploadFile.ts
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../HostContext";

export const useUploadFile = () => {
	const hostUrl = useContext(HostContext);

	return useMutation({
		mutationFn: async (file: File) => {
			const TOKEN = sessionStorage.getItem('token');
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch(`${hostUrl}/api/file/upload`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
				},
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Failed to upload file');
			}

			const data = await response.json();
			return data.url as string;
		},
	});
};