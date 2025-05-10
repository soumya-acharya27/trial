import { useLazyQuery, useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  BackHandler,
} from 'react-native';
import { GetUserChatsInput, GetUserChatsResponse, UserChat } from '../../interface/msginerface';
import { GET_MESSAGE_LIST, GET_USER_CHAT } from '../../graphql/message/msgQuery';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';
import {styles} from './styles'
import Back from '../../assets/svg/arrowleft.svg';
import moment from "moment";
import { getDummyProfile } from '../../utils';
import { Socket, io } from 'socket.io-client';
import { logger } from '../../utils/logger';


const MessageList = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
  const userId = useSelector((state: RootState) => state.authReducer.id);
  let socket = useRef<Socket | null>(null);
  const [chats, setChats] = useState<UserChat[]>([]);
  
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const [fetchUserChats, { loading, data, error }] = useLazyQuery<
    GetUserChatsResponse,
    GetUserChatsInput
  >(GET_MESSAGE_LIST, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    },
  });

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
    const handleIncomingMessage = (msg: any) => {
      setChats(prevChats => {
        const existingIndex = prevChats.findIndex(chat => chat.chatId === msg?.message?.chatId);
        if (existingIndex !== -1) {
          const updatedMessage = { 
            ...prevChats[existingIndex], 
            message: msg?.message,
            updatedAt: msg?.message?.updatedAt 
          };
          const updatedChats = [
            updatedMessage,
            ...prevChats.filter((_, index) => index !== existingIndex)
          ];
          return updatedChats;
        }
        return prevChats;
      });
    };

    socket.current!.on("users/userChats/updates/sub", handleIncomingMessage);

    return () => {
      socket.current!.off("users/userChats/updates/sub", handleIncomingMessage);
    }; 
  }, [chats]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('dashboard', { screen: 'listing' });
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const loadChats = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const { data } = await fetchUserChats({
        variables: {
          input: {
            lastMessage: true,
            page,
            limit: 10,
          },
        },
        
      });

      if (data?.getUserChats) {
        setChats((prevChats) => [...prevChats, ...data.getUserChats.userChats]);
        setHasMore(data.getUserChats.hasMore);
      }
    } catch (err) {
      console.error('Error fetching chats:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setChats([]);
      setPage(1)
      setHasMore(true)
      loadChats();
    },[])
  )

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const renderItem = ({item}: {item: UserChat}) => (
    <TouchableOpacity style={styles.messageRow} onPress={() => { 
      navigation.navigate('message',{userData:item}) }}>
      <Image source={{ uri: item?.photo ?? getDummyProfile(item?.name) }} style={styles.profileImage} />
      <View style={styles.messageInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.message}>{item.message?.text}</Text>
      </View>
      <Text style={styles.time}>{moment(new Date(item.updatedAt)).format('hh:mm')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.chatId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={loadingMore}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate('dashboard', { screen: 'listing' })} style={styles.backContainer}>
              <Back />
            </Pressable>
            <Text style={styles.title}>Messages</Text>
          </View>
        )}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator style={{marginTop: 20}} size="large" color="white" /> : null
        }
      />
    </View>
  );
};

export default MessageList;