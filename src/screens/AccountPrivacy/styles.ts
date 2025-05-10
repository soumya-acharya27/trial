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
  section: {
    marginTop: hp(3),
  },
  sectionTitle: {
    color: theme.colors.orange,
    fontSize: wp(4),
    fontFamily: theme.fontFamily.bold,
    marginBottom: hp(2),
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  optionText: {
    color: '#FFEEE6',
    fontSize: wp(4),
    fontFamily: theme.fontFamily.medium,
  },
}); 