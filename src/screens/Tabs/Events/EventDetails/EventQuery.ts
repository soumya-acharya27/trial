import { gql } from '@apollo/client';

export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($id: String!) {
    getEventDetails(id: $id) {
      isRegistered
      qrCode
      description
      endDateTime
      id
      imageId
      isDeleted
      scheduleTime
      startDateTime
      name
      domain
      totalMembers
      mode
      isRegistrationOpen
      status
      clubs {
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
`;

export interface EventDetailsResponse {
  getEventDetails: {
    isRegistered: boolean;
    qrCode: string;
    description: string;
    endDateTime: string;
    id: string;
    imageId: string;
    isDeleted: boolean;
    scheduleTime: string;
    startDateTime: string;
    name: string;
    domain: string;
    totalMembers: number;
    mode: string;
    isRegistrationOpen: boolean;
    status: string;
    clubs: Array<{
      category: string;
      description: string;
      id: string;
      imageUrl: string;
      isDeleted: boolean;
      isJoined: boolean;
      name: string;
      recentJoinedUsers: string[];
      status: string;
      totalMembers: number;
    }>;
  };
} 