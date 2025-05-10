import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        marginTop:wp('5')
    },
    imgContainerLeft: {
        width: wp('25'),
        height: wp('20'),
        marginRight:wp('3')
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: wp('2'),
        backgroundColor:'powderblue'
   
    },
    txt: {
        fontSize:wp(4),
        fontFamily: theme.fontFamily.medium,
        color:theme.colors.white,
        includeFontPadding:false,
        
    },
    textContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:hp(1)
    },
    detailstxt: {
        fontSize:wp(3.5),
        fontFamily: theme.fontFamily.regular,
        color: theme.colors.white,
        marginLeft:wp('2')
    },
    line:{
        borderWidth:0.5,
        borderColor:'#717171',
        height:hp('1.4'),
    }
}); 