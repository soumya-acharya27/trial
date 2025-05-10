import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  title: {
    marginLeft: wp(4),
    fontSize: wp(5),
    fontFamily: theme.fontFamily.medium,
    color: '#FFEEE6',
  },
}); 