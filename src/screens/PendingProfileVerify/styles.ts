import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { widthPercentageToDP } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.colors.bgColor,
        paddingHorizontal: widthPercentageToDP(5),
        alignItems:'center',
        justifyContent:'center',
    },
    mainTxt: {
        color:'white',
        fontSize: widthPercentageToDP(4.5),
        fontFamily: theme.fontFamily.medium
    },
    subTxt: {
        color:'white',
        fontSize: widthPercentageToDP(3.8),
        fontFamily: theme.fontFamily.medium,
    }
})