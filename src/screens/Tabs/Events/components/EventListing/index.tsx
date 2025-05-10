import React from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { styles } from './styles';
import { Event } from '../../../../../interface/eventinterface';
import TrendingCard from '../TrendingCard';
import UpComingCard from '../UpComingCard';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EventHeader from '../EventHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux-saga/rootReducer';
import { useGetEvents } from '../../../../../hooks/useGetEvents';

type EventListingParams = {
  type: 'trending' | 'upcoming';
};

type RootStackParamList = {
  EventListing: EventListingParams;
};

type EventListingRouteProp = RouteProp<RootStackParamList, 'EventListing'>;

const EventListing = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<EventListingRouteProp>();
  const { type } = route.params;

  const credentials = useSelector((state: RootState) => state.authReducer);
  const location = useSelector((state: RootState) => state.clubReducer.location);

  const {
    data,
    loading,
    error,
    page,
    handleLoadMore,
  } = useGetEvents({
    token: credentials?.accessToken,
    regionId: location?.id,
    type,
  });

  const renderEvent = ({ item }: { item: Event }) => {
    if (type === 'trending') {
      return <TrendingCard event={item} />;
    }
    return <UpComingCard event={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <EventHeader onBack={() => navigation.goBack()} />

      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      ) : (
        <FlatList
          data={data?.getEvents.events ?? []}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          style={styles.list}
          ItemSeparatorComponent={() => <View style={{height: 15}}/>}
          numColumns={type === 'trending' ? 2 : 1}
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
          ListEmptyComponent={(
            <View style={styles.emptyContainer}>
              <Text style={styles.comingSoonTxt}>Coming Soon</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default EventListing;
