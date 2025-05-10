import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        backgroundColor: theme.colors.bgColor,
        flex:1,
        alignItems:'center'
    },
    formContainer: {
        flex:1
    },
    profileContainer: {
        marginVertical: hp(2),
    },
    cameraContainer: {
        height: wp(6),
        width: wp(6),
        backgroundColor:'#f5f5f5',
        borderRadius: wp(3),
        position:'absolute',
        zIndex:1,
        alignItems:'center',
        justifyContent:'center',
        bottom: 0,
        right: 0,
        borderColor:'white',
        borderWidth: wp(2)
    },
    headerContainer: {
        flexDirection:'row',
        alignItems:'center',
        marginBottom: hp(2),
        paddingVertical: hp(1)
    },
    boldTxt: {
        fontFamily:theme.fontFamily.bold,
        fontSize: wp(5),
        color: 'white'      
    },
    marginLeft: {
        marginLeft: wp(2)
    },
    img: {
        height: wp(20),
        width: wp(20),
        borderRadius: wp(10),
    },
})