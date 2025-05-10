import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        padding:wp('2')
    },
    imgContainerLeft: {
        width: wp('22'),
        height: wp('22'),
        overflow: 'hidden',
    },
    imgContainer: {
        width: wp('10'),
        height: wp('10'),
        borderRadius: 20,
        marginHorizontal: -8, // Overlapping effect
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#fff',
    },
    img: {
        width: wp(22),
        height: wp(22),
        resizeMode: 'cover',
        backgroundColor:'powderblue'
    },
    txt: {
        fontSize:wp(4.5),
        fontFamily: theme.fontFamily.boldSemi,
        marginTop: hp(1),
        color:'white'
    },
    btnContainer: {
        justifyContent:'flex-end',
        alignItems:'center'
    },
    middleontainer:{
        flex:1,
        alignItems:'flex-start',
        marginLeft: wp(2)
    }
}); 