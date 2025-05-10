import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: wp('80%'),
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  primaryButton: {
    backgroundColor: '#007bff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
  primaryText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ccc',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
    borderRadius: wp('2%'),
  },
  secondaryText: {
    color: '#000',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
});
