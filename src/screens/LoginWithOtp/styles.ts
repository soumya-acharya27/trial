import { getTheme } from '../../theme';
import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const theme = getTheme(wp, hp);

export const styles = StyleSheet.create({
    main: {
        backgroundColor: theme.colors.bgColor,
        flex: 1,
        paddingTop: hp(10)
    },
    container: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: hp(2),
        flex:1,
    },
    innerContainer: {
        flex:1, 
        marginBottom: hp(1),
        marginTop: hp(1)
    },
    textConatiner:{
        marginTop:hp('3'),
    },
    createText: {
        color: theme.colors.white,
        fontSize: wp('7'),
        textAlign: 'center',
        fontFamily:theme.fontFamily.medium 
    },
    letsText: {
         color: theme.colors.white,
        fontSize: wp('4'),
        width: wp(85),
        textAlign: 'center',
        fontFamily:theme.fontFamily.medium,
        marginTop:hp('1'),
        marginBottom: hp(2)
    },
    inputContainer:{
        marginTop:hp('2.5'),
        borderRadius:wp('1'),
        
    },
    resendTxt: {
        fontSize: wp(3.3),
        color: '#BEBAB9',
        marginTop: hp(2),
        marginBottom: hp(14)
    }

})