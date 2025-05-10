import { View, Text, Pressable, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import Clock from "../../assets/svg/clock.svg"
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { ButtonSecondary } from '../../component/ButtonCustom'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const PendingProfileVerify = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);  return (
    <View style={styles.container}>
        <Clock height={heightPercentageToDP(4)} width={heightPercentageToDP(4)}/>
        <Text style={styles.mainTxt}>Profile Verification</Text>
        <Text style={styles.subTxt}>Your profile will be verified within next 24 hours by our team and you will be notified.</Text>

        <View style={{position:'absolute', bottom: heightPercentageToDP(5)}}>
          <ButtonSecondary title='Go to home' onPress={() =>  navigation.navigate('dashboard', { screen: 'listing' })}/>
        </View>

    </View>
  )
}

export default PendingProfileVerify