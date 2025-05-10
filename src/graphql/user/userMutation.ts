import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
        user {
            avatar
            bio
            countryCode
            email
            gender
            id
            isVerified
            name
            phoneNumber
            profilePicId
            userName
        }
    }
}`

export const GET_POSTS_MUTATION = gql`mutation GetPosts($input: GetPostsInput!) {
    getPosts(input: $input) {
        hasMore
        posts {
            isFollowed
            userId
            createdAt
            description
            disableComments
            id
            images
            totalComments
            totalLikes
            totalViews
            type
            updatedAt
            userId
            videos
            question {
                durationMinutes
                endDateTime
                images
                name
                options {
                    id
                    label
                    percentage
                    votes
                }
                totalVotes
                votingStatus
            }
            user {
                avatar
                name
                userName
                isDMEnabled
                profilePicId
            }
            isLiked
            isSaved
            club {
                id
                category
                description
                name
                imageUrl
                status
                totalMembers
                isDeleted
            }
            isVoted
            voteOptionId
            repostedPost {
                isFollowed
                createdAt
                description
                disableComments
                id
                images
                totalComments
                totalLikes
                totalViews
                totalReposts
                type
                updatedAt
                userId
                videos
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
                    isDMEnabled
                    name
                    profilePicId
                    userName
                }
                isLiked
                isSaved
            }
            title
            isArchived
            totalReposts
            repostedByUser {
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
`

export const PHONE_LOGIN = gql`
  mutation PhoneLogin($countryCode: String!, $phoneNumber: String!) {
    phoneLogin(countryCode: $countryCode, phoneNumber: $phoneNumber) {
      id
    }
  }
`;

export const RESEND_OTP_TO_PHONE = gql`
  mutation ResendOTPToPhoneNumber($countryCode: String!, $phoneNumber: String!) {
    resendOTPToPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber) {
      message
    }
  }
`;

export const VERIFY_PHONE_OTP = gql`
  mutation VerifyPhoneOTP($id: String!, $otp: String!) {
    verifyPhoneOTP(id: $id, otp: $otp) {
      accessToken
      expiresIn
      id
      refreshToken
      tokenType
      onboarding {
        isCompleted
      }
    }
  }
`;


export const GET_LIKED_POSTS = gql`
  query GetLikedPosts($input: GetLikedPostsInput!) {
    getLikedPosts(input: $input) {
      hasMore
      posts {
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
          isDMEnabled
          name
          profilePicId
          userName
        }
      }
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation FollowUser($followeeId: String!, $isFollow: Boolean!) {
    followUser(followeeId: $followeeId, isFollow: $isFollow) {
      followeeId
      id
      isFollow
      userId
    }
}`;

export const REMOVE_FOLLOWER_MUTATION = gql`
  mutation RemoveFollower($followeeId: String!, $userId: String!) {
    removeFollower(followeeId: $followeeId, userId: $userId) {
      followeeId
      id
      isFollow
      userId
    }
  }
`;