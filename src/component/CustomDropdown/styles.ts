import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
      marginBottom: hp('2%'),
      zIndex: 100
    },
    label: {
      fontSize: wp('4%'),
      color: '#fff',
      marginBottom: hp('1%'),
    },
    dropdown: {
      height: hp('6%'),
      width: wp('90%'),
      backgroundColor: '#243139',
      borderWidth: wp(0.2),
      borderColor: '#a0a0a0',
      justifyContent: 'center',
      paddingHorizontal: wp('2%'),
    },
    selectedText: {
      color: '#fff',
      fontSize: wp('4%'),
    },
    dropdownMenu: {
      position: 'absolute',
      top: hp('10%'),
      left: 0,
      backgroundColor: '#243139',
      width: wp('90%'),
      maxHeight: hp('20%'),
      zIndex: 200,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
      marginTop: hp(0.5),
    },
    dropdownItem: {
      paddingVertical: hp('2%'),
      paddingHorizontal: wp('4%'),
      borderBottomWidth: 1,
      borderBottomColor: '#a0a0a0',
    },
    itemText: {
      color: '#fff',
      fontSize: wp('4%'),
    },
  });