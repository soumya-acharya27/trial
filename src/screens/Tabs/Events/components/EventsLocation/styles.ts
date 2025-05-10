import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(2),
  },
  headerTitle: {
    fontSize: hp(2.2),
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.white,
    marginLeft: wp(4),
  },
  searchContainer: {
    backgroundColor: '#243139',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginHorizontal: wp(4),
    height: hp(6)
  },
  searchIcon: {
    marginRight: wp(3),
    tintColor: '#8F9BB3'
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: hp(1.8),
    padding: 0,
    fontFamily: theme.fontFamily.light
  },
  locationsList: {
    flex: 1,
    marginTop: hp(2),
    paddingHorizontal: wp(4)
  },
  locationItem: {
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  locationText: {
    fontSize: hp(1.8),
    color: '#FFFFFF',
    fontFamily: theme.fontFamily.regular
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: hp(1.8),
    color: '#FFFFFF',
    fontFamily: theme.fontFamily.regular
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4)
  },
  emptyText: {
    fontSize: hp(1.8),
    color: '#8F9BB3',
    fontFamily: theme.fontFamily.regular
  }
}); 