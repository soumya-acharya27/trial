import React, { useEffect } from 'react';
import { View, FlatList, BackHandler, Text } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import PostCard from '../Tabs/Dashboard/components/PostCard';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const MyCampus = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CommonHeader title="My Campus" />
      <View style={{height: heightPercentageToDP(60), justifyContent:'center'}}>
        <Text style={{color:'white', fontSize: 16, fontFamily: theme.fontFamily.regular, textAlign:'center'}}>Coming soon</Text>
      </View>
    </View>
  );
};

export default MyCampus;