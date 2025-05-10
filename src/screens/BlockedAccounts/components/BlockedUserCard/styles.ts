import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textContainer: {
    marginLeft: wp(3),
    flex: 1,
  },
  name: {
    fontSize: wp(4),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
    marginBottom: hp(0.5),
  },
  username: {
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  unblockButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    // borderRadius: wp(1.5),
    borderWidth: 2,
    borderColor: '#818181',
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.6,
  },
  unblockText: {
    color: '#818181',
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.bold,
  },
}); 