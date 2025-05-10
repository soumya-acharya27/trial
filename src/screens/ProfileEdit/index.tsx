import { View, Text, BackHandler, Pressable, Image, PermissionsAndroid, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import TextInputCustom, { TextInputSecondary } from '../../component/TextInputCustom';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import FirstName from "../../assets/svg/firstName.svg"
import LastName from "../../assets/svg/lastName.svg"
import Bank from "../../assets/svg/banklight.svg"
import Call from "../../assets/svg/call.svg"
import Note from "../../assets/svg/Note.svg"
import Sms from "../../assets/svg/sms.svg"
import Back from "../../assets/svg/Back.svg"
import Camera from "../../assets/svg/camera.svg"
import { ButtonCustom } from '../../component/ButtonCustom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../graphql/user/userMutation';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-saga/rootReducer';
import { launchImageLibrary } from 'react-native-image-picker';
import { FileInput, UrlResponse } from '../../interface/postinterface';
import { getDummyProfile, uploadFileToS3 } from '../../utils';
import { GET_PROFILE_PIC_UPLOAD_URL } from '../../graphql/user/userQuery';
import { GetProfilePicUploadUrlInput, GetProfilePicUploadUrlResponse } from '../../interface';
import { EditUserProfileResult, EditUserProfileVariables, GetUserProfileResult, User, ValidateUsernameResult, ValidateUsernameVariables } from '../../interface/signUpInterface';
import { VALIDATE_USERNAME } from '../../graphql/auth/authQuery';


const ProfileEdit = () => {
    const route = useRoute()
    const credentials = useSelector((state: RootState) => state.authReducer)
    const token = useSelector((state: RootState) => state.authReducer.accessToken)
    const { userData: data } = route.params as { userData: User }
    const [updateUserProfile, { loading: updateLoading, data: updateData, error: updateError }] = useMutation<EditUserProfileResult, EditUserProfileVariables>(UPDATE_USER, {
        context: {
            headers: {
                authorization: `Bearer ${credentials?.accessToken}`,
            }
        }
    });
    const [name, setName] = useState(data?.name ?? '')
    const [email, setEmail] = useState(data?.email ?? '')
    const [userName, setuserName] = useState(data?.userName ?? '')
    const [college, setCollege] = useState(data?.college ?? '')
    const [bio, setBio] = useState(data?.bio ?? '')
    const [mobile, setMobile] = useState(data?.phoneNumber ?? '')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [uploadImageLoading, setUploadImageLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null | undefined>(data?.profilePicId ?? '');
    const [keys, setKeys] = useState<null | UrlResponse>(null)
    const [isProfilePicUpdated, setIsProfilePicUpdate] = useState(false)
    const [getProfilePicUploadUrl, { loading: profilePicUploadLoading }] = useLazyQuery<
        GetProfilePicUploadUrlResponse,
        GetProfilePicUploadUrlInput
    >(GET_PROFILE_PIC_UPLOAD_URL,{
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
    });

    const isValidForm = name?.length > 0 && userName?.length > 0 && college?.length > 0
    // const isValidForm = name?.length > 0 && email?.length > 0 && userName?.length > 0 && college?.length > 0 && mobile?.length > 0

    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const goBack = () => navigation.goBack()

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                goBack()
                return true;
            },
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    const updateCta = async () => {
        setFormSubmitted(true)

        if (!isValidForm) return;
        try {
            const payload : EditUserProfileVariables["input"] = {
                bio: bio,
                name: name,
                userName: userName,
                college: college,
                // email: email,
                // phoneNumber: mobile,
                // profilePicId: keys?.key?.length ? keys?.key : selectedImage ?? undefined
            }
            if(isProfilePicUpdated) {
                payload.profilePicId = keys?.key?.length ? keys?.key : selectedImage ?? undefined
            }
            const input : EditUserProfileVariables["input"] = payload

            if(keys?.key?.length)   input['profilePicId'] = keys?.key

            const response = await updateUserProfile({
                variables: {
                    input
                },
            });
            if (response?.data?.updateUserProfile?.user) {
                navigation.navigate('profile');
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (err) {
            console.error('Error verifying OTP:', err);
        }
    }

    const getPostMediaUploadUrl = async (fileType: string) => {
        try {
            const response = await getProfilePicUploadUrl({
                variables: {
                    input: {
                        fileType: fileType, 
                    },
                },
            });

            if (response.data) {
                console.log('Upload URLs:', response?.data?.getProfilePicUploadUrl);
            }

            return response?.data?.getProfilePicUploadUrl;
        } catch (err) {
            console.error('Error fetching upload URLs:', err);
        }
    };

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
                    setUploadImageLoading(true)
                    setSelectedImage(uri);
                    const data = await getPostMediaUploadUrl( fileName?.split?.('.')?.[1] ?? '')
                    setKeys(data ? data : null)
                    const fileUpload = {
                        uri: uri ?? '', // Path to your file
                        type: fileName?.split?.('.')?.[1] ?? '',
                        name: fileName ?? '',
                    };
                    await uploadFileToS3(data?.url ?? '', fileUpload)
                    setUploadImageLoading(false)
                    setIsProfilePicUpdate(true)
                }
            });
        } else {
            console.log('Camera permission denied');
        }
    };

    const [checkUsername, { data: checkUsernameData, loading, error }] = useLazyQuery<
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

    const validateInput = (text: string) => {
        // Only allow letters and numbers
        return text.replace(/[^a-zA-Z0-9\s]/g, '');
    };

    const handleNameChange = (text: string) => {
        const validatedText = validateInput(text);
        setName(validatedText);
    };

    const handleUniversityChange = (text: string) => {
        const validatedText = validateInput(text);
        setCollege(validatedText);
    };


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={goBack}>
                    <Back height={hp(2.5)} width={hp(2.5)} />
                </Pressable>
                <Text style={[styles.boldTxt, styles.marginLeft, { flex: 1 }]}>Edit Profile</Text>
            </View>

            <Pressable onPress={handleImagePicker} style={styles.profileContainer}>
                <Image
                    style={styles.img}
                    source={{
                        uri: selectedImage ?? getDummyProfile(name),
                    }}
                />
                <View style={styles.cameraContainer}>
                    <Camera height={hp(2)} width={hp(2)} />
                </View>
            </Pressable>


            <ScrollView style={styles.formContainer}>
                <TextInputSecondary 
                    label="Full name"
                    placeholder='Enter name'
                    placeholderTextColor={"#888"}
                    Right={() => <FirstName height={hp(2.5)} width={hp(2.5)} />}
                    value={name}
                    changeText={handleNameChange}
                    showError={!isValidForm && formSubmitted && name?.length === 0}
                    errorMsg='Name is mandatory'
                />

                <TextInputSecondary 
                    label="Username"
                    placeholder='Enter Username'
                    onEndEditing={e => handleUsernameChange(e.nativeEvent.text)}
                    placeholderTextColor={"#888"}
                    Right={() => <LastName height={hp(2.5)} width={hp(2.5)} />}
                    value={userName}
                    changeText={text => setuserName(text)}
                    showError={!isValidForm && formSubmitted && userName?.length === 0}
                    errorMsg='Username is mandatory'
                />
                {checkUsernameData && (
                    <Text style={{ color: checkUsernameData.validateUsername.available ? 'green' : 'red', marginBottom: hp(1) }}>
                        {checkUsernameData.validateUsername.available
                            ? 'Username is available!'
                            : 'Username is taken.'}
                    </Text>
                )}

                <TextInputSecondary 
                    label="College/University"
                    placeholder='Enter College/University'
                    placeholderTextColor={"#888"}
                    Right={() => <Bank height={hp(2.5)} width={hp(2.5)} />}
                    value={college}
                    changeText={text => handleUniversityChange(text)}
                    showError={!isValidForm && formSubmitted && college?.length === 0}
                    errorMsg='College is mandatory'
                />

                <TextInputSecondary 
                    label="Bio"
                    placeholder='Enter Bio'
                    placeholderTextColor={"#888"}
                    Right={() => <Note height={hp(2.5)} width={hp(2.5)} />}
                    value={bio}
                    changeText={text => setBio(text)}
                />

                {/* <TextInputSecondary 
                    label="Mobile Number"
                    placeholder='Enter Mobile Number'
                    placeholderTextColor={"#888"}
                    Right={() => <Call height={hp(2.5)} width={hp(2.5)} />}
                    value={mobile}
                    changeText={text => setMobile(text)}
                    showError={!isValidForm && formSubmitted &&  mobile?.length === 0}
                    errorTxt='Mobile is mandatory'
                /> */}

                {/* <TextInputSecondary 
                    label="Email"
                    placeholder='Enter Email'
                    placeholderTextColor={"#888"}
                    Right={() => <Sms height={hp(2.5)} width={hp(2.5)} />}
                    value={email}
                    changeText={text => setEmail(text)}
                    showError={!isValidForm && formSubmitted &&  email?.length === 0}
                    errorTxt='Email is mandatory'
                /> */}
            </ScrollView>

            <ButtonCustom
                title="Update"
                onPress={updateCta}
                width={wp(90)}
                disabled={updateLoading || profilePicUploadLoading || (!checkUsernameData?.validateUsername?.available && checkUsernameData!==undefined)}
            />
        </KeyboardAvoidingView>
    )
}

export default ProfileEdit