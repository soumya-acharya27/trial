import { View, Text, Pressable, SafeAreaView, BackHandler, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux-saga/rootReducer'
import Logo from '../../assets/svg/logo.svg';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import {ButtonCustom} from '../../component/ButtonCustom'
import Splash from "../../assets/svg/splashImage.svg"
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const Homec = () => {
  const dispatch = useDispatch()
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
  }, []);

  return (
    <View style={styles.body}>

        <View style={styles.imageContainer}>
          {/* <Splash height={'100%'} width={'100%'}/> */}
          {/* "../../assets/png/Splash.png" */}
          <Image source={require("../../assets/png/Splash.png")} style={{resizeMode:'contain', height: '100%', width:'100%'}}/>
        </View>

        <View style={{  alignItems: 'center' , flex:1}}>
          <Text style={styles.txt}>This <Text style={styles.italicTxt}>Hub</Text> Is</Text>
          <Text style={[styles.txt, {marginBottom: heightPercentageToDP(5)}]}>Not <Text style={styles.italicTxt}>Banned</Text></Text>

          <ButtonCustom title='Get Started' onPress={() => navigation.navigate('login', {takeToUserDetails: false})}/>
        </View>
    </View>
  )
}

export default Homec