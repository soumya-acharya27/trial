import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../../../../theme';

export const styles = StyleSheet.create({
  menuButton: {
    padding: wp(2),
    position: 'absolute',
    right: wp(2),
    top: hp(1),
    zIndex: 1
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  menuContainer: {
    backgroundColor: '#243139',
    borderRadius: wp(2),
    minWidth: wp(35),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: hp(1.8),
    fontFamily: 'Roboto-Regular',
  },
  blockText: {
    color: '#FF4D4D',
  },
}); 