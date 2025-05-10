import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    signupContainer:{
        width:wp('90'),
        height:hp('5'),
        justifyContent:'center',
        marginVertical:hp('1'),
        backgroundColor: theme.colors.orange
    },
    signupText:{
        color:theme.colors.white,
        fontSize:wp('4'),
        textAlign:'center',   
        padding:0,
        includeFontPadding:false
    },

    secondaryBtn: {
        borderWidth: wp(0.4),
        borderColor: theme.colors.orange,
        backgroundColor:'transparent'
    },

    secondaryTxt: {
        color: theme.colors.orange
    }
})