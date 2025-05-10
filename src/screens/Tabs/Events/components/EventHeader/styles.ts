import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(1),
  },
  searchIcon: {
    position:'absolute',
    right: wp(2),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: wp(4.2),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
    marginLeft: wp(2)
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  dropText: {
    color: theme.colors.gray,
    fontSize: wp(3.8),
    marginRight: wp(1),
    fontFamily: theme.fontFamily.regular,
  },
}); 