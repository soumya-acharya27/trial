import { gql } from '@apollo/client';

export const GET_REPORTED_POSTS = gql`
  query GetReportedPosts($input: GetReportedPostsInput!) {
    getReportedPosts(input: $input) {
      hasMore
      posts {
        createdAt
        description
        disableComments
        id
        images
        isArchived
        isFollowed
        isVoted
        reason
        reportCategory
        reportId
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
        question {
          durationMinutes
          endDateTime
          images
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
        user {
          avatar
          id
          isDMEnabled
          name
          profilePicId
          userName
        }
      }
    }
  }
`; 