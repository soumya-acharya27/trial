import { User } from "../../interface/signUpInterface";

export interface authState {
    accessToken: string;
    expiresIn: number;
    id: string;
    refreshToken: string;
    tokenType: string;
    userInfo: User,
    onBoardingCompleted: boolean
}

export interface Credential {
    accessToken: string;
    expiresIn: number;
    id: string;
    refreshToken: string;
    tokenType: string;
    onboarding: {
        isCompleted: boolean;
    }
}