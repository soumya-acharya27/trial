import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
    card: {
        width: wp(40),
        height: hp(22),
        justifyContent: 'flex-end',
        marginRight: wp(4),
        backgroundColor:'powderblue'
    },
    title: {
        fontSize: wp(4.2),
        fontFamily: theme.fontFamily.medium,
        color: 'white',
        paddingHorizontal: wp(2),
        paddingBottom: hp(1),
        zIndex: 999
    },
    bgColors: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: hp(8),
        position: 'absolute',
        justifyContent: 'center',
    },
}); 