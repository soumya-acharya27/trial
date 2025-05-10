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
        fontSize: wp('4.5'),
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

    bottomContainer: {
        marginTop: hp(5)
    },
    text: {
        marginTop: hp(1),
        alignSelf:'center',
        color: '#717171',
        fontSize: wp(3.2),
        fontFamily: theme.fontFamily.regular
    },
    signInText: {
        fontFamily: theme.fontFamily.medium,
        color:'black'
    },
    recoverTxt: {
        fontFamily: theme.fontFamily.medium,
        color:theme.colors.orange
    },
    forgotTxt: {
        marginVertical: hp(1),
        marginBottom: hp(3),
        alignSelf:'center',
        color: '#717171',
        fontSize: wp(4),
        fontFamily: theme.fontFamily.regular
    },
    loginText:{
        color:theme.colors.orange,
        fontSize:wp('4'),
        textAlign:'center',
        marginTop:hp(1)
    },

})