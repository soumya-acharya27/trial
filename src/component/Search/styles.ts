import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: wp(90),
        marginVertical: hp(1)
    },
    txtInput: {
        borderColor:'#f5f5f5',
        borderWidth: wp(0.5),
        paddingLeft: wp(8),
        paddingRight: wp(3),
        height: hp(5),
        borderRadius: wp(5),
        width: wp(90),
        fontSize: wp(3.2),
        fontFamily: theme.fontFamily.medium
    },
    leftIcon: {position:'absolute', left: wp(3), top: hp(1.5)},
    errorContainer: {
        height: hp(2),
    },
    errorTxt: {
        color:'red',
        fontSize: wp(2.2),
        paddingLeft: wp(2)
    }
})