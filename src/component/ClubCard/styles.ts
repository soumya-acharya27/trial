import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        height: hp(22.5),
        borderRadius: wp(5),
        borderWidth: wp(0.5),
        borderColor:'#f5f5f5',
        width: wp(42),
        marginVertical: hp(1),
        paddingVertical: hp(1),
        paddingHorizontal: wp(1),
        flexDirection:'column'
    },
    imgContainer: {
        height: wp(14),
        width: wp(14),
        alignSelf:'center'
    },
    img: {
        height: wp(14),
        width: wp(14),
        borderRadius: wp(10),
    },
    txt: {
        textAlign:'center',
        fontSize:wp(4.5),
        fontFamily: theme.fontFamily.boldSemi,
        marginTop: hp(1),
        flex:1,
    },
    btnContainer: {
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    }
}); 