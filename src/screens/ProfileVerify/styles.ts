import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    main: {
        paddingVertical: hp(1),
        paddingHorizontal: hp(2),
        flex: 1,
        backgroundColor: theme.colors.bgColor
    },
    container: {
        flex: 1,
        width: '100%',
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('3%'),
    },
    stepActive: {
        alignItems: 'center',
        flex: 1,
    },
    dottedUnderLineLeft: {
        position: 'absolute',
        borderTopWidth: wp(0.5),
        borderColor: 'red',
        width: '50%',
        borderStyle: 'dashed',
        alignSelf: 'flex-start',
        top: hp(1.5)
    },
    dottedUnderLineRight: {
        position: 'absolute',
        borderTopWidth: wp(0.5),
        borderColor: 'red',
        width: '50%',
        borderStyle: 'dashed',
        alignSelf: 'flex-end',
        top: hp(1.5)
    },
    stepNumberActive: {
        backgroundColor: theme.colors.orange,
        color: '#fff',
        borderRadius: wp('3.5%'),
        textAlign: 'center',
        paddingTop: wp(1.2),
        width: wp('7%'),
        height: wp('7%'),
        fontSize: wp('3%'),
        zIndex: 1
    },
    greenActive: {
        backgroundColor: theme.colors.green,
        color: '#fff',
        borderRadius: wp('3.5%'),
        textAlign: 'center',
        paddingTop: wp(1.2),
        width: wp('7%'),
        height: wp('7%'),
        fontSize: wp('3%'),
        zIndex: 1
    },
    greenLabelActive: {
        color: theme.colors.green,
        marginTop: hp('1%'),
        fontSize: wp('3%'),
    },
    stepLabelActive: {
        color: theme.colors.orange,
        marginTop: hp('1%'),
        fontSize: wp('3%'),
    },
    stepInactive: {
        alignItems: 'center',
        flex: 1,
    },
    stepNumberInactive: {
        backgroundColor: '#A0A4A8',
        color: '#fff',
        borderRadius: wp('3.5%'),
        textAlign: 'center',
        paddingTop: wp(1.2),
        width: wp('7%'),
        height: wp('7%'),
        fontSize: wp('3%'),
        zIndex: 1
    },
    stepLabelInactive: {
        color: '#A0A4A8',
        marginTop: hp('1%'),
        fontSize: wp('3%'),
    },
    formContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('2%'),
    },
    inputContainer: {
        width: wp('45%'),
    },
    inputContainerFull: {
        marginBottom: hp('2%'),
    },
    label: {
        color: '#fff',
        marginBottom: hp('1%'),
        fontSize: wp('4%'),
        fontFamily: theme.fontFamily.regular
    },
    clgTxt: {
        color: theme.colors.gray,
        marginBottom: hp(2),
        fontSize: wp('3.8'),
        fontFamily: theme.fontFamily.regular,
        lineHeight: hp(2),
        letterSpacing: wp(0.2)
    },
    docTxt: {
        color: theme.colors.gray,
        fontSize: wp('4%'),
        marginBottom: hp(0.5),
        fontFamily: theme.fontFamily.regular,
        lineHeight: hp(2),
        letterSpacing: wp(0.2)
    },
    input: {
        backgroundColor: '#243139',
        color: '#fff',
        padding: hp('1%'),
        fontSize: wp('4%'),
        borderWidth: wp(0.2),
        borderColor: '#a0a0a0'
    },
    buttonContainer: {
        alignItems: 'center'
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(3),
    },
    line: {
        flex: 1,
        height: hp(0.1),
        backgroundColor: theme.colors.underlineGray
    },
    orText: {
        marginHorizontal: wp(2),
        color: theme.colors.underlineGray,
        fontSize: wp(3.3),
        fontFamily: theme.fontFamily.regular
    },
    documentContainer: {
        height: hp('6%'),
        width: wp('90%'),
        backgroundColor: '#243139',
        borderWidth: wp(0.2),
        borderColor: '#a0a0a0',
        justifyContent: 'center',
        paddingHorizontal: wp('2%'),
    },
    uploadTxt: {
        color: '#a0a0a0',
        fontSize: wp('3.5%'),
        fontFamily: theme.fontFamily.regular
    },
    uploadIcon: {
        position:'absolute',
        right: wp(2)
    },
    uploadContainer: {
        height: hp(25),
        width: '100%',
        backgroundColor: '#243139',
        borderWidth: wp(0.2),
        borderColor: "#a0a0a0",
        borderStyle: 'dashed',
        marginTop: hp(5),
        alignItems:'center',
        justifyContent:'center'
    },
    uploadMainTxt: {
        color: 'white',
        fontSize: wp('4.2'),
        marginTop: hp(2),
        fontFamily: theme.fontFamily.regular
    },
    uploadSubTxt: {
        color: '#818486',
        fontSize: wp('4.2'),
        marginTop: hp(0.2),
        fontFamily: theme.fontFamily.regular
    },
    uploadDocumentContainer: {
        height: hp('10'),
        width: wp('90%'),
        backgroundColor: '#243139',
        borderWidth: wp(0.2),
        borderColor: '#a0a0a0',
        justifyContent: 'center',
        paddingHorizontal: wp('2%'),
        marginTop: hp(5)
    },
    closeIcon: {
        position:'absolute',
        top: hp(1.5),
        right: hp(1.5)
    },
    textConatiner:{
        marginTop:hp('3'),
    },
    createText: {
        color: theme.colors.white,
        fontSize: wp('7'),
        textAlign: 'center',
        fontFamily:theme.fontFamily.medium 
    },
    letsText: {
        color: theme.colors.white,
        fontSize: wp('4'),
        width: wp(85),
        textAlign: 'center',
        fontFamily:theme.fontFamily.medium,
        marginTop:hp('1'),
        marginBottom: hp(2)
    },
    innerContainer: {
        flex:1, 
        marginBottom: hp(1),
        marginTop: hp(1)
    },
    resendTxt: {
        fontSize: wp(3.3),
        color: '#BEBAB9',
        marginTop: hp(2),
        marginBottom: hp(14)
    },
    docNameContainer: {
        flex:1,
        alignItems:'center',
        flexDirection:'row'
    },
    greenColor: {
        width:'100%',
        height: hp(0.2),
        backgroundColor:'#00AF45',
        marginBottom: hp(1.5),
    },
    fileName: {
        paddingLeft: wp(3),
        color: theme.colors.white,
        fontSize: wp('4'),
        fontFamily:theme.fontFamily.medium 
    },
    fileSize: {        
        paddingLeft: wp(3),
        marginTop: hp(0.5),
        color: '#818486',
        fontSize: wp(3),
        fontFamily:theme.fontFamily.medium 
    }
})