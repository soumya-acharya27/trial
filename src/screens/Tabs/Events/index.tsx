import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles';
import { useQuery } from '@apollo/client'
import { GetEventsPageData, GetEventsPageVars } from '../../../interface/eventinterface'
import { GET_EVENTS_PAGE } from '../../../graphql/events/eventQuery'
import { RootState } from '../../../redux-saga/rootReducer'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TrendingCard from './components/TrendingCard'
import UpComingCard from './components/UpComingCard'
import EventHeader from './components/EventHeader'
import { updateLocation } from '../../../redux-saga/club/clubAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOCATION_STORAGE } from '../../../constants'

const Events = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const credentials = useSelector((state: RootState) => state.authReducer)
  const location = useSelector((state: RootState) => state.clubReducer.location)

  const { data, loading, error, refetch } = useQuery<GetEventsPageData, GetEventsPageVars>(
    GET_EVENTS_PAGE,
    {
      variables: { input: { limit: 5, page: 1, regionId: location?.id ?? null } },
      fetchPolicy: "cache-and-network",
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      },
      onCompleted: (res) => {
      }
    }
  );

  useEffect(() => {
    refetch()
  }, [location?.id])

  useEffect(() => {
    if(location?.id === '' && data?.getEventsPage?.location){
      dispatch(updateLocation({id: data?.getEventsPage?.location?.id, name: data?.getEventsPage?.location?.name}))
      AsyncStorage.setItem(LOCATION_STORAGE, JSON.stringify({id: data?.getEventsPage?.location?.id, name: data?.getEventsPage?.location?.name}))
    }
  },[data?.getEventsPage?.location])

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

  const eventsDate = [
    {
      id: '1',
      title: 'Today',
    },
    {
      id: '2',
      title: 'Tomorrow',
    },
    {
      id: '3',
      title: 'This Weekend',
    },
  ];

  const EventDateCard = ({ event }: { event: { title: string } }) => (
    <View style={styles.dateContainer}>
      <Text style={styles.titleDate}>{event.title}</Text>
    </View>
  );

  const handleSeeAll = (type: 'trending' | 'upcoming') => {
    navigation.navigate('EventListing', {
      type,
      events: type === 'trending'
        ? data?.getEventsPage?.trending?.events ?? []
        : data?.getEventsPage?.upcoming?.events ?? []
    });
  };

  return (
    <SafeAreaView style={styles.body}>
      <EventHeader onBack={() => navigation.goBack()} />

      {
        loading ? <ActivityIndicator color={"white"} size={"large"} style={{ marginTop: hp(5) }} /> : (
          <>
            {data?.getEventsPage?.trending?.events?.length && <><View style={styles.titleContainer2}>
              <Text style={styles.nameText}>{"Trending Events"}</Text>
              <TouchableOpacity onPress={() => handleSeeAll('trending')}>
                <Text style={styles.SeeAllText}>{"See All"}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <FlatList
                data={data?.getEventsPage?.trending?.events ?? []}
                horizontal
                style={styles.treadingContainer}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TrendingCard event={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </View></>}

            {/* <View style={styles.titleContainer}>
              <Text style={styles.nameText}>{"Discover events by date"}</Text>
            </View>

            <View>
              <FlatList
                data={eventsDate}
                horizontal
                style={styles.treadingContainer}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <EventDateCard event={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </View> */}

            {data?.getEventsPage?.upcoming?.events?.length && <><View style={styles.titleContainer2}>
              <Text style={styles.nameText}>{"Upcoming events"}</Text>
              <TouchableOpacity onPress={() => handleSeeAll('upcoming')}>
                <Text style={styles.SeeAllText}>{"See All"}</Text>
              </TouchableOpacity>
            </View>

            <View>
              <FlatList
                data={data?.getEventsPage?.upcoming?.events ?? []}
                horizontal
                contentContainerStyle={{ paddingBottom: 200 }}
                style={[styles.treadingContainer, { paddingBottom: 100 }]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <UpComingCard event={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </View></>}
            {(data?.getEventsPage?.upcoming?.events ?? [])?.length === 0 && (data?.getEventsPage?.trending?.events ?? [])?.length === 0 && <View style={styles.emptyContainer}>
                <Text style={styles.comingSoonTxt}>Coming Soon</Text>
              </View>}
          </>
        )
      }
    </SafeAreaView>
  )
}

export default Events

//ticket screen -> ui done
// my events
//search in eventListing