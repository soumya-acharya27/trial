import { View, Text, BackHandler, ToastAndroid, Pressable, Keyboard } from 'react-native'
import PeerHubLogo from '../../assets/svg/peerhublogo.svg'
import { styles } from './styles'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback, useEffect, useState } from 'react'
import OTPInput from '../../component/OtpContainer'
import { otpResendTimeinSecs, showErrorToast } from '../../utils'
import { ButtonCustom, ButtonSecondary } from '../../component/ButtonCustom'
import { useMutation } from '@apollo/client'
import { RESEND_OTP } from '../../graphql/auth/authMutation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_CREDENTIALS } from '../../constants'
import { PhoneLoginResponse, PhoneLoginVariables, ResendOTPResponse, ResendOTPVariables, User, VerifyPhoneOTPResponse, VerifyPhoneOTPVariables } from '../../interface/signUpInterface'
import { PHONE_LOGIN, RESEND_OTP_TO_PHONE, VERIFY_PHONE_OTP } from '../../graphql/user/userMutation'
import { useDispatch } from 'react-redux'
import { storeCredentials, storeUserInfo } from '../../redux-saga/auth/authAction'
import Toast from '../../components/Toast'
import { theme } from '../../theme'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { useGetUserInfo } from '../../hooks/useGetUserInfoHook'


const LoginWithOtp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
  const route = useRoute();
  const {phone} = route.params as {phone: string};

  const [invalidOtp, setInvalidOtp] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const { userData, userError, userLoading, fetchUserInfo } = useGetUserInfo()
  

  
  // const [resendOTP, { data:resendData, loading:resendLoading, error:resendError }] = useMutation(RESEND_OTP, {    
  //   onCompleted: (response) => {
  //     console.log("OTP resent:", response?.resendOTP?.message);
  //   },
  //   onError: (err) => {
  //     console.error("Error resending OTP:", err);
  //   },
  // });

  const [phoneLogin, { data, loading, error }] = useMutation<
      PhoneLoginResponse,
      PhoneLoginVariables
    >(PHONE_LOGIN);

  const [resendOTPToPhoneNumber, { data:resendData, loading:resendLoading, error:resendError }] = useMutation<
    ResendOTPResponse,
    ResendOTPVariables
  >(RESEND_OTP_TO_PHONE);

  const [verifyPhoneOTP, { data: verifyData, loading:verifyLoading, error:verifyError }] = useMutation<
      VerifyPhoneOTPResponse,
      VerifyPhoneOTPVariables
    >(VERIFY_PHONE_OTP);

  const loginWithPhone = async (countryCode: string, phoneNumber: string) => {
    try {
      const response = await phoneLogin({
        variables: { countryCode, phoneNumber },
      });
      // Show success toast
      setToastMessage('OTP Sent.');
      setToastType('success');
      setShowToast(true);
    } catch (err) {
      console.error('Login failed:', err);
      setToastMessage('Failed to send OTP.');
      setToastType('error');
      setShowToast(true);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if(phone.length === 10){
      loginWithPhone('91', phone)
    }
  },[phone])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const [timer, setTimer] = useState(otpResendTimeinSecs); 
  const [resentDisabled, setResentDisabled] = useState(true);
  const dispatch = useDispatch()
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000); 
    } else {
      setResentDisabled(false); 
      if (interval) clearInterval(interval); 
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const verifyCta = async () => {
    Keyboard.dismiss()
    setInvalidOtp(false)
    try {
      const response = await verifyPhoneOTP({
        variables: {
          id: data?.phoneLogin?.id ?? '',
          otp: otp?.join(''),
        },
      });
      if(response?.data?.verifyPhoneOTP){
        if(response?.data?.verifyPhoneOTP?.onboarding?.isCompleted){
          AsyncStorage.setItem(STORAGE_CREDENTIALS, JSON.stringify(response?.data?.verifyPhoneOTP))
          dispatch(storeCredentials(response?.data?.verifyPhoneOTP))
          try {
            const userRsponse = await fetchUserInfo({
                context: {
                    headers: {
                        authorization: `Bearer ${response?.data?.verifyPhoneOTP?.accessToken}`,
                    }
                },
                variables: { userId: response?.data?.verifyPhoneOTP?.id }
            });
            dispatch(storeUserInfo({...userRsponse?.data?.getUserInfo?.user} as User))
            navigation.navigate('TabNevigator')
            // navigation.navigate('profileVerify')
        } catch (err) {
            console.error('Error fetching user info:', err);
        }
          return;
        }else{
          //navigate to complete register user details page
          // navigation.navigate('Signup', {takeToUserDetails: true})
          AsyncStorage.setItem(STORAGE_CREDENTIALS, JSON.stringify(response?.data?.verifyPhoneOTP))
          dispatch(storeCredentials(response?.data?.verifyPhoneOTP))
          navigation.navigate('profileVerify')

          //todo navigate to new page
        }
      }else{
        throw new Error('Unexpected response structure');
      }
    } catch (err) {
      // showErrorToast("invalid otp")s
      setInvalidOtp(true)
      setToastMessage('Invalid OTP');
      setToastType('error');
      setShowToast(true);
      console.error('Error verifying OTP:', err);
    }
  }

  const resendCta = async () => {
      setTimer(otpResendTimeinSecs); 
      setResentDisabled(true); 
      try {
        const response = await resendOTPToPhoneNumber({
          variables: { countryCode:"+91", phoneNumber: phone },
        });      
        setToastMessage('OTP Sent.');
        setToastType('success');
        setShowToast(true);      } catch (err) {
        console.error("Error invoking resendOTP:", err);
        setToastMessage('Failed to send OTP.');
        setToastType('error');
        setShowToast(true);
      }
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <PeerHubLogo />
        <View style={styles.textConatiner}>
          <Text style={styles.createText}>OTP Verification</Text>
          <Text style={styles.letsText}>We have sent OTP on +91 {phone}</Text>
        </View>

        <View style={styles.innerContainer}>
          <OTPInput error={invalidOtp} otp={otp} setOtp={setOtp}/>
          <View style={{ flexDirection:'row', justifyContent:'center'}}>
            <Text style={styles.resendTxt}>{`Resend code in ${timer?.toString()?.padStart(2, '0')} seconds`}</Text>
            <Pressable onPress={resendCta}>
                <Text style={[styles.resendTxt, {color:'white', fontFamily: theme.fontFamily.medium, paddingTop: heightPercentageToDP(0.15)}]}>{timer !== 0 ? '' : ' Resend'}</Text>
            </Pressable>
          </View>          
          <ButtonCustom disabled={verifyLoading} title='Verify' onPress={verifyCta}/>
        </View>
      </View>
      <Toast
        visible={showToast}
        message={toastMessage}
        type={toastType}
        onHide={() => setShowToast(false)}
      />
    </View>
  )
}

export default LoginWithOtp