import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../../../theme";


export const styles = StyleSheet.create({

    container:{
        
    },
    list: {
        flex: 1,
        paddingHorizontal: wp(4),
        paddingTop: hp(2)
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      footerLoader: {
        paddingVertical: hp(2),
        alignItems: 'center'
      }

})