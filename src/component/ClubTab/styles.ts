import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('2'),
        paddingVertical: hp(0.5),
    },
    normalContainer: {
        backgroundColor: 'transparent',
        borderWidth: wp(0.2),
        borderColor: 'white',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
        minHeight: hp(5),
        justifyContent: 'center',
    },
    SelectContainer: {
        backgroundColor: theme.colors.orange,
        borderWidth: wp(0.2),
        borderColor: theme.colors.orange,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
        minHeight: hp(5),
        justifyContent: 'center',
    },
    normalText: {
        fontFamily: theme.fontFamily.medium,
        fontSize: wp('4'),
        lineHeight: wp(4.5),
        color: 'white',
        includeFontPadding: false,
        textAlignVertical: 'center',
    }
}); 