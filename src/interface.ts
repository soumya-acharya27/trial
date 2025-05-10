
export interface UserProfile {
  avatar: string | null;
  countryCode: string;
  phoneNumber: string;
  createdAt: string;
  email: string;
  gender: string | null;
  id: string;
  isVerified: boolean;
  college: string;
  bio: string;
  name: string;
  profilePicId: string | null;
  updatedAt: string;
  userName: string;
}

export interface GetProfilePicUploadUrlInput {
  input: {
    fileType: string;
  };
}

export interface GetProfilePicUploadUrlResponse {
  getProfilePicUploadUrl: {
    url: string;
    key: string;
  };
}

export interface GetDocumentUploadUrlResponse  {
  getDocumentUploadUrl: {
    key: string;
    url: string;
  };
};

export interface GetDocumentUploadUrlVariables {
  input: {
    fileType: string;
  };
};