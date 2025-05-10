import { useSelector } from "react-redux";
import { RootState } from "../redux-saga/rootReducer";
import { useMutation } from "@apollo/client";
import { RemoveFollowerInput, RemoveFollowerResponse } from "../interface/postinterface";
import { REMOVE_FOLLOWER_MUTATION } from "../graphql/user/userMutation";

export const useUnFollowUser = () => {
    const token = useSelector((state: RootState) => state.authReducer.accessToken);
    const [removeFollowerMutation, { data, loading, error }] = useMutation<
      RemoveFollowerResponse,
      RemoveFollowerInput
    >(REMOVE_FOLLOWER_MUTATION);
  
    const removeFollower = async (followeeId: string, userId: string) => {
      try {
        const response = await removeFollowerMutation({
          variables: { followeeId, userId },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
        return response.data?.removeFollower;
      } catch (err) {
        console.error("Error removing follower:", err);
        throw err;
      }
    };
  
    return { removeFollower, data, loading, error };
  };