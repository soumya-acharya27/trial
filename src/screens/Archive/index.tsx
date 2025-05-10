import React, { useEffect } from 'react';
import { View, BackHandler, Text } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import PostCard from '../Tabs/Dashboard/components/PostCard';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { theme } from '../../theme';

const Archive = () => {
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
      <CommonHeader title="Archive" />
      <View style={{height: heightPercentageToDP(60), justifyContent:'center'}}>
        <Text style={{color:'white', fontSize: 16, fontFamily: theme.fontFamily.regular, textAlign:'center'}}>Coming soon</Text>
      </View>
      {/* <FlatList
        data={[]}
        renderItem={({ item }) => <PostCard item={item} />}
        contentContainerStyle={styles.content}
      /> */}
    </View>
  );
};

export default Archive; 