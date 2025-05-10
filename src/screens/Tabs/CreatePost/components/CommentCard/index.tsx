import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import { getDummyProfile, timeAgo } from '../../../../../utils';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HeartFilled from '../../../../../assets/svg/heartFilled.svg';
import HeartUnFilled from '../../../../../assets/svg/heartUnfilled.svg';
import Reply from '../../../../../assets/svg/reply.svg';
import { AddPollCommentVoteResponse, AddPollCommentVoteVariables, Comment, GetPostCommentRepliesResponse, GetPostCommentRepliesVariables, LikePostCommentResponse, LikePostCommentVariables, Question } from '../../../../../interface/postinterface';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { ADD_POLL_COMMENT_VOTE, LIKE_POST_COMMENT } from '../../../../../graphql/post/postMutation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux-saga/rootReducer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GET_POST_COMMENT_REPLIES } from '../../../../../graphql/post/postQuery';
import { client } from '../../../../../../App';

interface CommentCardProps {
  postId: string;
  comment: Comment; // Replace with your comment type
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  parentCommentId?: string;
  isReply?: boolean;
  hideReply?: boolean;
  isShowMore?: boolean;
  loadInnerComment?: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ 
  postId,
  comment, 
  setComments,
  isReply = false ,
  parentCommentId,
  isShowMore,
  loadInnerComment,
  hideReply=false
}) => {
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const [likePostComment, { loading }] = useMutation<
    LikePostCommentResponse,
    LikePostCommentVariables
  >(LIKE_POST_COMMENT, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  });
  const [selectedOption, setSelectedOption] = useState(comment?.voteOptionId);
  const [isLiked, setIsLiked] = useState(comment?.isLiked);
  const [showReplies, setShowReplies] = useState(false);
  const [childComments, setChildComments] = useState<Comment[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const credentials = useSelector((state: RootState) => state.authReducer)

  const takeToProfile = (userId: string) => {
      const isMyProfile = credentials?.userInfo?.id === userId

      if (!isMyProfile)
          return navigation.navigate('profile', { userId: userId, isBack: true,}, )

      return navigation.navigate('profiles', { screen: 'profile', isBack: true })
  }

  const [addPollCommentVote, { loading: addPollLoading }] = useMutation<
    AddPollCommentVoteResponse,
    AddPollCommentVoteVariables
  >(ADD_POLL_COMMENT_VOTE, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  });

  const [fetchInnerComments, { loading:innerCommentLoading }] = useLazyQuery<
      GetPostCommentRepliesResponse,
      GetPostCommentRepliesVariables
    >(GET_POST_COMMENT_REPLIES, {
      fetchPolicy: 'cache-and-network', // Adjust fetch policy as needed
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        }
      },
      onCompleted: (data) => {
        const { replies: newComments, hasMore } = data?.getPostCommentReplies || {};
        setChildComments((prev) => [...prev, ...newComments || []]);
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
        if(!showReplies)  return;

        client.cache.evict({ id: 'ROOT_QUERY', fieldName: 'getPostComments' }); // Evict the cached query
        client.cache.gc(); // Garbage collect unused fields
        if(childComments?.length === 0){
          setChildComments([]);
          setPage(1)
          fetchInnerComments({ variables: { input: { id:comment?.id, limit: 20, page: 1} } });
        }
      },[comment?.id, showReplies])
    )

    const loadMoreComments = () => {
      if (!loading && hasMore) {
        fetchInnerComments({ variables: { input: { id: comment?.id, limit: 20, page: Math.ceil(childComments?.length / 20 ) + 1} } });
      }
    };
  


  const handleLike = async () => {
    if(loading) return;
    try {
      setIsLiked(prev => !prev)
      const response = await likePostComment({
        variables: {
          isLiked: !comment.isLiked, // Toggle the like status
          commentId: comment.id, // Pass the comment ID
        },
      });
      setComments(prev => (prev?.map(post => post?.id === comment?.id ? {...post, isLiked: !!response?.data?.likePostComment?.isLiked , likesCount: !!response?.data?.likePostComment?.isLiked ? post?.likesCount+1 : post?.likesCount -1} : {...post})))
      // Optionally update the UI or trigger a refetch of comments
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  } 

  const handleVote = async (optionId: string) => {
    setSelectedOption(optionId);
    // await votePollOption({ variables: { commentId: comment.id, optionId } });
    try {
      const response = await addPollCommentVote({
        variables: { commentId: comment?.id, optionId },
      });
      setComments(prev => (prev?.map(post => {
          if(post?.id !== comment?.id)  return {...post}
          return {...post, isVoted: true, voteOptionId: response?.data?.addPollCommentVote?.pollCommentVote?.optionId ?? '', question: response?.data?.addPollCommentVote?.result ?? {} as Question}
        })))
    } catch (err) {
      console.error('Error voting:', err);
    }
  };

  return (
    <View style={[
      styles.container,
      isReply && styles.replyContainer
    ]}>
      <View style={styles.mainComment}>
        <Pressable onPress={() => takeToProfile(comment?.user?.id)}>
          <FastImage
            source={
              comment?.user?.profilePicId
                ? { uri: comment?.user.profilePicId }
                : { uri: getDummyProfile(comment?.user?.name) }
            }
            style={[
              styles.avatar,
              isReply && styles.replyAvatar
            ]}
          />
        </Pressable>
        <View style={styles.contentContainer}>
          <View style={styles.commentHeader}>
          <Pressable onPress={() => takeToProfile(comment?.user?.id)}>
            <Text style={styles.username}>{comment?.user?.name}</Text>
          </Pressable>
            <Text style={styles.time}>{timeAgo(comment?.createdAt)}</Text>
          </View>
          {/* Render Poll if question exists */}
          {comment?.question ? (
            <View style={styles.pollContainer}>
              <Text style={styles.pollQuestion}>{comment?.question?.name}</Text>
              {comment?.question?.options.map(option => (
                <Pressable
                  key={option.id}
                  style={[styles.pollOption, selectedOption === option.id && styles.selectedOption]}
                  onPress={() => handleVote(option.id)}
                  disabled={(selectedOption === option?.id) || addPollLoading || comment?.question?.votingStatus !== 'ACTIVE'}
                >
                  <Text style={styles.pollOptionVotes}>{option.label}</Text>
                  <Text style={styles.pollOptionText}>{option.percentage}%</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <Text style={styles.commentText}>{comment?.text}</Text>
          )}
          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
              {isLiked ? (
                <HeartFilled width={wp(4)} height={wp(4)} />
              ) : (
                <HeartUnFilled width={wp(4)} height={wp(4)} />
              )}
              <Text style={styles.actionText}>
                {comment?.likesCount}
              </Text>
            </TouchableOpacity>
            {!hideReply && <TouchableOpacity 
              onPress={() =>  navigation.navigate('createPost', { type: 'COMMENT', postId:postId, replayTo: isReply ? parentCommentId : comment?.id })     } 
              style={styles.actionButton}
            >
              <Reply width={wp(4)} height={wp(4)} />
              <Text style={styles.actionText}>Reply</Text>
            </TouchableOpacity>}
          </View>
          {!!loadInnerComment && !!isShowMore && <Pressable onPress={() => loadInnerComment()}>
            <Text style={styles.showMoreTxt}>Show More</Text>
          </Pressable>}
        </View>
      </View>

      {!isReply && comment?.repliesCount > 0 && (
        <View style={styles.repliesSection}>
          {!showReplies && (
            <TouchableOpacity 
              style={styles.showRepliesButton}
              onPress={() => setShowReplies(true)}
            >
              <Text style={styles.showRepliesText}>
                Show replies ({comment?.repliesCount})
              </Text>
            </TouchableOpacity>
          )}

          {showReplies && innerCommentLoading && <ActivityIndicator size={'small'} color={'white'}/>}
          
          {showReplies && !innerCommentLoading && (
            <>
              {childComments.map((reply,index) => (
                <CommentCard
                  postId={postId}
                  key={reply.id}
                  comment={reply}
                  setComments={setChildComments}
                  isReply={true}
                  parentCommentId={comment?.id}
                  isShowMore={childComments?.length - 1 === index && hasMore}
                  loadInnerComment={loadMoreComments}
                />
              ))}
              <TouchableOpacity 
                style={styles.showRepliesButton}
                onPress={() => setShowReplies(false)}
              >
                <Text style={styles.showRepliesText}>
                  Hide replies
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CommentCard;