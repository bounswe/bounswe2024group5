import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../../HostContext";
import { ProfileResponse } from "./get-following";

export const usePostFollowing = () => {
  const queryClient = useQueryClient();
  const hostUrl = useContext(HostContext);

  return useMutation({
    mutationFn: async (username: string | undefined) => {
      if (!username) return;
      const TOKEN = localStorage.getItem("token");
      const response = await fetch(
        `${hostUrl}/api/profile/follow/${username}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to follow user.");
      }

      return { username: username } as ProfileResponse;
    },
    onSuccess: (newFollowing) => {
      if (!newFollowing) return;
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.setQueryData<ProfileResponse[]>(["following"], (old) => [
        ...(old || []),
        newFollowing,
      ]);
    },
  });
};
