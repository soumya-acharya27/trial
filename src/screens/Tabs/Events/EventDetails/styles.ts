import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { theme } from '../../../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1F25',
    },
    imageContainer: {
        height: hp(35),
        backgroundColor: '#1A1F25',
    },
    header: {
        position: 'absolute',
        top: hp(2),
        left: wp(2),
        zIndex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor:'powderblue'
    },
    categoryOverlay: {
        position: 'absolute',
        alignItems:'center',
        justifyContent:'center',
        zIndex: 9999,
        bottom: -hp(2),
        left: wp(4),
        height: hp(4),
        paddingHorizontal: wp(4),
        borderRadius: wp(3),
        backgroundColor:'#3D4344'
    },
    categoryText: {
        color: theme.colors.white,
        fontSize: wp(3.5),
        fontFamily: theme.fontFamily.regular,
    },
    contentContainer: {
        flex: 1,
        marginTop: hp(3),
        paddingHorizontal: wp(4),
        backgroundColor: '#1A1F25',
    },
    title: {
        fontSize: hp(3),
        fontFamily: theme.fontFamily.boldSemi,
        color: theme.colors.white,
        marginBottom: hp(1),
    },
    description: {
        fontSize: hp(1.8),
        fontFamily: theme.fontFamily.regular,
        color: theme.colors.gray,
        marginBottom: hp(3),
        lineHeight: hp(2.2),
    },
    infoContainer: {
        marginBottom: hp(3),
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    infoText: {
        fontSize: hp(1.8),
        fontFamily: theme.fontFamily.regular,
        color: theme.colors.white,
        marginLeft: wp(3),
    },
    footer: {
        paddingHorizontal: wp(5),
        marginBottom: hp(2)
    },
    registerButton: {
        backgroundColor: '#FF6F3C',
        height: hp(6),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        color: theme.colors.white,
        fontSize: hp(1.8),
        fontFamily: theme.fontFamily.medium,
    },
    participantsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    participantsText: {
        color: theme.colors.white,
        fontSize: hp(1.8),
        fontFamily: theme.fontFamily.regular,
        marginLeft: wp(3),
        opacity: 0.9,
    }
});