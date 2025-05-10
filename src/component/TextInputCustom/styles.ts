import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        width: wp(90),
    },
    labelTxt:  { color:'#BEBAB9', fontFamily: theme.fontFamily.regular, marginBottom: hp(0.8)},
    txtInput: {
        borderColor:'#f5f5f5',
        borderWidth: wp(0.3),
        paddingLeft: wp(3),
        paddingRight: wp(12),
        height: hp(6.2),
        width: wp(90),
        fontSize: wp(3.2),
        fontFamily: theme.fontFamily.medium,
        color: "white"
    },
    rightIcon: {position:'absolute', right: wp(3), top: hp(4.5)},
    errorContainer: {
        height: hp(2),
        justifyContent:'center'
    },
    errorTxt: {
        color:'red',
        fontSize: wp(2.2),
        paddingLeft: wp(2)
    },

    inputContainer: {
        width: wp('90%'),
        marginBottom: hp('1.5%'),
    },
    label: {
        color: '#fff',
        marginBottom: hp('0.2%'),
        fontSize: wp('4%'),
        fontFamily: theme.fontFamily.regular
    },
    input: {
        backgroundColor: '#243139',
        color: '#fff',
        padding: hp('1%'),
        fontSize: wp('4%'),
        borderWidth: wp(0.2),
        borderColor: '#a0a0a0'
    },
    rightIconSecondary: {
        position:'absolute', 
        right: wp(3), 
        top: hp(3.5)
    }
})