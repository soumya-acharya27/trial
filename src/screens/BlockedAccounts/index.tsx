import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, BackHandler, Text } from 'react-native';
import { styles } from './styles';
import { gql, useQuery } from '@apollo/client';
import { BlockedUserItem, GetBlockedUsersListResponse, GetBlockedUsersListVariables } from '../../interface/clubinterface';
import BlockedUserCard from './components/BlockedUserCard';
import { RootState } from '../../redux-saga/rootReducer';
import { useSelector } from 'react-redux';
import CommonHeader from '../../components/CommonHeader';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

const GET_BLOCKED_USERS = gql`
  query GetBlockedUsersList($limit: Int!, $page: Int!) {
    getBlockedUsersList(limit: $limit, page: $page) {
      hasMore
      blockedUsers {
        blockedUserId
        id
        isBlocked
        userId
        blockedUser {
          id
          isDMEnabled
          name
          profilePicId
          userName
        }
      }
    }
  }
`;

const BlockedAccounts = () => {
  const [blockedList, setBlockedList] = useState<BlockedUserItem[]>([]);
  const credentials = useSelector((state: RootState) => state.authReducer);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const { loading, data, fetchMore } = useQuery<GetBlockedUsersListResponse, GetBlockedUsersListVariables>(
    GET_BLOCKED_USERS,
    {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      },
      variables: {
        limit: 20,
        page: 1
      },
      onCompleted: (data) => {
        setBlockedList(data.getBlockedUsersList.blockedUsers);
      },
      onError: (res) => {
        console.log("res ", res)
      }
    }
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
  }, [navigation]);

  const handleLoadMore = () => {
    if (data?.getBlockedUsersList.hasMore && !loading) {
      const nextPage = page + 1;
      fetchMore({
        variables: {
          page: nextPage,
          limit: 20
        }
      }).then(({ data: newData }) => {
        if (newData?.getBlockedUsersList) {
          setBlockedList(prev => [...prev, ...newData.getBlockedUsersList.blockedUsers]);
          setPage(nextPage);
        }
      });
    }
  };

  const handleUnblock = (userId: string) => {
    setBlockedList(prev => prev.filter(user => user.blockedUserId !== userId));
  };

  const renderItem = ({ item }: { item: BlockedUserItem }) => (
    <BlockedUserCard 
      user={item.blockedUser}
      onUnblock={() => handleUnblock(item.blockedUserId)}
    />
  );

  if (loading && !blockedList.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CommonHeader title="Blocked Account" />
        <FlatList
          data={blockedList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
              !loading && <Text style={{color:'white', fontSize: 16, fontFamily: theme.fontFamily.regular, textAlign:'center', marginTop: 50}}>No Blocked User</Text>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loading ? <ActivityIndicator color="white" /> : null}
        />
    </View>
  );
};

export default BlockedAccounts; 