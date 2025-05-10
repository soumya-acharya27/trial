import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ButtonCustom } from '../../../../component/ButtonCustom';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

interface EventCardProps {
  name: string;
  imageUrl: string;
  onPress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ name, imageUrl, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <FastImage
          source={!!imageUrl?.length ? { 
            uri: imageUrl,
            priority: FastImage.priority.normal,
          } : require("../../../../assets/svg/image.png")}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={require("../../../../assets/svg/image.png")}
        />
      <Text style={styles.title}>{name}</Text>
      <ButtonCustom 
        title='View Event'
        onPress={onPress}
        width={'100%'}
      />
    </View>
  );
};

export default EventCard;
