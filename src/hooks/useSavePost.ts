import { useMutation } from "@apollo/client";
import { SavePostInput, SavePostResponse } from "../interface/postinterface";
import { SAVE_POST_MUTATION } from "../graphql/post/postMutation";
import { useSelector } from "react-redux";
import { RootState } from "../redux-saga/rootReducer";

// Hook to use the mutation
export const useSavePost = () => {
    const [savePostMutation, { data, loading, error }] = useMutation<SavePostResponse, SavePostInput>(SAVE_POST_MUTATION);
    const token = useSelector((state: RootState) => state.authReducer.accessToken);

    const savePost = async (save: boolean, postId: string) => {
        try {
            const response = await savePostMutation({
                variables: {
                    save,
                    postId,
                },
                context: {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            });
            return response.data?.savePost?.savedPost?.id;
        } catch (err) {
            console.error('Error saving post:', err);
            throw err;
        }
    };

    return { savePost, data, loading, error };
};
