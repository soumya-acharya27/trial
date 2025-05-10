import React, { useCallback, useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, BackHandler } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import { GET_USER_REGISTERED_EVENTS } from '../../graphql/events/eventQuery';
import { useQuery } from '@apollo/client';
import { Event, GetUserRegisteredEventsData, GetUserRegisteredEventsVars } from '../../interface/eventinterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';
import EventCard from './components/MyEventCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import EventCard from '../Tabs/Events/components/EventCard';

const MyEvents = () => {
  const credentials = useSelector((state: RootState) => state.authReducer);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [page, setPage] = useState(1);
  const { data, loading, error, fetchMore } = useQuery<GetUserRegisteredEventsData, GetUserRegisteredEventsVars>(
    GET_USER_REGISTERED_EVENTS,
    {
      variables: {
        input: {
          limit: 20,
          page: 1,
        },
      },
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      },
      fetchPolicy: 'network-only',
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
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!loading && data?.getUserRegisteredEvents.hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);

      fetchMore({
        variables: {
          input: {
            limit: 20,
            page: nextPage,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            getUserRegisteredEvents: {
              ...fetchMoreResult.getUserRegisteredEvents,
              events: [
                ...prev.getUserRegisteredEvents.events,
                ...fetchMoreResult.getUserRegisteredEvents.events,
              ],
            },
          };
        },
      });
    }
  }, [loading, data?.getUserRegisteredEvents.hasMore, page]);

  const renderListCard = ({ item }: { item: Event }) => {
    return (
      <EventCard
        name={item.name}
        imageUrl={item?.imageId} // replace with your image CDN
        onPress={() => {
          navigation.navigate('Eventdetails', {eventId: item?.id})
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
      <CommonHeader title="My Events" />
      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <FlatList
          data={data?.getUserRegisteredEvents?.events ?? []}
          renderItem={({ item, index }) => renderListCard({ item })}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.bottom}
          numColumns={2}
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
        />)}
    </View>
  );
};

export default MyEvents; 