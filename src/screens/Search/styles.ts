import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  backButton: {
    marginRight: wp(4),
  },
  headerTitle: {
    fontSize: wp(5),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
  },
  searchContainer: {
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
  },
  searchInput: {
    backgroundColor: theme.colors.bottomNavColor,
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    color: theme.colors.white,
    fontFamily: theme.fontFamily.regular,
    fontSize: wp(4),
  },
  recentContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  recentTitle: {
    fontSize: wp(4),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
    marginBottom: hp(2),
  },
  searchItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(0.2),
  },
  searchItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchItemImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    marginRight: wp(3),
    backgroundColor:'#1A1A1A'
  },
  searchItemTextContainer: {
    flex: 1,
  },
  searchItemName: {
    fontSize: wp(4),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
  },
  searchItemUsername: {
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray,
    marginTop: hp(0.5),
  },
  removeButton: {
    padding: wp(2),
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(10),
  },
  emptyText: {
    fontSize: wp(4),
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.gray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 