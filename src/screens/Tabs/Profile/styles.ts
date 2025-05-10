import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(1),
        paddingHorizontal: wp(3),
        backgroundColor:theme.colors.bgColor,
        flex:1
    },
    headerContainer: {
        flexDirection:'row',
        alignItems:'center',
        marginBottom: hp(2)
    },
    boldTxt: {
        fontFamily:theme.fontFamily.bold,
        fontSize: wp(5),
        color: 'white'      
    },
    marginLeft: {
        marginLeft: wp(2)
    },
    rightContainer: {
        flexDirection:'row',
    },
    tabContainer: {
        flex:1, 
    },
    separator: {
        height : hp(0.2),
        marginVertical: hp(1),
        width:wp(92),
        alignSelf:'center'
    },
    postContainer: {
        paddingVertical: hp(2),
        flexGrow:1
    },
    emptyTxt: {
        fontFamily:theme.fontFamily.bold,
        fontSize: wp(4),
        textAlign:'center',
        color: '#717171'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(4)
    },
    emptyText: {
        fontFamily: theme.fontFamily.medium,
        fontSize: wp(4),
        color: '#717171',
        textAlign: 'center',
        marginBottom: hp(2)
    },
    emptyButton: {
        backgroundColor: theme.colors.orange,
        paddingHorizontal: wp(6),
        paddingVertical: hp(1.5),
        borderRadius: wp(2)
    },
    emptyButtonText: {
        fontFamily: theme.fontFamily.medium,
        fontSize: wp(4),
        color: theme.colors.white,
        textAlign: 'center'
    }
})