import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";


export const styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        width:wp('100'),
        paddingHorizontal:wp('2'),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.colors.bgColor,
        paddingVertical: hp(1),

    },
    nameText:{
        fontFamily:theme.fontFamily.boldSemi,
        fontSize:wp('4.8'),
        flex:1,
        marginLeft:wp('2'),
        color: 'white'
    },
    skipNowTxt: {
        fontFamily:theme.fontFamily.medium,
        fontSize:wp('3'),
        textAlign:'center',
        textAlignVertical:'center',
        flex:1,
        marginLeft:wp('2'),
        color: theme.colors.orange,
        marginRight: wp(2)
    },
    skipBtn: {
        alignItems:'center',
        justifyContent: 'center',
    }
})