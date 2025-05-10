import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.bgColor,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
    },
    profilePic: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        marginRight: wp('3'),
        resizeMode:'cover',
        marginLeft: wp(4),

    },
    userName: {
        color:'#FFEEE6',
        fontFamily: theme.fontFamily.medium,
        fontSize: wp(4.2)
    },
    title: {
        fontSize: wp(4.5),
        fontFamily: theme.fontFamily.medium,
        color: theme.colors.white,
    },
    input: {
        padding: wp(4),
        fontSize: wp(4),
        color: theme.colors.white,
        textAlignVertical: 'top',
        lineHeight: hp(2.3),
        fontFamily: theme.fontFamily.regular,
    },
    imageContainer: {
        margin: wp(4),
        borderRadius: wp(2),
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: wp(2),
    },
    loadingImage: {
        backgroundColor: theme.colors.gray,
        opacity: 0.5,
    },
    removeImage: {
        position: 'absolute',
        top: wp(2),
        right: wp(2),
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: wp(4),
        padding: wp(2),
    },
    bottomContainer: {
        marginTop: 'auto',
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray,
        paddingHorizontal: wp(4),
    },
    originalPostContainer: {
        marginTop: hp(2),
        paddingHorizontal: wp(4),
        paddingBottom: hp(2),
    },
});