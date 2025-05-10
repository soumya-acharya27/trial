import { gql } from "@apollo/client";

export const REGISTER_FOR_EVENT = gql`
  mutation RegisterForEvent($input: EventRegistrationInput!) {
    registerForEvent(input: $input) {
        eventId
        id
        isCheckedIn
        isUsed
        qrCode
        registeredBy
    }
}

`;
