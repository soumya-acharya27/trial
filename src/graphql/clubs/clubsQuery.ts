import { gql } from '@apollo/client';

export const GET_CLUB_CATEGORIES = gql`
    query GetClubCategories {
        getClubCategories {
            categories {
                category
                slug
            }
        }
    }`;

export const GET_CLUBS = gql`
    query GetClubs($input: GetClubsInput!) {
      getClubs(input: $input) {
        clubs {
          category
          description
          id
          imageUrl
          isDeleted
          name
          status
          isJoined

        }
        hasMore
      }
    }
  `;


export const GET_CLUB_DETAILS = gql`
  query GetClubDetails($input: GetClubDetailsInput!) {
    getClubDetails(input: $input) {
      category
      description
      id
      imageUrl
      isDeleted
      isJoined
      name
      status
    }
  }
`;

export const GET_CLUB_MEMBERS = gql`
  query GetClubMembers($input: GetClubMembersInput!) {
    getClubMembers(input: $input) {
        hasMore
        members {
            college
            id
            name
            profilePicId
            totalClubJoined
            mutualClubs
        } 
    }
}
`;

export const GET_USER_JOINED_CLUBS = gql`query GetUserJoinedClubs($limit: Int!, $page: Int, $userId: String) {
    getUserJoinedClubs(limit: $limit, page: $page, userId: $userId) {
        hasMore
        clubs {
            category
            id
            imageUrl
            name
            isJoined
        }
    }
}`
