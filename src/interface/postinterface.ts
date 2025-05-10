import { Post } from "./clubinterface";

// Types for the mutation variables
export interface LikePostInput {
  isLiked: boolean;
  postId: string;
}

// Types for the mutation response
export interface LikePostResponse {
  likePost: {
    isLiked: boolean;
  };
}

export interface SavePostInput {
  postId: string;
  save: boolean;
}

export interface SavePostResponse {
  savePost: {
      savedPost: {
        id: string;
      };
  };
}

export interface GetSavedPostsResponse {
  getSavedPosts: {
      hasMore: boolean;
      posts: Post[];
  };
}

export interface GetSavedPostsInput {
    "search"?: string;
    "page": number;
    "limit": number;
    "userId"?: string;
    "userPostsOnly"?: boolean
}

export interface FileInput {
  fileType: string; 
  fileName: string; 
  type: string; 
}

export interface GetMediaUploadUrlsInput {
  input: {
    files: FileInput[];
  };
}

export interface UrlResponse {
  key: string;
  url: string;
}

export interface GetPostMediaUploadUrlResponse {
  getPostMediaUploadUrl: {
    urls: UrlResponse[];
  };
}

export interface AddPostInput {
  description: string;
  disableComments?: boolean;
  imagesKeys?: string[];
  videosKeys?: string[];
  clubId: string;
  repostedPostId?: string;
}

// Define the response type
export interface AddPostResponse {
  addPost: {
    createdAt: string;
    description: string;
    disableComments: boolean;
    id: string;
    totalComments: number;
    totalLikes: number;
    totalViews: number;
    type: string;
    updatedAt: string;
    userId: string;
  };
}


export interface GetPostCommentsResponse {
  getPostComments: {
    hasMore: boolean;
    comments: Comment[];
  };
}

export interface Comment {
  id: string;
  text: string;
  isLiked: boolean;
  likesCount: number;
  repliesCount: number;
  isEdited: boolean;
  canDelete: boolean;
  canUpdate: boolean;
  createdAt: string;
  updatedAt: string;
  mediaType?: string;
  replayTo?: string;
  mentions: Mention[];
  user: User;
  isVoted: boolean;
  voteOptionId: string;
  question: Question
}

export interface Question{
  durationMinutes: number
  endDateTime: string
  name: string;
  totalVotes: number;
  votingStatus: string;
  options: {
      id: string;
      label:string;
      votes: number;
      percentage: number;
  }[]
}


export interface AddQuestionPollCommentResponse {
  addQuestionPollComment: {
    question: Question;
  };
}

export interface AddQuestionPollCommentVariables {
  input: {
    durationMinutes: number;
    options: string[];
    postId: string;
    question: string;
    replayTo: string;
  };
}

export interface PollOption {
  id: string;
  label: string;
  percentage: number;
  votes: number;
}

export interface PollResult {
  durationMinutes: number;
  endDateTime: string;
  name: string;
  totalVotes: number;
  votingStatus: string;
  options: PollOption[];
}

export interface PollCommentVote {
  commentId: string;
  createdAt: string;
  id: string;
  optionId: string;
  updatedAt: string;
  userId: string;
}


export interface AddPollCommentVoteResponse {
  addPollCommentVote: {
    pollCommentVote: PollCommentVote;
    result: PollResult;
  };
}

export interface AddPollCommentVoteVariables {
  commentId: string;
  optionId: string;
}

export interface Mention {
  id: string;
  userName: string;
}

export interface User {
  name: string;
  userName: string;
  profilePicId: string;
  id: string;
}

export interface CommentBottomDrawerProps {
  postId: string;
}

export interface AddPostCommentVariables {
  input: {
    postId: string;
    text: string;
    replayTo?: string; // Optional
  }
}
export interface AddPostCommentResponse {
  addPostComment: {
    comment: Comment;
  };
}


export interface LikePostCommentResponse {
  likePostComment: {
    commentId: string;
    id: string;
    isLiked: boolean;
    userId: string;
  };
}

export interface LikePostCommentVariables {
  isLiked: boolean;
  commentId: string;
}

export interface FollowUserInput {
  followeeId: string;
  isFollow: boolean;
}

export interface FollowUserResponse {
  followUser: {
      followeeId: string;
      id: string;
      isFollow: boolean;
      userId: string;
  };
}

export interface RemoveFollowerInput {
  followeeId: string; // ID of the user being removed as a follower
  userId: string; // ID of the logged-in user
}

export interface RemoveFollowerResponse {
  removeFollower: {
    followeeId: string;
    id: string;
    isFollow: boolean;
    userId: string;
  };
}

export interface GetPostCommentRepliesResponse {
  getPostCommentReplies: {
    hasMore: boolean;
    replies: Comment[];
  };
}

export interface GetPostCommentRepliesVariables {
  input: {
    id: string;
    limit: number;
    page: number;
  };
}

export interface GetUserCommentsResponse {
  getUserComments: {
    hasMore: boolean;
    comments: Comment[];
  };
}

export interface GetUserCommentsInput {
  userId: string;
  limit: number;
  page: number;
}