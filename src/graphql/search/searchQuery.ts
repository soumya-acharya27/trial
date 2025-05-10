import { gql } from '@apollo/client';

export const SEARCH_HOME = gql`
    query SearchHome($input: SearchHomeInput!) {
        searchHome(input: $input) {
            clubsOutput {
                hasMore
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
            usersOutput {
                hasMore
                userList {
                    id
                    name
                    profilePicId
                    userName
                    college
                }
            }
        }
    }
`; 