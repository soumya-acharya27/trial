import { gql } from "@apollo/client";

// Define the mutation
export const LIKE_POST_MUTATION = gql`
  mutation LikePost($isLiked: Boolean!, $postId: String!) {
    likePost(isLiked: $isLiked, postId: $postId) {
      isLiked
    }
  }
`;

export const SAVE_POST_MUTATION = gql`mutation SavePost($postId: String!, $save: Boolean!) {
    savePost(postId: $postId, save: $save) {
        savedPost {
            id
        }
    }
}`;

export const GET_SAVED_POSTS_QUERY = gql`
query GetSavedPosts($input: GetSavedPostsInput!) {
    getSavedPosts(input: $input) {
        hasMore
        posts {
            createdAt
            description
            disableComments
            id
            images
            isLiked
            isSaved
            isVoted
            title
            totalComments
            totalLikes
            totalViews
            type
            updatedAt
            userId
            videos
            voteOptionId
            club {
                category
                description
                id
                imageUrl
                isDeleted
                isJoined
                name
                recentJoinedUsers
                status
                totalMembers
            }
            user {
                avatar
                isDMEnabled
                name
                profilePicId
                userName
            }
            question {
                durationMinutes
                endDateTime
                images
                name
                totalVotes
                votingStatus
            }
        }
    }
}`


export const GET_POST_MEDIA_UPLOAD_URL = gql`
  query GetPostMediaUploadUrl($input: GetMediaUploadUrlsInput!) {
    getPostMediaUploadUrl(input: $input) {
      urls {
        key
        url
      }
    }
  }
`;

// Define the mutation
export const ADD_POST = gql`
  mutation AddPost($input: AddPostInput!) {
    addPost(input: $input) {
      post {
            createdAt
            description
            disableComments
            id
            images
            isLiked
            isSaved
            title
            totalComments
            totalLikes
            totalViews
            type
            updatedAt
            userId
            videos
            user {
                avatar
                isDMEnabled
                name
                profilePicId
                userName
            }
            club {
                category
                description
                id
                imageUrl
                isDeleted
                isJoined
                name
                recentJoinedUsers
                status
                totalMembers
            }
        }
    }
}
`;

export const ADD_POST_COMMENT = gql`
  mutation AddPostComment($input: AddPostCommentInput!) {
    addPostComment(input: $input) {
      comment {
            canDelete
            canUpdate
            createdAt
            id
            isEdited
            isLiked
            likesCount
            mediaType
            replayTo
            repliesCount
            text
            updatedAt
        }
    }
  }
`;


export const LIKE_POST_COMMENT = gql`
  mutation LikePostComment($isLiked: Boolean!, $commentId: String!) {
    likePostComment(isLiked: $isLiked, commentId: $commentId) {
      commentId
      id
      isLiked
      userId
    }
  }
`;

export const ADD_QUESTION_POLL_COMMENT = gql`
  mutation AddQuestionPollComment($input: AddQuestionPollCommentInput!) {
    addQuestionPollComment(input: $input) {
      question {
        durationMinutes
        endDateTime
        name
        totalVotes
        votingStatus
        options {
          id
          label
          percentage
          votes
        }
      }
    }
  }
`;

export const ADD_POLL_COMMENT_VOTE = gql`
  mutation AddPollCommentVote($commentId: String!, $optionId: String!) {
    addPollCommentVote(commentId: $commentId, optionId: $optionId) {
      pollCommentVote {
        commentId
        createdAt
        id
        optionId
        updatedAt
        userId
      }
      result {
        durationMinutes
        endDateTime
        name
        totalVotes
        votingStatus
        options {
          id
          label
          percentage
          votes
        }
      }
    }
  }
`;