import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
  },
  content: {
    paddingHorizontal: wp(4),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
  },
  menuItemContent: {
    flex: 1,
    marginRight: wp(4),
  },
  menuItemTitle: {
    color: '#FFEEE6',
    fontSize: wp(4.2),
    fontFamily: theme.fontFamily.medium,
  },
  menuItemSubtitle: {
    color: theme.colors.underlineGray,
    fontSize: wp(3.8),
    fontFamily: theme.fontFamily.regular,
    marginTop: hp(0.5),
  },
}); 