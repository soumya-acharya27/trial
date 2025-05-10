import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../../theme';

export const styles = StyleSheet.create({
  upcomingCard: {
    backgroundColor: '#243139',
    padding: 10,
    marginRight:10,
    width: wp(85),
  },
  category: {
    backgroundColor:'#0B1E29',
    color: 'white',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(5),
    alignSelf: 'flex-start',
    fontSize: wp(3.5),
    fontFamily: theme.fontFamily.regular,
  },
  image: {
    height: hp(22),
    justifyContent: 'flex-end',
    marginTop: 10,
    backgroundColor:'powderblue'
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
    margin: 10,
  },
  dateText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  content: {
    paddingVertical: 10,
  },
  datetitle: {
    fontSize: wp(3.5),
    fontWeight: 'bold',
    color: 'white',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  location: {
    color: 'white',
    fontFamily: theme.fontFamily.regular,
    marginLeft: wp(1),
    fontSize: wp(3.2),
  },
  title: {
    fontSize: wp(4.2),
    fontFamily: theme.fontFamily.medium,
    color: 'white',
    paddingHorizontal: wp(2),
    paddingBottom: hp(1),
},
}); 