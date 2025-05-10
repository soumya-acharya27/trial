import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        marginTop:wp('5'),
        marginRight:wp('5')
    },
    imgContainerLeft: {
        width: wp('13'),
        height: wp('13'),
        borderRadius: wp('10'),
        marginRight:wp('3')
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: wp('13'),   
    },
    imgBG: {
        width: wp('90'),
        height: hp('22'),
        resizeMode: 'cover',
        borderRadius: wp('5'),   
        marginRight:wp('2'),
        marginTop:hp('1')
    },
    txt: {
        fontSize:wp(4),
        fontFamily: theme.fontFamily.regular,
        color:theme.colors.black,
        includeFontPadding:false,
        marginTop:hp('1'),
        marginLeft:wp('1')

    },
    textContainer:{
        flexDirection:'row',
        marginTop:hp('0.5')
    },
    detailstxt: {
        fontSize:wp(3),
        fontFamily: theme.fontFamily.regular,
        color:'#717171',
        includeFontPadding:false,
        marginRight:wp('1'),
        marginLeft:wp('1')
    },
    line:{
        borderWidth:0.5,
        borderColor:'#717171',
        height:hp('1.4'),
    }
}); 