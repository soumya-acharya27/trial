import { getTheme } from '../../theme';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const theme = getTheme(wp, hp);

export const styles = StyleSheet.create({
    lineContainer:{
        marginTop:hp('2'),
        flexDirection:'row',
    },
    line: {
        width :wp('15'),
        height:wp('2'),
        borderRadius:wp('2'),
        marginRight:wp('2')
    }

})