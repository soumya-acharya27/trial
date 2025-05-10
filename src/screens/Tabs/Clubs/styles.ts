import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../theme";


export const styles = StyleSheet.create({

    container:{
        height:hp('100'),
        backgroundColor:theme.colors.bgColor,
        flex:1,
        paddingHorizontal: wp(2)
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: wp(4),
    },
    searchButton: {
        position:'absolute',
        right: wp(2)
    },
})