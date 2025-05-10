import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { styles } from './styles';
import Calander from '../../../../../assets/svg/calendartickw.svg';
import Location from '../../../../../assets/svg/location.svg';
import { Event } from '../../../../../interface/eventinterface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { isValidImageUrl } from '../../../../../utils';

interface UpComingCardProps {
  event: Event
  listingPage?: boolean;
}

const UpComingCard: React.FC<UpComingCardProps> = ({ event, listingPage=false }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePress = () => {
    navigation.navigate('EventDetails', { eventId: event?.id });
  };
  return(
  <TouchableOpacity onPress={handlePress} style={[styles.upcomingCard, listingPage && {width: widthPercentageToDP(92)}]}>
      <Text style={styles.category}>{event.domain}</Text>
      <ImageBackground
        source={ event?.imageId && isValidImageUrl(event?.imageId)  ? {  uri: event.imageId} : require("../../../../../assets/png/defaultImage.png") } 
        style={styles.image}>
        <View style={styles.dateBadge}>
          <Calander />
          <Text style={styles.dateText}>{format(new Date(event?.scheduleTime), 'dd MMM yyyy')}</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.title}>{event.name}</Text>
        <View style={styles.locationContainer}>
          <Location />
          <Text style={styles.location}>{event?.location ?? 'Location default'}</Text>
        </View>
      </View>
    </TouchableOpacity>
)};

export default UpComingCard; 