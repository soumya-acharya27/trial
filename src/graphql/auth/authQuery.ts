import { gql } from '@apollo/client';

export const VALIDATE_USERNAME = gql`
  query ValidateUsername($userName: String!) {
    validateUsername(userName: $userName) {
      available
    }
  }
`;


export const GET_USER_INFO = gql`
  query GetUserInfo($userId: String!) {
    getUserInfo(userId: $userId) {
      user {
        avatar
        bio
        countryCode
        phoneNumber
        createdAt
        email
        gender
        id
        isVerified
        name
        updatedAt
        userName
        college
        profilePicId
        isCollegeVerified
      }
      settings {
        isDMEnabled
      }
      profileUnderReview
      followRequestId
      followingCount
      followersCount
      isFollowRequested
      isFollowed
      totalPostCount
    }
  }
`;