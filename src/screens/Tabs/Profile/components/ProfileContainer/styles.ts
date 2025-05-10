import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../../../../theme";

export const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingHorizontal: wp(4),
        // borderRadius: wp(5),
        borderWidth: wp(0.2),
        borderColor: theme.colors.borderGray,
    },
    headerContainer: {
        flexDirection:'row',
        marginTop: hp(1),
        marginBottom: hp(2)
    },
    img: {
        height: wp(20),
        width: wp(20),
        borderRadius: wp(10),
        marginRight: wp(5),
    },
    userNameContainer: {
        flex:1,
        justifyContent:'center',
    },
    boldText: {
        fontFamily:theme.fontFamily.bold,
        fontSize: wp(6),
        color: 'white'  
    },
    userNameText: {
        fontFamily: theme.fontFamily.regular,
        color: '#BEBAB9',
        fontSize: wp(4)
    },
    svgMargin: {
        marginRight: wp(3),
    },
    svgContainer: {
        flexDirection:'row',
        marginBottom: hp(1.5)
    },
    txt: {
        color: "#BEBAB9",
        fontFamily: theme.fontFamily.medium,
        lineHeight: hp(2),
        fontSize: wp(3.5)
    }
})