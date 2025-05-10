import { gql } from "@apollo/client";

// Define the mutation
export const JOIN_CLUB = gql`
  mutation JoinClub($id: String!, $isJoinining: Boolean!) {
    joinClub(id: $id, isJoinining: $isJoinining) {
      id
      isJoined
    }
  }
`;

export const GET_USER_JOINED_CLUBS = gql`
  query GetUserJoinedClubs($limit: Int!, $page: Int, $userId: String!) {
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
  }
`;