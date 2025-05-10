import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import Back from '../../assets/svg/Back.svg';
import { useNavigation } from '@react-navigation/native';

interface CommonHeaderProps {
  title: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back height={hp(2.5)} width={hp(2.5)} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CommonHeader; 