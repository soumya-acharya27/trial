interface UserChat {
  chatId: string;
  id: string;
  isOnline: boolean;
  name: string;
  photo: string;
  userId: string;
}

interface GetUserChatResponse {
  getUserChat: {
    userChat: UserChat;
  };
}

interface GetUserChatVariables {
  input: {
 //   recipientId: string;
    id: string;
    recipientId:string;
  };
}


interface UserChatMessage {
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
  
  interface GetUserChatMessagesResponse {

      hasMore: boolean;
      messages: UserChatMessage[];
  }
  
  interface GetUserChatMessagesVariables {
    input: {
      chatId: string;
      page: number;
      limit: number;
    };
  }

  