import { getTheme } from '../../theme';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const theme = getTheme(wp, hp);

export const styles = StyleSheet.create({

    body:{
        backgroundColor: theme.colors.bgColor,
        // padding:wp('3'),
        flex:1
    },
    text:{
        fontFamily:theme.fontFamily.boldSemi,
        color:theme.colors.white,
        marginTop:hp('2'),
        fontSize:wp('8'),
        textAlign:'center',
    },
    marginBtm: {
        marginBottom: hp(2)
    },
    loginText:{
        color:theme.colors.orange,
        fontSize:wp('4'),
        textAlign:'center',
        marginTop:hp('2')
    },
    imageContainer: {
        flex:1,
    }

})