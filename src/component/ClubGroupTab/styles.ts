import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal:wp('2')
    },
    SelectText:{
        fontFamily:theme.fontFamily.medium,
        fontSize:wp('4'),
        backgroundColor :theme.colors.orange,
        borderRadius:wp('5'),
        paddingTop:wp('2.5'),
        paddingBottom:wp('2.5'),
        paddingHorizontal:wp('3'),
        color:theme.colors.white

    },
    normalText:{
        fontFamily:theme.fontFamily.medium,
        fontSize:wp('4'),
        paddingTop:wp('2.5'),
        paddingBottom:wp('2.5'),
        paddingHorizontal:wp('3'),
        color:"#717171",
        backgroundColor :theme.colors.white,
        borderRadius:wp('5'),
        borderColor:"#E3E3E3",
        borderWidth:1,
    }
}); 