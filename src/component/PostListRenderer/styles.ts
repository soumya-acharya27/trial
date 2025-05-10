import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    separator: {
        height: 1,
        marginVertical: hp(1),
        width: wp(90),
        alignSelf: 'center'
    },
    loaderContainer: {
        paddingVertical: hp(2),
        alignItems: 'center',
        justifyContent: 'center'
    }
});