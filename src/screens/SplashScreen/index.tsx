import { View, BackHandler, Image } from 'react-native'
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCATION_STORAGE, STORAGE_CREDENTIALS } from '../../constants';
import { storeCredentials, storeUserInfo } from '../../redux-saga/auth/authAction';
import { useGetUserInfo } from '../../hooks/useGetUserInfoHook';
import { User } from '../../interface/signUpInterface';
import { updateLocation } from '../../redux-saga/club/clubAction';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const SplashScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {userData, userError, userLoading, fetchUserInfo} = useGetUserInfo()

  const handleFetchUserInfo = async (userId: string) => {
    
  };

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

  useEffect(() => {
    let interval : NodeJS.Timeout;
    const fetchCreds = async () => {
      const credentials = await AsyncStorage.getItem(STORAGE_CREDENTIALS)
      if(!credentials){
        interval = setTimeout(() => {
          navigation.navigate('AuthNevigator')
        },2000)
      }else{
        //route to tab navigator
        const creds = JSON.parse(credentials)
        if(!creds?.onboarding?.isCompleted) {
            navigation.navigate('AuthNevigator', { screen: 'profileVerify', })
            dispatch(storeCredentials(creds))
            return;
        }
        try {
            const response = await fetchUserInfo({ 
              context: {
                headers: {
                    authorization: `Bearer ${creds?.accessToken}`,
                }
            },
            variables: { userId: creds?.id }
          });
          dispatch(storeUserInfo({...response?.data?.getUserInfo?.user, profileUnderReview: response?.data?.getUserInfo?.profileUnderReview} as User))
          dispatch(storeCredentials(creds))
          interval = setTimeout(() => {
            navigation.navigate('TabNevigator')
          },2000)
        } catch (err) {
          console.error('Error fetching user info:', err);
          interval = setTimeout(() => {
            navigation.navigate('AuthNevigator')
          },2000)
        }
      }
    }
    fetchCreds()

    const fetchLocation = async () => {
      const location = await AsyncStorage.getItem(LOCATION_STORAGE)
      const parsedLocation = JSON.parse(location ?? '')

      if(parsedLocation?.id && parsedLocation?.name){
        dispatch(updateLocation({id: parsedLocation?.id, name: parsedLocation?.name}))
      }
    }
    fetchLocation()

    return () => {
      clearTimeout(interval)
    }

  },[])

  return (
    <View style={styles.body}>
        {/* <SplashScreens height={heightPercentageToDP(100)} width={widthPercentageToDP(100)}/> */}
        <Image source={require("../../assets/png/SplashScreens.png")} style={{resizeMode:'cover', height: heightPercentageToDP(100), width: widthPercentageToDP(100)}}/>
    </View>
  )
}

export default SplashScreen