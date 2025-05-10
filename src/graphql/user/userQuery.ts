import { gql } from "@apollo/client";

export const GET_USERDETAILS = gql`query GetUserProfile {
    getUserProfile {
        user {
            avatar
            countryCode
            phoneNumber
            createdAt
            email
            gender
            id
            isVerified
            name
            profilePicId
            updatedAt
            userName
            college
            bio
            isCollegeVerified
        }
        profileUnderReview
    }
}`

export const GET_PROFILE_PIC_UPLOAD_URL = gql`
  query GetProfilePicUploadUrl($input: GetProfilePicUploadUrlInput!) {
    getProfilePicUploadUrl(input: $input) {
      url
      key
    }
  }
`;

export const GET_USERINFO = gql`
query GetUserInfo($userId: String!) {
  getUserInfo(userId: $userId) {
    user {
      avatar
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
    }
    settings {
      isDMEnabled
    }
  }
}`

export const GET_DOCUMENT_UPLOAD_URL = gql`
  query GetDocumentUploadUrl($input: GetDocumentUploadUrlInput!) {
    getDocumentUploadUrl(input: $input) {
      key
      url
    }
  }
`;
