import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: theme.colors.bgColor,
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    paddingBottom: hp(4),
    maxHeight: hp(70),
  },
  handle: {
    width: wp(10),
    height: hp(0.5),
    backgroundColor: theme.colors.gray,
    borderRadius: hp(0.25),
    alignSelf: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(2.2),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  loadingContainer: {
    height: hp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxHeight: hp(50),
  },
  reasonItem: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderGray,
  },
  reasonText: {
    fontSize: hp(1.8),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.white,
  },
  disabledText: {
    opacity: 0.6,
  },
}); 