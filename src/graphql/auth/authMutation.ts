import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!) {
        login(email: $email) {
            id
        }
    }`;

export const RESEND_OTP = gql`
    mutation ResendOTP($email: String!) {
        resendOTP(email: $email) {
            message
        }
    }
`

export const VERIFY_OTP = gql`
    mutation VerifyOTP($id: String!, $otp: String!) {
        verifyOTP(id: $id, otp: $otp) {
            accessToken
            expiresIn
            id
            refreshToken
            tokenType
            onboarding {
                isCompleted
            }
        }
    }`;

export const COMPLETE_SIGNUP = gql`
    mutation CompleteSignup($input: CompleteSignupInput!) {
        completeSignup(input: $input) {
            user {
                avatar
                countryCode
                id
                name
                phoneNumber
                userName
                name
                gender
                profilePicId
                isVerified
                email
                college
                bio
            }
        }
    }`



// Mutation to send OTP for email verification
export const SEND_VERIFICATION_OTP = gql`
  mutation SendVerificationOTP($email: String!) {
    sendVerificationOTP(email: $email) {
      id
    }
  }
`;


export const VERIFY_COLLEGE_EMAIL = gql`
  mutation VerifyCollegeEmail($id: String!, $otp: String!) {
    verifyCollegeEmail(id: $id, otp: $otp) {
      success
    }
  }
`;

export const SEND_VERIFICATION_REQUEST = gql`
  mutation SendVerificationRequest($input: SendVerificationRequestInput!) {
    sendVerificationRequest(input: $input) {
      id
    }
  }
`;