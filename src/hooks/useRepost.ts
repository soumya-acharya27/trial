import { useMutation } from "@apollo/client";
import { AddPostInput, AddPostResponse } from "../interface/postinterface";
import { ADD_POST } from "../graphql/post/postMutation";
import { useSelector } from "react-redux";
import { RootState } from "../redux-saga/rootReducer";

export const useRepost = () => {
    const [addPostMutation, { data, loading, error }] = useMutation<AddPostResponse, { input: AddPostInput }>(ADD_POST);
    const token = useSelector((state: RootState) => state.authReducer.accessToken);

    const repost = async (clubId: string, repostedPostId: string) => {
        try {
            const response = await addPostMutation({
                variables: {
                    input: {
                        description: "", // Empty description for reposts
                        clubId,
                        repostedPostId,
                    }
                },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            });
            return response.data?.addPost;
        } catch (err) {
            console.error('Error reposting:', err);
            throw err;
        }
    };

    return { repost, data, loading, error };
}; 