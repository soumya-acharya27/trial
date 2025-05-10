import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
    paddingHorizontal: wp(4)
  },
  titleContainer: {
    paddingHorizontal: wp(4),
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  titleText: {
    color: theme.colors.white,
    fontSize: wp(4.5),
    fontFamily: theme.fontFamily.medium,
  },
  listContainer: {
    paddingHorizontal: wp(4),
    gap: hp(2),
  },
  columnWrapper: {
    // justifyContent: 'space-between',
    gap: wp(4),
  },
  list: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    marginBottom: hp(2)
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerLoader: {
    paddingVertical: hp(2),
    alignItems: 'center'
  },
  emptyContainer: {
        height: hp(78),
        alignItems:'center',
        justifyContent:'center',
    },
    comingSoonTxt: {
        textAlign:'center',
        fontSize: wp(4.2),
        fontFamily: theme.fontFamily.medium,
        color:'white'
    }
}); 