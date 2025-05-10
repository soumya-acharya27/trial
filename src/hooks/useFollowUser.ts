import { useSelector } from "react-redux";
import { RootState } from "../redux-saga/rootReducer";
import { useMutation } from "@apollo/client";
import { FollowUserInput, FollowUserResponse } from "../interface/postinterface";
import { FOLLOW_USER_MUTATION } from "../graphql/user/userMutation";

// Hook to use the mutation
export const useFollowUser = () => {
    const token = useSelector((state: RootState) => state.authReducer.accessToken);
    const [followUserMutation, { data, loading, error }] = useMutation<FollowUserResponse, FollowUserInput>(FOLLOW_USER_MUTATION);

    const followUser = async (followeeId: string, isFollow: boolean) => {
        try {
            const response = await followUserMutation({
                variables: { followeeId, isFollow },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            });
            return response.data?.followUser;
        } catch (err) {
            console.error("Error following user:", err);
            throw err;
        }
    };

    return { followUser, data, loading, error };
};
