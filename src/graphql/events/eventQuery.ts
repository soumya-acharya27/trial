import { gql } from "@apollo/client";

export const GET_EVENTS_PAGE = gql`
    query GetEventsPage($input: GetEventsPageInput!) {
    getEventsPage(input: $input) {
        trending {
            hasMore
            events {
                description
                domain
                endDateTime
                id
                imageId
                isDeleted
                isRegistered
                isRegistrationOpen
                mode
                name
                scheduleTime
                startDateTime
                status
                totalMembers
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
        upcoming {
            hasMore
            events {
                description
                domain
                endDateTime
                id
                imageId
                isDeleted
                isRegistered
                isRegistrationOpen
                mode
                name
                scheduleTime
                startDateTime
                status
                totalMembers
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
        location {
            id
            name
        }
    }
}`;

export const GET_EVENTS = gql`
    query GetEvents($input: GetEventsInput!) {
        getEvents(input: $input) {
            hasMore
            events {
                description
                endDateTime
                id
                imageId
                isDeleted
                scheduleTime
                startDateTime
                name
                totalMembers
                mode
                domain
                status
                isRegistrationOpen
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
    }
`;

export const GET_LOCATIONS = gql`
    query GetLocations($input: GetLocationsInput!) {
        getLocations(input: $input) {
            locations {
                id
                name
            }
        }
    }
`;

// location {
//     cdBlock
//     country
//     district
//     id
//     imageBaseUrl
//     imageId
//     imagePath
//     name
//     state
//     subDistrict
//     type
//     unionTerritory
// }

export const GET_EVENT_DETAILS = gql`
  query GetEventDetails($id: String!) {
    getEventDetails(id: $id) {
      isRegistered
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

export const GET_USER_REGISTERED_EVENTS = gql`
  query GetUserRegisteredEvents($input: GetUserRegisteredEventsInput!) {
    getUserRegisteredEvents(input: $input) {
      hasMore
      events {
        description
        domain
        endDateTime
        id
        imageId
        isDeleted
        isRegistrationOpen
        mode
        name
        scheduleTime
        startDateTime
        status
        totalMembers
      }
    }
  }
`;