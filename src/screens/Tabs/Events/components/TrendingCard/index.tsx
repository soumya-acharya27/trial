import React from 'react';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Event } from '../../../../../interface/eventinterface';
import { isValidImageUrl } from '../../../../../utils';

interface TrendingCardProps {
  event: Event
  listingPage?: boolean;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ event, listingPage=false }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePress = () => {
    navigation.navigate('EventDetails', { eventId: event?.id });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <ImageBackground source={ event?.imageId && isValidImageUrl(event?.imageId)  ? {  uri: event.imageId} : require("../../../../../assets/png/defaultImage.png") } style={[styles.card, listingPage && {marginRight: 0, width: widthPercentageToDP(44)}]}>
        <Text style={styles.title}>{event.name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TrendingCard; 