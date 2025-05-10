import { View, Text, Pressable, BackHandler } from 'react-native'
import PeerHubLogo from '../../assets/svg/peerhublogo.svg'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import TextInputCustom from '../../component/TextInputCustom'
import { useEffect, useState } from 'react'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Call from "../../assets/svg/call.svg"
import { ButtonCustom } from '../../component/ButtonCustom'
import { errorMessage, showErrorToast } from '../../utils'
import Toast from '../../components/Toast'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
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

  const getOtp = () => {
    // Reset error state

    // Validate phone number length
    if(phone.length < 10) {
      setToastMessage('Please enter a 10-digit phone number');
      setToastType('error');
      setShowToast(true);
      return;
    }

    // Validate phone number format (must start with 6, 7, 8, or 9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setToastMessage('Invalid phone number');
      setToastType('error');
      setShowToast(true);
      return;
    }

    // If validation passes, navigate to OTP screen
    navigation.navigate('loginWithOtp', {phone: phone})
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <PeerHubLogo />
        <View style={styles.textConatiner}>
          <Text style={styles.createText}>Verify Your Contact</Text>
          <Text style={styles.letsText}>You will receive a confirmation code via Call or SMS</Text>
        </View>

        <View style={styles.innerContainer}>
          <TextInputCustom
              label="Enter mobile number"
              keyboardType='numeric'
              placeholder='Enter your number here'
              value={phone}
              maxLength={10}
              changeText={text => {
                setPhone(text.replace(/[^0-9]/g, ''));
              }}
              Right={() => <Call height={hp(2.5)} width={hp(2.5)}/>}
          />

          <View style={styles.bottomContainer}>
              <ButtonCustom title='Get OTP' onPress={getOtp}/>
          </View>
        </View>
      </View>
      <Toast
        visible={showToast}
        duration={3000}
        message={toastMessage}
        type={toastType}
        onHide={() => setShowToast(false)}
      />
    </View>
  )
}

export default Login