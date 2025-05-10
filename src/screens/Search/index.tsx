import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, ActivityIndicator, BackHandler } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Back from '../../assets/svg/arrowleft.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDummyProfile } from '../../utils';
import Close from '../../assets/svg/Close.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GetClubsInput, GetClubsResponse, GetPostsInput, GetPostsResponse } from '../../interface/clubinterface';
import { GET_POSTS_MUTATION } from '../../graphql/user/userMutation';
import { GET_CLUBS } from '../../graphql/clubs/clubsQuery';
import { useGetEvents } from '../../hooks/useGetEvents';
import { GetEventsData, GetEventsVars } from '../../interface/eventinterface';
import { GET_EVENTS } from '../../graphql/events/eventQuery';
import { SEARCH_HOME } from '../../graphql/search/searchQuery';
import { SearchHomeInput, SearchHomeResponse } from '../../interface/searchinterface';
import debounce from 'lodash/debounce';
import { theme } from '../../theme';

interface SearchItemProps {
  name: string;
  username?: string;
  imageId: string;
  id: string;
  type: 'club' | 'user' | 'event'
}

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {type} = useRoute()?.params as {type: 'CLUB' | 'EVENT' | 'POST'};
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<SearchItemProps[]>([]);
  const [searchResult, setSearchResult] = useState<SearchItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state: RootState) => state.authReducer.accessToken);

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          navigation.goBack()
          return true;
        },
      );
      return () => {
        backHandler.remove();
      };
    }, []);

  const [getPosts] = useMutation<GetPostsResponse, { input: GetPostsInput }>(GET_POSTS_MUTATION, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  });

  const [fetchClubs] = useLazyQuery<GetClubsResponse, { input: GetClubsInput }>(
    GET_CLUBS,
    {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        }
      },
    }
  );

  const [fetchEvents] = useLazyQuery<GetEventsData, GetEventsVars>(
    GET_EVENTS,
    {
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const [searchHome] = useLazyQuery<SearchHomeResponse, { input: SearchHomeInput }>(
    SEARCH_HOME,
    {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        }
      },
    }
  );

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResult([]);
        return;
      }

      setLoading(true);
      try {
        switch (type) {
          case 'POST':
            const { data: searchHomeData } = await searchHome({
              variables: {
                input: {
                  limit: 15,
                  page: 1,
                  search: query,
                },
              },
            });
            const userSearch = searchHomeData?.searchHome?.usersOutput?.userList?.map(user => ({
              id: user.id,
              name: user.name,
              username: user.userName,
              imageId: user.profilePicId || '',
              type:'user',
            })) || []

            const clubSearch = searchHomeData?.searchHome?.clubsOutput?.clubs?.map(club => ({
              id: club.id,
              name: club.name,
              imageId: club.imageUrl || '',
              type:'club',
            })) || []
            setSearchResult([...userSearch, ...clubSearch]);
            break;

          case 'CLUB':
            const { data: clubsData } = await fetchClubs({
              variables: {
                input: {
                  limit: 15,
                  page: 1,
                  search: query,
                },
              },
            });
            setSearchResult(
              clubsData?.getClubs?.clubs?.map(club => ({
                id: club.id,
                name: club.name,
                imageId: club.imageUrl || '',
                type:'club'
              })) || []
            );
            break;

          case 'EVENT':
            const { data: eventsData } = await fetchEvents({
              variables: {
                input: {
                  limit: 15,
                  page: 1,
                  search: query,
                },
              },
            });
            setSearchResult(
              eventsData?.getEvents?.events?.map(event => ({
                id: event.id,
                name: event.name,
                imageId: event.imageId || '',
                type:'event'
              })) || []
            );
            break;
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 1000),
    [type, searchHome, fetchClubs, fetchEvents]
  );

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  const handleItemPress = (item: SearchItemProps) => {
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(search => search.id !== item.id);
      return [item, ...filtered].slice(0, 10); // Keep only last 10 searches
    });

    // Navigate based on type
    switch (type) {
      case 'POST':
        if(item?.type === 'user')
          navigation.navigate('profile', { userId: item.id });
        else if(item?.type === 'club')
          navigation.navigate('clubdetails', { clubId: item.id });
        break;
      case 'CLUB':
        navigation.navigate('clubdetails', { clubId: item.id });
        break;
      case 'EVENT':
        navigation.navigate('Eventdetails', { eventId: item.id });
        break;
    }
  };

  const RenderSearchItem = ({ item, showCancel = false }: { item: SearchItemProps, showCancel?: boolean }) => (
    <TouchableOpacity 
      style={styles.searchItemContainer}
      onPress={() => handleItemPress(item)}
    >
      <View style={styles.searchItemLeft}>
        <FastImage
          source={{ uri: item.imageId || getDummyProfile(item.name) }}
          style={styles.searchItemImage}
        />
        <View style={styles.searchItemTextContainer}>
          <Text style={styles.searchItemName}>{item.name}</Text>
          {item?.username && <Text style={styles.searchItemUsername}>@{item.username}</Text>}
        </View>
      </View>
      {showCancel && (
        <TouchableOpacity 
          onPress={() => removeFromRecent(item)}
          style={styles.removeButton}
        >
          <Close height={20} width={20} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const removeFromRecent = (item: SearchItemProps) => {
    setRecentSearches(prev => prev.filter(search => search.id !== item.id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search {type === 'POST' ? '' : type.charAt(0) + type.slice(1).toLowerCase()+ 's'}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${type === 'POST' ? '' : type.charAt(0) + type.slice(1).toLowerCase()+ 's'}`}
          placeholderTextColor="#BEBAB9"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.orange} />
        </View>
      ) : (
        <>
          {searchQuery === '' && recentSearches.length > 0 && (
            <View style={styles.recentContainer}>
              <Text style={styles.recentTitle}>Recent searches</Text>
              <FlatList
                data={recentSearches}
                renderItem={({ item }) => <RenderSearchItem item={item} showCancel />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          )}

          {searchQuery !== '' && (
            <View style={styles.recentContainer}>
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={searchResult}
                renderItem={({ item }) => <RenderSearchItem item={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={() => (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No results found</Text>
                  </View>
                )}
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen; 