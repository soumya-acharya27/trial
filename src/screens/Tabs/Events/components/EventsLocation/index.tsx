import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { styles } from './styles';
import Back from '../../../../../assets/svg/Back.svg';
import SearchIcon from '../../../../../assets/svg/search.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import EventHeader from '../EventHeader';
import { useLazyQuery } from '@apollo/client';
import { GET_LOCATIONS } from '../../../../../graphql/events/eventQuery';
import { GetLocationsData, GetLocationsVars } from '../../../../../interface/eventinterface';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../../../../../redux-saga/club/clubAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATION_STORAGE } from '../../../../../constants';
import { RootState } from '../../../../../redux-saga/rootReducer';

const EventsLocation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const credentials = useSelector((state: RootState) => state.authReducer);

  const [getLocations, { data }] = useLazyQuery<GetLocationsData, GetLocationsVars>(
    GET_LOCATIONS,
    {
      context: {
        headers: {
          authorization: `Bearer ${credentials?.accessToken}`,
        }
      }
    }
  );

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (text.length > 0) {
        getLocations({
          variables: {
            input: {
              limit: 20,
              page: 1,
              search: text
            }
          }
        });
      }
    }, 500),
    []
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  const handleLocationSelect = async (location: { id: string; name: string }) => {
    dispatch(updateLocation({ id: location.id, name: location.name }));
    await AsyncStorage.setItem(LOCATION_STORAGE, JSON.stringify({ id: location.id, name: location.name }));
    navigation.goBack();
  };

  const renderLocation = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity 
      style={styles.locationItem} 
      onPress={() => handleLocationSelect(item)}
    >
      <Text style={styles.locationText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => {
    if (searchText.length === 0) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <EventHeader showLocation={false} onBack={() => navigation.goBack()} />

      <View style={styles.searchContainer}>
        <SearchIcon width={20} height={20} style={styles.searchIcon} />
        <TextInput
          placeholder="Search for your city"
          placeholderTextColor="#A0A0A0"
          style={styles.input}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={data?.getLocations.locations ?? []}
        renderItem={renderLocation}
        keyExtractor={item => item.id}
        style={styles.locationsList}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={renderEmptyComponent}
      />
    </SafeAreaView>
  );
};

export default EventsLocation; 