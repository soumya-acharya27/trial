import { View, Text, Pressable, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, FlatList, ActivityIndicator, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { io, Socket } from "socket.io-client";
import Send from "../../../assets/svg/sendmsg.svg";
import Smile from "../../../assets/svg/smile.svg";
import File from "../../../assets/svg/file.svg";
import Back from '../../../assets/svg/arrowleft.svg';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_CHAT, GET_USER_CHAT_MESSAGES } from '../../../graphql/message/msgQuery';
import { RootState } from '../../../redux-saga/rootReducer';
import { useIsFocused } from '@react-navigation/native';
import { styles } from './styles';
import { GetUserChatMessagesInput } from '../../../interface/chatmsginterface';
import moment from 'moment';
import { getDummyProfile, isValidImageUrl } from '../../../utils';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { logger } from '../../../utils/logger';

export interface MHOrderMenuViewRouteProps {
  userData: {
    id: string;
    name: string;
    photo?: string;
  };
  recipientId?: string;
}

// Add this helper function at the top level
const groupMessagesByDate = (messages: any[]) => {
  const groups: { [key: string]: any[] } = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Sort messages by date (oldest first)
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  sortedMessages.forEach(message => {
    const messageDate = new Date(message.createdAt);
    const messageDateStr = messageDate.toISOString().split('T')[0];
    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let dateKey: string;
    if (messageDateStr === todayStr) {
      dateKey = 'Today';
    } else if (messageDateStr === yesterdayStr) {
      dateKey = 'Yesterday';
    } else {
      dateKey = messageDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });

  return groups;
};

interface MessageGroup {
  date: string;
  messages: any[];
}

interface MessageProps {
  navigation: NativeStackNavigationProp<any>;
  route: {
    params: MHOrderMenuViewRouteProps;
  };
}

const Message: React.FC<MessageProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const isFocused = useIsFocused();

  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [profilePicId, setProfilePicId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [usersChat, setUserChat] = useState<UserChat | null>(null);
  const [inputHeight, setInputHeight] = useState(hp(5));

  const token = useSelector((state: RootState) => state.authReducer.accessToken);
  const userId = useSelector((state: RootState) => state.authReducer.id);
  const flatListRef = useRef<FlatList>(null);
  let socket = useRef<Socket | null>(null);
  const routeParams = route.params as MHOrderMenuViewRouteProps;

  const credentials = useSelector((state: RootState) => state.authReducer)


  const takeToProfile = (userId: string) => {
      const isMyProfile = credentials?.userInfo?.id === userId

      if (!isMyProfile)
          return navigation.navigate('profile', { userId: userId, isBack: true,}, )

      return navigation.navigate('profiles', { screen: 'profile', isBack: true })
  }
  

  // Lazy query for fetching user chat
  const [fetchUserChat, { data: chatData }] = useLazyQuery(GET_USER_CHAT, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      const userChat = data?.getUserChat?.userChat;
      setProfilePicId(data?.getUserChat?.userChat?.photo)
      setUserChat(userChat);
      if (userChat?.chatId) {
        setMessages([])
        setPage(1)
        setHasMore(true)
        fetchChatMessages({
          variables: {
            input: { chatId: userChat.chatId, page: 1, limit: 10 },
          },
        });
      }
    },
    onError: (err) => {
    }
  });


  // Lazy query for fetching chat messages
  const [fetchChatMessages, { data: chatMessagesData, fetchMore }] = useLazyQuery(GET_USER_CHAT_MESSAGES, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      setMessages((prev) => [...prev, ...(data?.getUserChatMessages?.messages || [])]);
      setHasMore(data?.getUserChatMessages?.hasMore ?? false);
    },
  });

  useFocusEffect(
    useCallback(() => {
      if(routeParams?.recipientId){
        fetchUserChat({
          variables: {
            input: {
              recipientId: routeParams.recipientId,
            },
          },
        });
        return;
      }
      if (routeParams?.userData?.id) {
        fetchUserChat({
          variables: {
            input: {
              id: routeParams.userData.id,
              // recipientId: routeParams.userData.id,
            },
          },
        });
      }
    },[routeParams])
  )

  const loadMoreMessages = () => {
    if (hasMore && usersChat?.chatId) {
      fetchMore({
        variables: {
          input: {
            chatId: usersChat.chatId,
            page: page + 1,
            limit: 10,
          },
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          const newMessages = fetchMoreResult.getUserChatMessages.messages;
          setMessages((prev) => [...prev, ...newMessages]);
          setPage((prev) => prev + 1);
          setHasMore(fetchMoreResult.getUserChatMessages.hasMore);
          return fetchMoreResult;
        },
      });
    }
  };

  useEffect(() => {
    socket.current = io("https://api-dev.peerhub.in?userId=" + userId, {
      extraHeaders: {
        Authorization: token,
      },
    });

    return () => {
      socket.current!.disconnect();
      socket.current = null;
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      socket.current!.emit("chats/join/pub", {
        chatId: usersChat?.chatId,
        userId,
      });
    }
  }, [isFocused, usersChat]);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: usersChat?.id,
      userId,
      text: inputMessage,
    };

    socket.current!.emit("userChats/messages/pub", newMessage);
    setInputMessage('');
    setInputHeight(hp(5)); // Reset input height
    scrollToBottom(); // Scroll to bottom after sending
  };

  const backScreen = () => {
    socket.current!.emit("chats/leave/pub", {
      chatId: usersChat?.chatId,
      userId,
    });
    socket.current!.disconnect();
    setPage(1);
    setHasMore(true);
    setMessages([]);
    navigation.goBack();
  };

  // Add this memoized grouping
  const groupedMessages = useMemo(() => 
    groupMessagesByDate(messages), [messages]
  );

  // Update the renderMessage function to handle grouped messages
  const renderMessageGroup = ({ item: [date, dateMessages] }: { item: [string, any[]] }) => (
    <View>
      <View style={styles.dateHeader}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      {dateMessages.map((message: any) => (
        <View
          key={message.id}
          style={[
            styles.messageContainer,
            message.userId == userId ? styles.sender : styles.receiver,
          ]}
        >
          {message.userId !== userId && (
            <Pressable onPress={() => takeToProfile(chatData?.getUserChat?.userChat?.userId)}>
              <FastImage 
                source={{ 
                  uri: isValidImageUrl(message?.user?.profilePicId) ? message.user?.profilePicId : getDummyProfile(message.user?.name) 
                }} 
                style={styles.profilePic} 
              />
            </Pressable>
          )}
          <View style={message.userId == userId ? styles.messageBubbleSender : styles.messageBubble}>
            <Text style={message.userId == userId ? styles.messageTextSender : styles.messageText}>
              {message.text}
            </Text>
            <Text style={message.userId == userId ? styles.messageTimeSender : styles.messageTime}>
              {moment(new Date(message.createdAt)).format('hh:mm A')}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        socket.current!.emit("chats/leave/pub", {
          chatId: usersChat?.chatId,
          userId,
        });
        socket.current!.disconnect();
        navigation.goBack()
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    socket.current!.on("userChats/messages/sub", (msg: any) => {
      setMessages((prevMessages) => [msg.message, ...prevMessages]);
      scrollToBottom();
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={backScreen} style={styles.backContainer}>
          <Back />
        </Pressable>
        <Pressable style={{flexDirection:'row', alignItems:'center'}} onPress={() => takeToProfile(chatData?.getUserChat?.userChat?.userId)}>
          <FastImage 
            source={{ 
              uri: profilePicId?.length ? profilePicId : getDummyProfile(usersChat?.name ?? '') 
            }} 
            style={styles.profilePic} 
          />
          <Text style={styles.title}>{usersChat?.name}</Text>
        </Pressable>

      </View>

      {/* Chat List */}
      <FlatList
        ref={flatListRef}
        data={Object.entries(groupedMessages).reverse()}
        renderItem={renderMessageGroup}
        keyExtractor={(item) => item[0]}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.1}
        inverted
        ListFooterComponent={isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : null}
        contentContainerStyle={styles.messagesContainer}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Smile />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { height: Math.max(hp(5), inputHeight) }]}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          placeholderTextColor="#BEBAB9"
          multiline
          onContentSizeChange={(event) => {
            const height = event.nativeEvent.contentSize.height;
            setInputHeight(Math.min(height, hp(15))); // Cap the height at 15% of screen height
          }}
        />
        <TouchableOpacity style={styles.iconButton}>
          <File />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Send />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Message;
