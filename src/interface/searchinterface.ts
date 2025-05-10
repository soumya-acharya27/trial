export interface SearchHomeInput {
    limit: number;
    page: number;
    search: string;
}

export interface ClubOutput {
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
}

export interface UserOutput {
    id: string;
    name: string;
    profilePicId: string;
    userName: string;
    college: string;
}

export interface SearchHomeResponse {
    searchHome: {
        clubsOutput: {
            hasMore: boolean;
            clubs: ClubOutput[];
        };
        usersOutput: {
            hasMore: boolean;
            userList: UserOutput[];
        };
    };
} 