import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Back from '../../../../../assets/svg/Back.svg';
import Search from '../../../../../assets/svg/search.svg';
import ArrowDown from '../../../../../assets/svg/arrowdown.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux-saga/rootReducer';

interface EventHeaderProps {
  onBack: () => void;
  showLocation?: boolean;
}

const EventHeader: React.FC<EventHeaderProps> = ({ onBack, showLocation = true }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const location = useSelector((state: RootState) => state.clubReducer.location)

  const handleLocationPress = () => {
    navigation.navigate('EventsLocation');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={onBack}>
          <Back height={hp(2.5)} width={hp(2.5)} />
        </TouchableOpacity>
        <Text style={styles.nameText}>{"Events"}</Text>
        {showLocation && location?.id !== '' && (
          <TouchableOpacity 
            style={styles.locationContainer} 
            onPress={handleLocationPress}
          >
            <Text style={styles.dropText}>{location?.name}</Text>
            <ArrowDown />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.searchIcon} onPress={() => navigation.navigate('search', { type: 'EVENT' })}>
        <Search height={hp(2.5)} width={hp(2.5)} />
      </TouchableOpacity>
    </View>
  );
};

export default EventHeader; 