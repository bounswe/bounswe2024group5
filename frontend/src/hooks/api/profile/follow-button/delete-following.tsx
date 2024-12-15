import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import HostContext from "../../../../HostContext";
import { ProfileResponse } from "./get-following";

export const useDeleteFollowing = () => {
  const queryClient = useQueryClient();
  const hostUrl = useContext(HostContext);

  return useMutation({
    mutationFn: async (username: string | undefined) => {
      if (!username) {
        return "";
      }

      const TOKEN = localStorage.getItem("token");
      const response = await fetch(
        `${hostUrl}/api/profile/follow/${username}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete following.");
      }

      return username;
    },
    onSuccess: (username: string) => {
      if (!username) return;
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.setQueryData<ProfileResponse[]>(["following"], (old) =>
        old?.filter((profile) => profile.username !== username)
      );
    },
  });
};
