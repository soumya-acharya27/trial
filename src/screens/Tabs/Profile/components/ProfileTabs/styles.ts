import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { theme } from "../../../../../theme";

export const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        borderBottomWidth: wp(0.1),
        borderBottomColor: "#717171",
        marginBottom: hp(1),
    },
    tabButton: {
        flex: 1,
        paddingVertical: hp(1),
        alignItems: "center",
        borderBottomWidth: wp(0.6),
        borderBottomColor: "transparent",
    },
    activeTabButton: {
        borderBottomColor: theme.colors.orange, 
    },
    tabText: {
        fontSize: wp(3.5),
        color: "#717171",
        fontFamily: theme.fontFamily.regular
    },
    activeTabText: {
        fontFamily: theme.fontFamily.bold,
        color: "white",
    },
})