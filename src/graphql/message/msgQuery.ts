import { gql } from '@apollo/client';

export const GET_MESSAGE_LIST = gql`
 query GetUserChats($input: GetUserChatsInput!) {
    getUserChats(input: $input) {
        hasMore
        userChats {
            chatId
            id
            isGroup
            isOnline
            lastMessageAt
            name
            unreadMessagesCount
            photo
            updatedAt
            message {
                text
                id
            }
        }
    }
}

`;

export const GET_USER_CHAT = gql`
  query GetUserChat($input: GetUserChatInput!) {
    getUserChat(input: $input) {
      userChat {
        chatId
        id
        isOnline
        name
        photo
        userId
      }
    }
  }
`;

export const GET_USER_CHAT_MESSAGES = gql`
query GetUserChatMessages($input: GetUserChatMessagesInput!) {
  getUserChatMessages(input: $input) {
    hasMore
    messages {
      chatId
      createdAt
      depth
      id
      isEdited
      isRead
      text
      totalReplies
      type
      updatedAt
      userId
      lastRepliedUsers {
        id
        profilePicId
      }
      mentions {
        id
        userName
      }
      reactions {
        total
        unicode
      }
      user {
        id
        name
        profilePicId
        userName
      }
    }
  }
}
`;

