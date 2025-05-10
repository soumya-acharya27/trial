// Define the structure of the input object
export interface GetUserChatMessagesInput {
    search?: string; // Optional search term
    chatId: string;  // Required chatId
    page: number;    // Current page number
    limit: number;   // Number of messages per page
  }
  
  // Define the structure of the chat message
  export interface ChatMessage {
    chatId: string;
    createdAt: string;
    depth: number;
    id: string;
    isEdited: boolean;
    isRead: boolean;
    text: string;
    totalReplies: number;
    type: string;
    updatedAt: string;
    userId: string;
    lastRepliedUsers: {
      id: string;
      profilePicId: string;
    }[];
    mentions: {
      id: string;
      userName: string;
    }[];
    reactions: {
      total: number;
      unicode: string;
    }[];
    user: {
      id: string;
      name: string;
      profilePicId: string;
      userName: string;
    };
  }
  
  // Define the structure of the response
  export interface GetUserChatMessagesResponse {
    hasMore: boolean;
    messages: ChatMessage[];
  }