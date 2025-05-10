export interface GetUserChatsInput {
    input: {
      lastMessage?: boolean;
      page: number; 
      limit: number;
    };
  }
  

  export interface GetUserChatsResponse {
    getUserChats: {
      hasMore: boolean; 
      userChats: UserChat[]; 
    };
  }
  

  export interface UserChat {
    chatId: string; 
    id: string; 
    isGroup: boolean; 
    isOnline: boolean;
    lastMessageAt: string;
    name: string; 
    photo: string; 
    unreadMessagesCount: number;
    updatedAt: string; 
    message: {
      text: string;
      id: string; 
    } | null;
  }

  