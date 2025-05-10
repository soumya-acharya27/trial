import { gql } from "@apollo/client";

export const GET_POST_COMMENTS = gql`
  query GetPostComments($input: GetPostCommentsInput!) {
    getPostComments(input: $input) {
        hasMore
        comments {
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
            mentions {
                id
                userName
            }
            question {
                durationMinutes
                endDateTime
                name
                totalVotes
                votingStatus
                options {
                    id
                    label
                    votes
                    percentage
                }
            }
            isVoted
            voteOptionId
            user {
                id
                name
                profilePicId
                userName
            }
        }
    }
}

`;

export const GET_POST_COMMENT_REPLIES = gql`
  query GetPostCommentReplies($input: GetPostCommentRepliesInput!) {
    getPostCommentReplies(input: $input) {
      hasMore
      replies {
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
        question {
            durationMinutes
            endDateTime
            name
            totalVotes
            votingStatus
            options {
                id
                label
                votes
                percentage
            }
        }
        isVoted
        voteOptionId
        user {
          avatar
          isDMEnabled
          name
          profilePicId
          userName
        }
      }
    }
  }
`;

export const GET_USER_COMMENTS = gql`
  query GetUserComments($input: GetUserCommentsInput!) {
    getUserComments(input: $input) {
      hasMore
      comments {
        canDelete
        canUpdate
        createdAt
        id
        isEdited
        isLiked
        isVoted
        likesCount
        mediaType
        replayTo
        repliesCount
        text
        updatedAt
        voteOptionId
        mentions {
          id
          userName
        }
        question {
          durationMinutes
          endDateTime
          name
          votingStatus
          options {
            id
            label
            percentage
            votes
          }
          totalVotes
        }
        user {
          id
          avatar
          isDMEnabled
          name
          profilePicId
          userName
        }
      }
    }
  }
`;