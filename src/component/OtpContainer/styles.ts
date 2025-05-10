import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp(2),
    },
    input: {
      width: wp(12),
      height: wp(12),
      marginHorizontal: wp(1.5),
      borderWidth: wp(0.5),
      borderColor: "#f5f5f5",
      textAlign: "center",
      fontSize: 18,
      backgroundColor: theme.colors.bgColor,
      color:'white'
    },
});