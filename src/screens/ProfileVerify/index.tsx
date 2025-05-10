import { View, Text, Image,  TextInput, TouchableOpacity, Pressable, BackHandler, KeyboardAvoidingView, ScrollView, PermissionsAndroid, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { styles } from './styles'
import { ButtonCustom } from '../../component/ButtonCustom'
import { useNavigation, useRoute } from '@react-navigation/native'
import { theme } from '../../theme'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CompleteSignupInput, CompleteSignupResponse, SendVerificationOTPInput, SendVerificationOTPResponse, SendVerificationRequestResponse, SendVerificationRequestVariables, User, ValidateUsernameResult, ValidateUsernameVariables, VerifyCollegeEmailInput, VerifyCollegeEmailResponse } from '../../interface/signUpInterface'
import { VALIDATE_USERNAME } from '../../graphql/auth/authQuery'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux-saga/rootReducer'
import { COMPLETE_SIGNUP, RESEND_OTP, SEND_VERIFICATION_OTP, SEND_VERIFICATION_REQUEST, VERIFY_COLLEGE_EMAIL } from '../../graphql/auth/authMutation'
import { DOCUMENT_TYPE, otpResendTimeinSecs, showErrorToast, uploadFileToS3, uploadPDFtoS3, validateEmail } from '../../utils'
import { storeCredentials, storeUserInfo } from '../../redux-saga/auth/authAction'
import CustomDropdown from '../../component/CustomDropdown'
import Upload from "../../assets/svg/Upload.svg"
import Document from "../../assets/svg/Document.svg"
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import Close from "../../assets/svg/Close.svg"
import OTPInput from '../../component/OtpContainer'
import { useGetUserInfo } from '../../hooks/useGetUserInfoHook'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { STORAGE_CREDENTIALS } from '../../constants'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { GetDocumentUploadUrlResponse, GetDocumentUploadUrlVariables } from '../../interface'
import { GET_DOCUMENT_UPLOAD_URL } from '../../graphql/user/userQuery'
import Toast from '../../components/Toast'
import { logger } from '../../utils/logger'
import { launchImageLibrary } from 'react-native-image-picker'

const ProfileVerify = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        username: '',
        bio: '',
        college: '',
    });
    const [email, setEmail] = useState('')
    const [invalidMail, setInvalidMail] = useState(false)
    const [selectedDocType, setSelectedDocType] = useState('')
    const [showEmailOtp, setShowEmailOtp] = useState(false)

    const [showDocPage, setShowDocPage] = useState(false)
    const [uploadDocClicked, setUploadDocClicked] = useState(false)
    // const [pickedFile, setPickedFile] = useState<DocumentPickerResponse | null>(null)
    const dispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const token = useSelector((state: RootState) => state.authReducer.accessToken)
    const { step = 1, goBack } = useRoute().params as { step?: number, goBack:() => void } ?? {} as { step?: number , goBack:() => void }
    const [steps, setSteps] = useState(step)
    const [formSubmitted, setForSubmitted] = useState(false)
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [invalidOtp, setInvalidOtp] = useState(false)
    const [resentDisabled, setResentDisabled] = useState(true);
    const [timer, setTimer] = useState(otpResendTimeinSecs);
    const { userData, userError, userLoading, fetchUserInfo } = useGetUserInfo()

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

    const [selectedImage, setSelectedImage] = useState<string | null | undefined>(data?.profilePicId ?? '');
    const [fileName, setFileName ] = useState<any>({})
    
      
  const [resendOTP, { data:resendData, loading:resendLoading, error:resendError }] = useMutation(RESEND_OTP, {    
    context: {
        headers: {
            authorization: `Bearer ${token}`,
        }
    },
    onCompleted: (response) => {
    },
    onError: (err) => {
      console.error("Error resending OTP:", err);
    },
  });

  const resendCta = async () => {
    setTimer(otpResendTimeinSecs); 
    setResentDisabled(true); 
    try {

      const response = await resendOTP({
        variables: { email: email },
      });  
      setToastMessage('OTP Sent.');
      setToastType('success');
      setShowToast(true);      
    } catch (err) {
        setToastMessage('Failed to send OTP.');
        setToastType('error');
        setShowToast(true);
        console.error("Error invoking resendOTP:", err);
    }
}


    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setResentDisabled(false);
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const [completeSignup, { loading: completeSignUpLoading, error: completeSignUpError, data: completeSignUpData }] = useMutation<CompleteSignupResponse, { input: CompleteSignupInput }>(COMPLETE_SIGNUP, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onCompleted: async (response) => {
            const credentials = await AsyncStorage.getItem(STORAGE_CREDENTIALS)
            if(!!credentials){
                const creds = JSON.parse(credentials)
                const newCred = {...creds}
                newCred.onboarding.isCompleted = true;
                AsyncStorage.setItem(STORAGE_CREDENTIALS, JSON.stringify(newCred)) 
            }
            

            dispatch(storeUserInfo({...response?.completeSignup?.user, profileUnderReview: false} as User))
            setSteps(2)
        },
        onError: (err) => {
            console.log("err is ", err)
        }
    });

    const backCta = () => {
        if (showDocPage || showEmailOtp) {
            setShowDocPage(false)
            setShowEmailOtp(false);
            // setPickedFile(null)
            setFileName({})
            setSelectedImage('')
            return;
        }

        if(step === 2){     //not from login flow
            navigation.goBack()
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                backCta()
                return true;
            },
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    const [sendVerificationOtp, { loading: otpLoading, error: otpError, data: otpData }] = useMutation<SendVerificationOTPResponse, SendVerificationOTPInput>(SEND_VERIFICATION_OTP, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onError: (err) => {
            showErrorToast("email might not be edu email")
        }
    })
    const [verifyCollegeEmail, { loading: verifyLoading, error: verifyError, data: verifyData }] = useMutation<VerifyCollegeEmailResponse, VerifyCollegeEmailInput>(VERIFY_COLLEGE_EMAIL, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onCompleted: async (data) => {
            const credentials = await AsyncStorage.getItem(STORAGE_CREDENTIALS)
            if (data?.verifyCollegeEmail?.success && credentials) {
                const creds = JSON.parse(credentials)
                try {
                    const response = await fetchUserInfo({
                        context: {
                            headers: {
                                authorization: `Bearer ${creds?.accessToken}`,
                            }
                        },
                        variables: { userId: creds?.id }
                    });
                    dispatch(storeUserInfo({...response?.data?.getUserInfo?.user, profileUnderReview: response?.data?.getUserInfo?.profileUnderReview} as User))
                    dispatch(storeCredentials(creds))
                    navigation.navigate('TabNevigator')
                } catch (err) {
                    console.error('Error fetching user info:', err);
                }
            } else {
                // showErrorToast('invalid OTP')

                setToastMessage('Invalid OTP');
                setToastType('error');
                setShowToast(true);
            }
        }
    })

    const [sendVerificationRequest] = useMutation<
        SendVerificationRequestResponse,
        SendVerificationRequestVariables
    >(SEND_VERIFICATION_REQUEST, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onCompleted: (data) => {
            ToastAndroid.show('Attached successfully.', ToastAndroid.SHORT)
            navigation.navigate('profileVerificationPending')
        },
        onError: () => {
            console.log("error upload file")
        }
    });


    const [fetchDocumentUploadUrl, { data: documentUploadData, loading: documentUploadLoading, error: documentUploadError }] = useLazyQuery<
        GetDocumentUploadUrlResponse,
        GetDocumentUploadUrlVariables
    >(GET_DOCUMENT_UPLOAD_URL, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onError: (err) => {
            console.log("err uploading doc ", err)
        },
        onCompleted: async (data) => {
            logger.debug('document upload key file ', {data, fileName})
            const fileUpload = {
                uri: fileName?.uri ?? '', // Path to your file
                type: fileName?.type ?? "pdf",
                name: fileName?.name ?? '',
            };
            logger.debug({fileUpload})
            // await uploadPDFtoS3(data?.getDocumentUploadUrl?.url ?? '', fileUpload)
            await uploadFileToS3(data?.getDocumentUploadUrl?.url ?? '', fileUpload)
            await sendVerificationRequest({
                variables: {
                  input: {
                    key: data?.getDocumentUploadUrl?.key,
                    documentType: selectedDocType === 'Marksheet' ? DOCUMENT_TYPE.MARKSHEET : selectedDocType === 'ID Card' ?DOCUMENT_TYPE.ID_CARD : DOCUMENT_TYPE.FEE_RECIPT, // Optional field
                  },
                },
              });
        }
    });


    const [checkUsername, { data, loading, error }] = useLazyQuery<
        ValidateUsernameResult,
        ValidateUsernameVariables
    >(VALIDATE_USERNAME, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onCompleted: (data) => {
        },
        onError: (err) => {
            console.log(err)
        }
    });

    const handleUsernameChange = (text: string) => {
        if (text.length > 0) {
            checkUsername({ variables: { userName: text } });
        }
    };

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const onProceed = async () => {
        setForSubmitted(true)

        if (form.firstName?.length === 0 || form.lastName?.length === 0 || form?.username?.length === 0 || !data?.validateUsername?.available) {
            return;
        }

        try {
            await completeSignup({
                variables: {
                    input: {
                        userName: form.username,
                        name: form.firstName + " " + form.lastName,
                        college: form.college,
                        bio: form.bio
                    }
                }
            });
        } catch (err) {
            showErrorToast("Error signin up, Try later")
        }
    }

    const getEmailOtp = async () => {
        if (!validateEmail(email)) {
            setInvalidMail(true)
            setToastMessage('Invalid Email');
            setToastType('error');
            setShowToast(true);
            return;
        }

        setInvalidMail(false)
        setShowEmailOtp(true)
        try {
            const response = await sendVerificationOtp({ variables: { email } });
            setToastMessage('OTP Sent.');
            setToastType('success');
            setShowToast(true);
        } catch (err) {
            console.log("err sending otp", err)
        }
    }

    const navigateToUpload = () => {
        setUploadDocClicked(true)
        if (selectedDocType?.length === 0) {
            return;
        }
        setShowDocPage(true)
        setUploadDocClicked(false)
    }

    const verifyDoc = () => {
        if (!fileName?.uri?.length) {
            showErrorToast("Please Attach a document and then proceed")
            return;
        }

        logger.debug('file name is ',fileName, fileName?.type?.split("/")[1] ?? "pdf" )
        fetchDocumentUploadUrl({
            variables: {
                input: {
                    fileType: fileName?.type ?? "pdf"
                },
            },
        });
    }

    const attachFile = () => {
        setShowDocPage(false)
    }

    // const openPdfPicker = async () => {
    //     const pickedFile = await DocumentPicker.pickSingle({
    //         type: [DocumentPicker.types.pdf],

    //     })
    //     logger.debug('picked file is ', pickedFile)
    //     setPickedFile(pickedFile)
    // }

    const handleImagePicker = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'We need access to your camera to take a picture.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const options = {
                mediaType: 'photo' as 'photo',
                includeBase64: false,
            };

            launchImageLibrary(options, async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    const asset = response.assets ? response.assets[0] : null;
                    const { fileName, type, uri } = asset ?? {}
                    setSelectedImage(uri);
                    setFileName({
                        uri: uri,
                        type: fileName?.split?.('.')?.[1] ?? '',
                        name: fileName ?? '',
                    })
                    // const data = await getPostMediaUploadUrl( fileName?.split?.('.')?.[1] ?? '')
                    // setKeys(data ? data : null)
                    // const fileUpload = {
                    //     uri: uri ?? '', // Path to your file
                    //     type: fileName?.split?.('.')?.[1] ?? '',
                    //     name: fileName ?? '',
                    // };
                    // await uploadFileToS3(data?.url ?? '', fileUpload)
                }
            });
        } else {
            console.log('Camera permission denied');
        }
    };

    const verifyEmail = async () => {
        try {
            const response = await verifyCollegeEmail({ variables: { id: otpData?.sendVerificationOTP?.id ?? '', otp: otp?.join('') } });
        } catch (error) {
            console.error('Error verifying email:', error);
            // showErrorToast("invalid otp")
            setInvalidOtp(true)

            setToastMessage('Invalid OTP');
            setToastType('error');
            setShowToast(true);
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <Header onSkipPress={() => goBack ? goBack() : navigation.navigate('TabNevigator')} showSkipNow={steps===2} showBack={showDocPage || showEmailOtp} onBack={backCta} name='Profile Verification'  />
            <View style={styles.main}>
                <View style={styles.container}>
                    {!showDocPage && <View style={styles.stepsContainer}>
                        <View style={styles.stepActive}>
                            <Text style={[steps === 1 && styles.stepNumberActive, steps === 2 && styles.greenActive]}>1</Text>
                            <Text style={[steps === 1 && styles.stepLabelActive, steps === 2 && styles.greenLabelActive]}>Basic Details</Text>
                            <View style={[styles.dottedUnderLineLeft, { borderColor: steps === 1 ? theme.colors.orange : theme.colors.green }]} />
                            <View style={[styles.dottedUnderLineRight, { borderColor: steps === 1 ? theme.colors.underlineGray : theme.colors.green }]} />
                        </View>
                        <View style={styles.stepInactive}>
                            <Text style={[steps === 1 && styles.stepNumberInactive, steps === 2 && styles.stepNumberActive]}>2</Text>
                            <Text style={[steps === 1 && styles.stepLabelInactive, steps === 2 && styles.stepLabelActive]}>College Info</Text>
                            <View style={[styles.dottedUnderLineLeft, { borderColor: steps === 1 ? theme.colors.underlineGray : steps === 2 ? theme.colors.orange : theme.colors.green }]} />
                            <View style={[styles.dottedUnderLineRight, { borderColor: steps === 1 ? theme.colors.underlineGray : steps === 2 ? theme.colors.underlineGray : theme.colors.green }]} />
                            <View />
                        </View>
                    </View>}

                    {steps === 1 && <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>First Name*</Text>
                                <TextInput onChangeText={(value) => handleChange('firstName', value)} value={form.firstName} style={[styles.input, formSubmitted && form.firstName.length === 0 && { borderColor: 'red' }]} placeholder="First Name" placeholderTextColor="#888" />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Last Name*</Text>
                                <TextInput onChangeText={(value) => handleChange('lastName', value)} value={form.lastName} style={[styles.input, formSubmitted && form.lastName.length === 0 && { borderColor: 'red' }]} placeholder="Last Name" placeholderTextColor="#888" />
                            </View>
                        </View>

                        <View style={styles.inputContainerFull}>
                            <Text style={styles.label}>Username*</Text>
                            <TextInput onEndEditing={e => handleUsernameChange(e.nativeEvent.text)} onChangeText={(value) => handleChange('username', value)} value={form.username} style={[styles.input, formSubmitted && form.username.length === 0 && { borderColor: 'red' }]} placeholder="@" placeholderTextColor="#888" />
                            {error && <Text style={{ color: 'red', }}>Error: {error.message}</Text>}
                            {data && (
                                <Text style={{ color: data.validateUsername.available ? 'green' : 'red' }}>
                                    {data.validateUsername.available
                                        ? 'Username is available!'
                                        : 'Username is taken.'}
                                </Text>
                            )}
                        </View>

                        <View style={styles.inputContainerFull}>
                            <Text style={styles.label}>Bio</Text>
                            <TextInput onChangeText={(value) => handleChange('bio', value)} value={form.bio} style={styles.input} placeholder="Bio" placeholderTextColor="#888" />
                        </View>

                        <View style={styles.inputContainerFull}>
                            <Text style={styles.label}>College/University</Text>
                            <TextInput onChangeText={(value) => handleChange('college', value)} value={form.college} style={styles.input} placeholder="Enter College/University" placeholderTextColor="#888" />
                        </View>
                    </ScrollView>}

                    {steps === 2 && !showDocPage && !showEmailOtp && <View style={styles.formContainer}>
                        <Text style={styles.clgTxt}>If you have a college/university email address. Please enter your email and get it verified.</Text>
                        <View style={styles.inputContainerFull}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput onChangeText={(value) => setEmail(value)} value={email} style={styles.input} placeholder="Email Address" placeholderTextColor="#888" />
                            {invalidMail && !validateEmail(email) && <Text style={{ color: 'red', }}>Please Enter valid mail</Text>}
                        </View>
                        <ButtonCustom title='Get OTP' onPress={getEmailOtp} />

                        <View style={styles.orContainer}>
                            <View style={styles.line} />
                            <Text style={styles.orText}>OR</Text>
                            <View style={styles.line} />
                        </View>

                        <Text style={styles.docTxt}>If you have a college/university email address. Please enter your email and get it verified.</Text>
                        <CustomDropdown
                            value={selectedDocType}
                            label="Select Document Type"
                            data={['Marksheet', 'ID Card', 'Fee Receipt']}
                            onSelect={(value) => setSelectedDocType(value)}
                        />
                        {uploadDocClicked && selectedDocType?.length === 0 && <Text style={{ color: 'red', }}>Please select Document type</Text>}

                        <TouchableOpacity onPress={navigateToUpload} style={styles.documentContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {!!fileName && <Document style={{ marginRight: heightPercentageToDP(0.5) }} height={heightPercentageToDP(2)} width={heightPercentageToDP(2)} />}
                                <Text style={styles.uploadTxt}>{!!fileName ? fileName?.name : 'Upload Document'}</Text>
                            </View>

                            <View style={styles.uploadIcon}>
                                <Upload height={heightPercentageToDP(2)} width={heightPercentageToDP(2)} />
                            </View>
                        </TouchableOpacity>

                    </View>}


                    {steps === 2 && showDocPage && !showEmailOtp && <View style={styles.formContainer}>
                        <Pressable onPress={handleImagePicker} style={styles.uploadContainer}>
                            <Upload height={heightPercentageToDP(5)} width={heightPercentageToDP(5)} />
                            <Text style={styles.uploadMainTxt}>Click to Upload or Drop</Text>
                            <Text style={styles.uploadSubTxt}>Max. File Size: 10 MB</Text>
                        </Pressable>
                        {/* {!!pickedFile && !!pickedFile?.size && pickedFile?.size > 10000000 && <Text style={{ color: 'red', }}>File uploaded more than 10 MB</Text>} */}
                        {!!fileName && selectedImage?.length && <View style={styles.uploadDocumentContainer}>
                            <View style={styles.docNameContainer}>
                                <Document height={heightPercentageToDP(2)} width={heightPercentageToDP(2)} />
                                <View style={{flexDirection:'row', marginLeft: widthPercentageToDP(2), alignItems:'center'}}>
                                    <Image
                                        style={{height: heightPercentageToDP(3), width:heightPercentageToDP(3) }}
                                        source={{
                                            uri: selectedImage,
                                        }}
                                    />
                                    <Text style={styles.fileName}>{fileName?.name}</Text>
                                    {/* <Text style={styles.fileSize}>100%</Text> */}
                                </View>
                            </View>

                            <View style={styles.greenColor} />
                            <Pressable onPress={() => {setFileName({}) ; setSelectedImage('')}} style={styles.closeIcon}>
                                <Close height={heightPercentageToDP(1)} width={heightPercentageToDP(1)} />
                            </Pressable>
                        </View>}
                    </View>}

                    {steps === 2 && showEmailOtp && <View style={styles.formContainer}>
                        <View style={styles.textConatiner}>
                            <Text style={styles.createText}>OTP Verification</Text>
                            <Text style={styles.letsText}>We have sent OTP on {email}</Text>
                        </View>

                        <View style={styles.innerContainer}>
                            <OTPInput error={invalidOtp} otp={otp} setOtp={setOtp} />
                                <View style={{ flexDirection:'row', justifyContent:'center'}}>
                                    <Text style={styles.resendTxt}>{`Resend code in ${timer?.toString()?.padStart(2, '0')} seconds`}</Text>
                                    <Pressable onPress={resendCta}>
                                        <Text style={[styles.resendTxt,  {color:'white', fontFamily: theme.fontFamily.medium, paddingTop: heightPercentageToDP(0.15)}]}>{timer !== 0 ? '' : ' Resend'}</Text>
                                    </Pressable>
                                </View>
                                                        
                                <ButtonCustom disabled={verifyLoading} title='Verify' onPress={verifyEmail} />
                        </View>
                    </View>}

                    <Toast
                        visible={showToast}
                        message={toastMessage}
                        type={toastType}
                        onHide={() => setShowToast(false)}
                    />

                    {!showEmailOtp && <View style={styles.buttonContainer}>
                        <ButtonCustom disabled={completeSignUpLoading || loading} title={steps === 1 ? 'Proceed' : steps === 2 && !showDocPage ? 'Verify' : 'Attach File'} onPress={steps === 1 ? onProceed : steps === 2 && !showDocPage ? verifyDoc : attachFile} />
                    </View>}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ProfileVerify