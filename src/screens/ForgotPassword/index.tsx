import { View, Text, BackHandler } from 'react-native'
import PeerHubLogo from '../../assets/svg/peerhublogo.svg'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import TextInputCustom from '../../component/TextInputCustom'
import Sms from "../../assets/svg/sms.svg"
import { ButtonCustom, ButtonSecondary } from '../../component/ButtonCustom'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ForgotPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState('')

  const goBack = () => navigation.goBack()

  const sendCta = () => {
    //write logic here
    
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        goBack()
        return true;
      },
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <PeerHubLogo />
        <View style={styles.textConatiner}>
          <Text style={styles.createText}>Welcome Back</Text>
          <Text style={styles.letsText}>Let’s get you login to Peerhub</Text>
        </View>

        <View style={styles.innerContainer}>
          <TextInputCustom
              label="Enter Email"
              value={email}
              changeText={text => setEmail(text)}
              Right={() => <Sms height={hp(3)} width={hp(3)}/>}
          />
          <View style={styles.marginTop}/>
          <ButtonCustom title='Send' onPress={sendCta}/>
          <ButtonSecondary title='Cancel' onPress={goBack}/>
        </View>
      </View>
    </View>
  )
}

export default ForgotPassword