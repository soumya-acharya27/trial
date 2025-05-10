import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  mainTitle: {
    fontSize: wp(6),
    fontWeight: '600',
    color: 'white',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  welcomeText: {
    fontSize: wp(3.8),
    color: 'white',
    marginBottom: hp(3),
    lineHeight: hp(2.5),
  },
  guidelineContainer: {
    marginBottom: hp(2),
  },
  guidelineTitle: {
    fontSize: wp(4),
    fontWeight: '600',
    color: 'white',
    marginBottom: hp(1),
  },
  guidelineDescription: {
    fontSize: wp(3.5),
    color: '#CACACA',
    lineHeight: hp(2.5),
  },
  footerText: {
    fontSize: wp(3.8),
    color: 'white',
    marginBottom: hp(4),
    lineHeight: hp(2.5),
  },
}); 