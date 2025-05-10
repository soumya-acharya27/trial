import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#243139',
    paddingBottom: hp(4),
  },
  content: {
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  boxer: {
    height: hp(0.7),
    width: wp(15),
    alignSelf: 'center',
    backgroundColor: '#0b1e29',
    marginBottom: hp(2),
    borderRadius: wp(4)
  },
  header: {
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5),
    color: theme.colors.white,
    fontFamily: theme.fontFamily.boldSemi,
  },
  option: {
    paddingVertical: hp(2),
    borderBottomWidth: hp(0.15),
    borderBottomColor: '#404040',
    flexDirection:'row',
    paddingRight: wp(2),
    justifyContent:'space-between'
  },
  optionText: {
    fontSize: wp(4),
    color: '#FFEEE6',
    fontFamily: theme.fontFamily.regular,
  },
}); 