import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../theme';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  searchInput: {
    backgroundColor: theme.colors.darkGray,
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    color: theme.colors.white,
    fontSize: wp(4),
  },
  sectionTitle: {
    color: theme.colors.orange,
    fontSize: wp(4),
    fontFamily: theme.fontFamily.medium,
    marginVertical: hp(2),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray,
  },
  menuItemTitle: {
    color: theme.colors.white,
    fontSize: wp(4),
    fontFamily: theme.fontFamily.medium,
  },
  menuItemSubtitle: {
    color: theme.colors.gray,
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.regular,
    marginTop: hp(0.5),
  },
}); 