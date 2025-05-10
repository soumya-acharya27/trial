import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  emptyTitle: {
    color: '#FFEEE6',
    fontSize: wp(4.5),
    fontWeight: '600',
    marginBottom: hp(1),
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#818181',
    fontSize: wp(3.5),
    textAlign: 'center',
    lineHeight: hp(2.5),
  },
}); 