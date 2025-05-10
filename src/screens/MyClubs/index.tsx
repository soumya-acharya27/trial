import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, BackHandler } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import { GET_USER_JOINED_CLUBS } from '../../graphql/clubs/clubsMutation';
import { useQuery } from '@apollo/client';
import { Club, GetUserJoinedClubsData, GetUserJoinedClubsVars } from '../../interface/clubinterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';
import ClubListCard from '../../component/ClubListCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const MyClubs = () => {
  const credentials = useSelector((state: RootState) => state.authReducer);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [clubs, setClubs] = useState<Club[]>([])
  const { data, loading, error, fetchMore } = useQuery<GetUserJoinedClubsData, GetUserJoinedClubsVars>(
    GET_USER_JOINED_CLUBS,
    {
      fetchPolicy: 'network-only', // Ensures fresh data for pagination
      variables: {
        limit: 20,
        page: 1,
        userId: credentials.userInfo?.id
      },
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      }
    }
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data?.getUserJoinedClubs.clubs && page === 1) {
      setClubs(data.getUserJoinedClubs.clubs);
    }
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (!loading && data?.getUserJoinedClubs.hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);

      fetchMore({
        variables: {
          limit: 20,
          page: nextPage,
          userId: credentials.userInfo?.id
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          setClubs(prevClubs => [...prev.getUserJoinedClubs.clubs,
            ...fetchMoreResult.getUserJoinedClubs.clubs]);

          return {
            getUserJoinedClubs: {
              ...fetchMoreResult.getUserJoinedClubs,
              clubs: [
                ...prev.getUserJoinedClubs.clubs,
                ...fetchMoreResult.getUserJoinedClubs.clubs
              ],
            },
          };
        }
      });
    }
  }, [loading, data?.getUserJoinedClubs.hasMore, page]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const renderListCard = useCallback(
    ({ item, index }: { item: Club, index: number }) => (
      <ClubListCard
        setClubs={setClubs}
        data={item}
        SelectedValue={(item) => navigation.navigate('clubdetails', {clubId: item?.id})}
       />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <CommonHeader title="My Clubs" />
      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <FlatList
          data={clubs ?? []}
          renderItem={({ item, index }) => renderListCard({ item, index })}  
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.bottom}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && page > 1 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#FFFFFF" />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default MyClubs; 