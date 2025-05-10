import { getTheme } from '../../theme';
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const theme = getTheme(wp, hp);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
    paddingHorizontal: wp('4'),
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp('3'),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: wp('3'),
  },
  messageInfo: {
    flex: 1,
  },
  name: {
    fontSize: wp('4'),
    color: '#FFEEE6',
    fontFamily: theme.fontFamily.medium
  },
  message: {
    fontSize: wp('3.5'),
    color: '#FFEEE6',
    fontFamily: theme.fontFamily.medium,
    marginTop: hp('1')
  },
  time: {
    fontSize: wp('3.5'),
    color: '#717171',
    fontFamily: theme.fontFamily.medium
  },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    flexDirection: 'row'
  },
  backContainer: {
    paddingTop: hp('1')
  },
  title: {
    fontSize: wp('5'),
    color: '#FFEEE6',
    marginTop: wp('2'),
    marginLeft: wp('2.5'),
    fontFamily: theme.fontFamily.boldSemi
  },
})