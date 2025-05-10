import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wp(100),
    height: '100%',
    backgroundColor: theme.colors.bgColor,
    paddingTop: hp(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginBottom: hp(4),
    paddingTop: hp(2),
  },
  title: {
    color: theme.colors.white,
    fontSize: wp(5),
    fontFamily: theme.fontFamily.medium,
  },
  menuContent: {
    paddingHorizontal: wp(4),
    flex: 1,
  },
  sectionTitle: {
    color: theme.colors.orange,
    fontSize: wp(4.5),
    fontFamily: theme.fontFamily.medium,
    marginBottom: hp(2),
  },
  menuItem: {
    color: theme.colors.white,
    fontSize: wp(4),
    fontFamily: theme.fontFamily.regular,
    paddingVertical: hp(1.5),
  },
  footer: {
    paddingBottom: hp(4),
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.white,
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.regular,
    marginTop: hp(1),
  },
  version: {
    color: theme.colors.gray,
    fontSize: wp(3),
    fontFamily: theme.fontFamily.regular,
    marginTop: hp(0.5),
  },
}); 