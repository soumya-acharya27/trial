import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  emptyTitle: {
    color: '#FFEEE6',
    fontSize: wp(4.5),
    fontFamily: theme.fontFamily.medium,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  emptySubtitle: {
    color: theme.colors.underlineGray,
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.regular,
    textAlign: 'center',
    lineHeight: hp(2),
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal:wp(4),
    borderBottomWidth: wp(0.3),
    borderBottomColor: theme.colors.underlineGray,
    justifyContent:'space-around'
  },
  tab: {
    paddingVertical: hp(2),
    textAlign:'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.orange
  },
  tabText: {
    color: theme.colors.underlineGray,
    fontSize: wp(3.5),
  },
  activeTabText: {
    color: theme.colors.white,
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.medium,
  },
  loader: {
    marginVertical: hp(2),
  },
}); 