export interface LoginResult {
  login: {
    id: string;
  };
}

export interface LoginVariables {
  email: string;
}


export interface VerifyOTPVariables {
  id: string;
  otp: string;
}

export interface VerifyOTPResult {
  verifyOTP: {
    accessToken: string;
    expiresIn: number;
    id: string;
    refreshToken: string;
    tokenType: string;
    onboarding : {
      isCompleted: boolean
    }
  };
}

 export interface ValidateUsernameVariables {
  userName: string;
}

export interface ValidateUsernameResult {
  validateUsername: {
    available: boolean;
  };
}
 export interface CompleteSignupInput {
  avatar?: string;
  countryCode: string;
  name: string;
  phoneNumber: string;
  userName: string;
  gender?: string;
  profilePicId?: string;
  email?: string;
  bio?: string;
  college: string;
}

 export interface CompleteSignupResponse {
  completeSignup: {
    user: {
      avatar: string;
      countryCode: string;
      id: string;
      name: string;
      phoneNumber: string;
      userName: string;
      gender: string;
      profilePicId: string;
      isVerified: boolean;
      email: string;
      bio: string;
    };
  };
}
 export interface GetUserProfileResult {
  getUserProfile: {
    user: User
  };
}

export interface GetUserProfileVariables {
  input: {
    avatar?: string;
    bio?: string;
    countryCode?: string;
    email?: string;
    gender?: string;
    id: string;
    isVerified?: boolean;
    name?: string;
    phoneNumber?: string;
    profilePicId?: string;
    userName?: string;
    college: string
  };
}

export interface EditUserProfileResult {
  updateUserProfile: {
    user: {
      avatar: string | null
      bio?: string;
      countryCode?: string;
      email?: string;
      gender?: string;
      id: string;
      isVerified?: boolean;
      name?: string;
      phoneNumber?: string;
      profilePicId?: string;
      userName?: string;
      college: string;
    };
  };
}

export interface EditUserProfileVariables {
  input: {
    avatar?: string;
    bio?: string;
    countryCode?: string;
    email?: string;
    gender?: string;
    id?: string;
    isVerified?: boolean;
    name?: string;
    phoneNumber?: string;
    profilePicId?: string;
    userName?: string;
    college?: string
  };
}


 export interface User {
  avatar: string;
  countryCode: string;
  phoneNumber: string;
  createdAt: string;
  email: string;
  gender: string;
  id: string;
  isVerified: boolean;
  name: string;
  updatedAt: string;
  userName: string;
  college: string;
  profilePicId: string;
  bio?: string
  isCollegeVerified: boolean
  profileUnderReview: boolean;
  followRequestId: string;
  followingCount: number
  followersCount: number;
  isFollowRequested: boolean;
  isFollowed: boolean;
}

 export interface Settings {
  isDMEnabled: boolean;
}

 export interface GetUserInfoData {
  getUserInfo: {
    user: User;
    settings: Settings;
    profileUnderReview: boolean
  };
}

 export interface GetUserInfoVars {
  userId: string;
}


export interface GetUserInfoVariables {
  userId: string;
}
export interface GetUserInfoResponse {
  getUserInfo: {
    user: User;
    followRequestId: string;
    followingCount: number
    followersCount: number;
    isFollowRequested: boolean;
    isFollowed: boolean;
    totalPostCount: number
  };
}

export interface PhoneLoginResponse  {
  phoneLogin : {
    id: string;
  }
};

export interface PhoneLoginVariables {
  countryCode: string;
  phoneNumber: string;
};

export interface ResendOTPResponse  {
  resendOTPToPhoneNumber: {
    message: string;
  };
};

export interface ResendOTPVariables {
  countryCode: string;
  phoneNumber: string;
};

export interface VerifyPhoneOTPResponse {
  verifyPhoneOTP: {
    accessToken: string;
    expiresIn: number;
    id: string;
    refreshToken: string;
    tokenType: string;
    onboarding: {
      isCompleted: boolean
    }
  };
}

export interface VerifyPhoneOTPVariables {
  id: string;
  otp: string;
}


export interface VerifyCollegeEmailInput {
  id: string;
  otp: string;
}

export interface VerifyCollegeEmailResponse {
  verifyCollegeEmail: {
    success: boolean;
  };
}

export interface SendVerificationOTPInput {
  email: string;
}

export interface SendVerificationOTPResponse {
  sendVerificationOTP: {
    id: string;
  };
}

export interface SendVerificationRequestResponse {
  sendVerificationRequest: {
    id: string;
  };
};

export interface SendVerificationRequestVariables {
  input: {
    key: string;
    documentType?: string;
  };
};