import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Header from '../../../component/Header'
import { styles } from './styles'
import ClubTab from '../../../component/ClubTab'
import ClubGroup from '../../../component/ClubGroupTab'
import ClubListCard from '../../../component/ClubListCard'
import { RootState } from '../../../redux-saga/rootReducer'
import { clubCategories } from '../../../redux-saga/club/clubModel'
import { Club, GetClubCategoriesResponse, GetClubsInput, GetClubsResponse } from '../../../interface/clubinterface'
import { useLazyQuery } from '@apollo/client'
import { GET_CLUBS } from '../../../graphql/clubs/clubsQuery'
import { errorMessage, paginationLimit, showErrorToast } from '../../../utils'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useGetEvents } from '../../../hooks/useGetEvents'
import Search from '../../../assets/svg/search.svg'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

const Clubs = () => {
  const dispatch = useDispatch()
  const credentials = useSelector((state: RootState) => state.authReducer)
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {clubCategoryLoading, clubCategories} = useSelector((state: RootState) => state.clubReducer)
  const [selectedTab, setSelectedTeb] = useState(clubCategories?.[0] ?? '');
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const [clubs, setClubs] = useState<Club[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchClubs, { loading: clubsLoading, error: clubsError, data: clubsData }] = useLazyQuery<GetClubsResponse, { input: GetClubsInput }>(
    GET_CLUBS,
    {
      fetchPolicy: 'network-only', // Ensures fresh data for pagination
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      },
    }, 
  );

  const fetchNextPage = () => {
    if (!hasMore || clubsLoading) return;

    fetchClubs({
      variables: {
        input: {
          page,
          limit: paginationLimit,
          category: selectedTab?.category ?? ''
        },
      },
    }).then(response => {
      if (response?.data?.getClubs) {
        const moreClubs = response?.data?.getClubs?.clubs ?? []
        setInitialLoadComplete(true)
        setClubs(prev => [...prev, ...moreClubs]);
        setHasMore(response.data.getClubs.hasMore);
        setPage(prev => prev + 1);
      }else{
        throw new Error('')
      }
    }).catch((err) => {
      console.log(err);
      showErrorToast(errorMessage)
    });
  };

  const fetchInitialData = () => {
    setClubs([]);
    setPage(1);
    setHasMore(true);
    setInitialLoadComplete(false);
    fetchClubs({
      variables: {
        input: {
          page: 1,
          limit: paginationLimit,
          category: selectedTab?.category ?? ''
        },
      },
    }).then(response => {
      if (response?.data?.getClubs) {
        const initialClubs = response?.data?.getClubs?.clubs ?? []
        setInitialLoadComplete(true)
        setClubs(initialClubs);
        setHasMore(response.data.getClubs.hasMore);
        setPage(2);
      }else{
        throw new Error('')
      }
    }).catch((err) => {
      console.log(err);
      showErrorToast(errorMessage)
    });
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchInitialData();
  //   },[selectedTab])
  // );

  useEffect(() => {
    fetchInitialData();
  }, [selectedTab])

  useEffect(() => {
    setSelectedTeb(clubCategories?.[0])
  },[clubCategories])

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

  // FastImage cache cleanup on unmount
  useEffect(() => {
    return () => {
      FastImage.clearMemoryCache();
      FastImage.clearDiskCache();
    };
  }, []);

  const renderCard = useCallback(
    ({ item, index }: { item: clubCategories, index: number }) => {
      return(
        <ClubTab
          data={item}
          title={item?.slug}
          selectedTab={selectedTab}
          categoryChange={(data:clubCategories) => {
            setPage(1)
            setHasMore(true)
            setClubs([])
            setInitialLoadComplete(false)
            setSelectedTeb(data)
          }}
        />
    )},
    [selectedTab, clubCategories],
  );

  // Memoize heavy components
  const MemoizedClubListCard = useMemo(() => ClubListCard, []);

  const renderListCard = useCallback(
    ({ item, index }: { item: Club, index: number }) => (
      <MemoizedClubListCard
        setClubs={setClubs}
        data={item}
        SelectedValue={(item) => navigation.navigate('clubdetails', {clubId: item?.id})}
       />
    ),
    [selectedTab],
  );


  const renderFooter = () => {
    if (!hasMore || !!clubsError) return null;
      return <ActivityIndicator size="small" color="white" style={{ marginVertical: 10 }} />;
    };

    if (clubCategoryLoading && page === 1) {
      return <ActivityIndicator size="large" color="white" />;
    }


  // const renderGroupCard = useCallback(
  //   ({ item, index }: { item: any, index: number }) => (
  //     <ClubGroup
  //       data={item}
  //       selectedGroupTab={selectedGroupTab}
  //       setSelectedGroupTeb={setSelectedGroupTeb}
  //       SelectedValue={(item) => setSelectedGroupTeb(item)} />
  //   ),
  //   [selectedGroupTab],
  // );

  return (
    <View style={styles.container} >
      <View style={styles.headerContainer}>
        <Header name={"Clubs"} onBack={() => navigation.navigate('dashboard', { screen: 'listing', })}/>
        <TouchableOpacity 
          style={styles.searchButton} 
          onPress={() => navigation.navigate('search', { type: 'CLUB' })}
        >
          <Search width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        {clubCategories?.length > 0 && <FlatList
          data={clubCategories}
          keyExtractor={(item) => item?.slug}
          renderItem={({ item, index }) => renderCard({ item, index })}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginBottom: hp(2)}}
        />}

        {clubsLoading && page === 1 ? <ActivityIndicator size="large" color="white" /> :
        <FlatList
          showsVerticalScrollIndicator={false}
          data={clubs}
          keyExtractor={(item) => item?.id}
          renderItem={({ item, index }) => renderListCard({ item, index })}  
          contentContainerStyle={{paddingBottom: hp(14)}}
          onEndReached={() => {
            initialLoadComplete && fetchNextPage()
          }}
          onEndReachedThreshold={0.5} // Trigger fetch when scrolled 50% close to the bottom
          ListFooterComponent={renderFooter}
        />}
      </View>
    </View>
  )
}

export default Clubs