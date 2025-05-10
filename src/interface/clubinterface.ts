import { clubCategories } from "../redux-saga/club/clubModel";

  export interface GetClubCategoriesResponse {
    getClubCategories: {
      categories: clubCategories[];
    };
  }

export interface GetClubsInput {
  search?: string;
  category?: string;
  page: number;
  limit: number;
}


export interface GetClubsResponse {
  getClubs: {
    clubs: Club[];
    hasMore: boolean;
  };
}


export interface Club {
  category: string;
  description: string;
  id: string;
  imageUrl: string;
  isDeleted: boolean;
  name: string;
  status: string;
  isJoined: boolean;
  recentJoinedUsers: string[]; // Replace with appropriate type if user details are objects
}

export interface GetClubDetailsInput {
  id: string; 
}

export interface GetClubDetailsResponse {
  getClubDetails: {
    category: string;
    description: string;
    id: string;
    imageUrl: string | null; 
    isDeleted: boolean;
    isJoined: boolean;
    name: string;
    status: string;
  };
}

export interface GetClubMembersInput {
  clubId: string; 
  limit?: number;
  page?: number;
}

export interface Member {
  college: string;
  id: string;
  name: string;
  profilePicId: string | null;
  totalClubJoined: number;
  mutualClubs: number;
}

export interface GetClubMembersResponse {
  getClubMembers: {
    hasMore: boolean;
    members: Member[];
  };
}

export interface JoinClubVariables {
  id: string; 
  isJoinining: boolean; 
}

export interface JoinClubResponse {
  joinClub: {
    id: string; 
    isJoined: boolean; 
  };
}

export interface GetPostsInput {
  userPostsOnly?: boolean;
  limit: number;
  page: number;
  userId?: string;
  clubId?: string;
}

export interface Post {
  id: string;
  isFollowed: boolean;
  createdAt: string;
  description: string;
  images: string[];
  videos: string[];
  totalLikes: number;
  totalComments: number;
  totalReposts: number;
  totalViews: number;
  isLiked: boolean;
  isSaved: boolean;
  user: {
    name: string;
    profilePicId: string;
  };
  userId: string;
  club: {
    id: string;
    name: string;
  };
  repostedPost?: {
    createdAt: string;
    description: string;
    disableComments: boolean;
    id: string;
    images: string[];
    totalComments: number;
    totalLikes: number;
    totalViews: number;
    type: string;
    updatedAt: string;
    userId: string;
    videos: string[];
    question?: {
      durationMinutes: number;
      endDateTime: string;
      images: string[];
      name: string;
      totalVotes: number;
      votingStatus: string;
      options: {
        id: string;
        label: string;
        percentage: number;
        votes: number;
      }[];
    };
    user: {
      avatar: string;
      isDMEnabled: boolean;
      name: string;
      profilePicId: string;
      userName: string;
    };
    isLiked: boolean;
    isSaved: boolean;
    totalReposts: number;
    repostedByUser : {
      avatar: string;
      isDMEnabled: boolean;
      name: string;
      profilePicId: string;
      userName: string;
      id: string;
    }
  };
}

export interface GetPostsResponse {
  getPosts: {
    hasMore: boolean;
    posts: Post[];
  };
}

export interface GetLikedPostsResponse {
  getLikedPosts: {
    hasMore: boolean;
    posts: Post[];
  };
}


export interface Club {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

export interface GetUserJoinedClubsResponse {
  getUserJoinedClubs: {
    hasMore: boolean;
    clubs: Club[];
  };
}

export interface GetUserJoinedClubsVariables {
  limit: number;
  page?: number;
  userId?: string;
}


export interface GetUserJoinedClubsData {
  getUserJoinedClubs: {
    hasMore: boolean;
    clubs: Club[];
  };
}

export interface GetUserJoinedClubsVars {
  limit: number;
  page?: number;
  userId: string;
}

export interface BlockedUser {
  blockedUserId: string;
  id: string;
  isBlocked: boolean;
  userId: string;
}

export interface BlockUserResponse {
  blockUser: {
    blockedUser: BlockedUser;
  };
}

export interface BlockUserVariables {
  blockedUserId: string;
  isBlocked: boolean;
}

export interface BlockedUserDetails {
  id: string;
  isDMEnabled: boolean;
  name: string;
  profilePicId: string;
  userName: string;
}

export interface BlockedUserItem {
  blockedUserId: string;
  id: string;
  isBlocked: boolean;
  userId: string;
  blockedUser: BlockedUserDetails;
}

export interface GetBlockedUsersListResponse {
  getBlockedUsersList: {
    hasMore: boolean;
    blockedUsers: BlockedUserItem[];
  };
}

export interface GetBlockedUsersListVariables {
  limit: number;
  page: number;
}

export interface ReportCategory {
  id: string;
  reason: string;
}

export interface GetReportCategoriesResponse {
  getReportCategories: {
    reports: ReportCategory[];
  };
}

export interface AddPostReportInput {
  postId: string;
  reportId: string;
}

export interface PostReport {
  id: string;
  postId: string;
  reason: string;
  reportId: string;
  userId: string;
}

export interface AddPostReportResponse {
  addPostReport: PostReport;
}

export interface AddPostReportVariables {
  input: AddPostReportInput;
}

export interface VoteOption {
  id: string;
  label: string;
  percentage: number;
  votes: number;
}

export interface PostQuestion {
  durationMinutes: number;
  endDateTime: string;
  images: string[];
  name: string;
  totalVotes: number;
  votingStatus: string;
  options: VoteOption[];
}

export interface ReportedPost extends Post {
  reason: string;
  reportCategory: string;
  reportId: string;
  isArchived: boolean;
  disableComments: boolean;
  title?: string;
  isVoted?: boolean;
  voteOptionId?: string;
  question?: PostQuestion;
  club: {
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
  };
  user: {
    avatar: string;
    id: string;
    isDMEnabled: boolean;
    name: string;
    profilePicId: string;
    userName: string;
  };
}

export interface GetReportedPostsInput {
  limit: number;
  page: number;
}

export interface GetReportedPostsResponse {
  getReportedPosts: {
    hasMore: boolean;
    posts: ReportedPost[];
  };
}

export interface GetReportedPostsVariables {
  input: GetReportedPostsInput;
}