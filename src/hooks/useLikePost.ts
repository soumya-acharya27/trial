import { useMutation } from "@apollo/client";
import { LikePostInput, LikePostResponse } from "../interface/postinterface";
import { LIKE_POST_MUTATION } from "../graphql/post/postMutation";
import { useSelector } from "react-redux";
import { RootState } from "../redux-saga/rootReducer";

// Hook to use the mutation
export const useLikePost = () => {
    const [likePostMutation, { data, loading, error }] = useMutation<LikePostResponse, LikePostInput>(LIKE_POST_MUTATION);
    const token = useSelector((state: RootState) => state.authReducer.accessToken)

    const likePost = async (isLiked: boolean, postId: string) => {
        try {
            const response = await likePostMutation({
                variables: {
                    isLiked,
                    postId,
                },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            });
            return response.data?.likePost.isLiked;
        } catch (err) {
            console.error('Error liking post:', err);
            throw err;
        }
    };

    return { likePost, data, loading, error };
};