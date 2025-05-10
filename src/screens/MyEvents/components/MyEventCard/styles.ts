import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import { theme } from "../../../../theme";

export const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#243139',
      borderWidth: wp(0.2),
      borderColor: '#a0a0a0',
      paddingHorizontal: wp(2),
      paddingTop: hp(2),
      width: wp(42),
      margin: wp(2),
      alignItems: 'center',
    },
    image: {
      width: wp(20),
      height: wp(20),
      borderRadius: wp(10),
      marginBottom: hp(1),
      backgroundColor:'powderblue',
    },
    title: {
      fontSize: wp(4.2),
      color:'white',
      fontFamily: theme.fontFamily.boldSemi,
      marginBottom: hp(1),
    },
  });
  