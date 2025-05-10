import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import BackIcon from '../../../../../assets/svg/Back.svg';
import LikeIcon from '../../../../../assets/svg/heartFilled.svg'; 
import UnLikeIcon from '../../../../../assets/svg/heartUnfilled.svg'; 
import ReplyIcon from '../../../../../assets/svg/message.svg';
import { styles } from './styles';
import { GET_POST_COMMENTS } from '../../../../../graphql/post/postQuery';
import { AddPostCommentResponse, AddPostCommentVariables, GetPostCommentsResponse } from '../../../../../interface/postinterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux-saga/rootReducer';
import { ADD_POST_COMMENT } from '../../../../../graphql/post/postMutation';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CommentCard from '../CommentCard';
import CommonHeader from '../../../../../components/CommonHeader';
import RenderPost from '../../../Dashboard/components/PostCard';
import { useLikePost } from '../../../../../hooks/useLikePost';
import PostListRenderer from '../../../../../component/PostListRenderer';
import { Post } from '../../../../../interface/clubinterface';

const PostCommentsScreen = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { post, setPosts } = route.params;
  const [statePost, setStatePost] = useState<Post[]>([post])
  const postId = post?.id
  const client = useApolloClient()
  const [comments, setComments] = useState<GetPostCommentsResponse["getPostComments"]["comments"]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const [commentText, setCommentText] = useState('')
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Sync post data when statePost changes
    if (statePost[0]?.id === postId) {
      setPosts((prevPosts: Post[]) => {
        return prevPosts.map((p: Post) => {
          if (p.id === postId) {
            // Only update the counts and other relevant data
            return {
              ...p,
              totalLikes: statePost[0].totalLikes,
              totalComments: statePost[0].totalComments,
              totalReposts: statePost[0].totalReposts,
              isLiked: statePost[0].isLiked,
              isSaved: statePost[0].isSaved
            };
          }
          return p;
        });
      });
    }
  }, [statePost, postId, setPosts]);

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          navigation.goBack()
          return true;
        },
      );
      return () => {
        backHandler.remove();
      };
    }, []);
  

  const [addPostComment, { loading: addCommentLoading, error, data }] = useMutation<
        AddPostCommentResponse,
        AddPostCommentVariables
    >(ADD_POST_COMMENT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
    });

  const [fetchComments, { loading }] = useLazyQuery<GetPostCommentsResponse>(GET_POST_COMMENTS, {
    context: {
        headers: {
            authorization: `Bearer ${token}`,
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'network-only'
    },
    onCompleted: (data) => {
      const { comments: newComments, hasMore } = data?.getPostComments || {};
      setComments((prev) => [...prev, ...newComments || []]);
      setHasMore(hasMore);
      setPage(prev => prev + 1)
    },
    onError: (error) => {
      console.error('Error fetching comments:', error);
      setHasMore(false)
    },
  });

  useFocusEffect(
    useCallback(() => {
      client.cache.evict({ id: 'ROOT_QUERY', fieldName: 'getPostComments' }); // Evict the cached query
      client.cache.gc(); // Garbage collect unused fields
      setComments([]);
      setPage(1)
      fetchComments({ variables: { input: { postId, limit: 20, page: page} } });

    },[postId])
  )

  const loadMoreComments = () => {
    if (!loading && hasMore) {
      fetchComments({ variables: { input: { postId, limit: 20, page: page + 1 } } });
    }
  };


  const handleSendComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await addPostComment({
        variables: {
          input: {
            postId,
            text: commentText,
            replayTo: replyTo, // Optional, only if replying to a comment
          }
        },
      });

      setCommentText('');
      setReplyTo(undefined); // Reset replyTo
      setComments(prev => {
        const newComment = response?.data?.addPostComment?.comment;
        return newComment ? [newComment, ...prev] : prev;
      });    
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CommonHeader title="Post" />

    <ScrollView>
      <PostListRenderer 
        previewFlow 
        posts={statePost} 
        setPosts={setStatePost}
        loadMorePosts={async () => {}}
        loading={false}
      />

      {/* Comments List */}
      <FlatList
        contentContainerStyle={{marginTop: heightPercentageToDP(1)}}
        data={comments}
        renderItem={({item}) => <CommentCard postId={postId} comment={item} setComments={setComments}/>}
        keyExtractor={(item) => item?.id}
        onEndReached={loadMoreComments}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator style={{alignSelf:'center', marginTop: heightPercentageToDP(20)}} size={"large"} color={"black"}/> : null}
      />

      {/* Reply Input */}
      {/* <View style={styles.replyInputContainer}>
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Post your reply"
          style={styles.replyInput}
        />
        <TouchableOpacity onPress={handleSendComment} disabled={addCommentLoading} style={styles.sendButton}>
          <Image source={require('../../../../../assets/png/avatar.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View> */}
      </ScrollView>
    </View>
  );
};


export default PostCommentsScreen;
