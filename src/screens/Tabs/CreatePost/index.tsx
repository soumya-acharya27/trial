import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    PermissionsAndroid,
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ViewStyle,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AddPostCommentResponse, AddPostCommentVariables, AddPostInput, AddPostResponse, AddQuestionPollCommentResponse, AddQuestionPollCommentVariables, FileInput, GetMediaUploadUrlsInput, GetPostMediaUploadUrlResponse, UrlResponse } from '../../../interface/postinterface';
import { ADD_POST, ADD_POST_COMMENT, ADD_QUESTION_POLL_COMMENT, GET_POST_MEDIA_UPLOAD_URL } from '../../../graphql/post/postMutation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-saga/rootReducer';
import { errorMessage, getDummyProfile, showErrorToast, uploadFileToS3 } from '../../../utils';
import ClubsPopup from './components/ClubsSelection';
import { Club, Post } from '../../../interface/clubinterface';
import Close from "../../../assets/svg/Close.svg";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BottomActions from './components/BottomActions';
import PollCreation from './components/PollCreation';
import { ButtonCustom } from '../../../component/ButtonCustom';
import { theme } from '../../../theme';
import FastImage from 'react-native-fast-image';
import RenderPost from '../Dashboard/components/PostCard';

interface CreatePostParams {
    type: 'POST' | 'COMMENT' | 'SPICE_UP';
    increaseCount?: () => void;
    replayTo?: string;
    postId?: string;
    clubId?: string;
    repostedPostId?: string;
    post?: Post;
}

const CreatePost = () => {
    const route = useRoute();
    const { type, replayTo, postId, clubId, repostedPostId, post, increaseCount } = (route?.params as CreatePostParams) ?? {};
    const token = useSelector((state: RootState) => state.authReducer.accessToken);
    const user = useSelector((state: RootState) => state.authReducer)
    const userName = useSelector((state: RootState) => state.authReducer.userInfo.userName)
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [getPostMediaUploadUrlMutation, { loading, error, data }] = useLazyQuery<
        GetPostMediaUploadUrlResponse,
        GetMediaUploadUrlsInput
    >(GET_POST_MEDIA_UPLOAD_URL, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
    });

    const [addPostMutation, { loading: addPostMutationLoading }] = useMutation<AddPostResponse, { input: AddPostInput }>(ADD_POST, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
    });

    const [addQuestionPollComment, { loading: addQuestionLoading }] = useMutation<AddQuestionPollCommentResponse, AddQuestionPollCommentVariables>(
        ADD_QUESTION_POLL_COMMENT,
        {
            context: {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        }
    );

    const [uploadImageLoading, setUploadImageLoading] = useState(false);
    const [isClubsPopupVisible, setClubsPopupVisible] = useState(false);
    const [selectedClub, setSelectedClub] = useState<Club | undefined>(undefined);
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null | undefined>(null);
    const [keys, setKeys] = useState<null | UrlResponse>(null);
    const [isPollMode, setIsPollMode] = useState(false);
    const [textInputHeight, setTextInputHeight] = useState(hp(15));
    const [imageAspectRatio, setImageAspectRatio] = useState(1);
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        if (selectedImage) {
            Image.getSize(selectedImage, (width, height) => {
                setImageAspectRatio(width / height);
                setIsImageLoading(false);
            }, (error) => {
                console.error('Error getting image size:', error);
                setIsImageLoading(false);
            });
        }
    }, [selectedImage]);

    const getImageContainerStyle = (): ViewStyle => {
        if (imageAspectRatio > 1) {
            // Wider image (landscape)
            return {
                height: hp(25),
            };
        } else {
            // Taller image (portrait)
            return {
                height: hp(45),
            };
        }
    };

    const [addPostComment, { loading: addCommentLoading }] = useMutation<
        AddPostCommentResponse,
        AddPostCommentVariables
    >(ADD_POST_COMMENT, {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        },
        onCompleted: (res) => {
        },
        onError: (err) => {
            console.log("err is ", err)
        }
    });

    const handleTextChange = (newText: string) => {
        setPostText(newText);
        // Calculate height based on content
        const fontSize = wp(4);
        const lineHeight = hp(2.3);
        const padding = wp(4) * 2; // Top and bottom padding
        
        // Count actual number of lines (including word wrap)
        const width = wp(100) - wp(8); // Full width minus padding
        const charsPerLine = Math.floor(width / (fontSize * 0.5)); // Approximate chars per line
        const wrappedText = newText.split('').reduce((acc, char, i) => {
            if (i > 0 && i % charsPerLine === 0) return acc + '\n' + char;
            return acc + char;
        }, '');
        
        const numberOfLines = wrappedText.split('\n').length;
        const minHeight = hp(15);
        const contentHeight = (numberOfLines * lineHeight) + padding;
        const newHeight = Math.max(minHeight, contentHeight);
        
        setTextInputHeight(newHeight);
    };

    const goBack = () => navigation.goBack();

    const postDisabled = addPostMutationLoading || !(postText?.length > 0 || (selectedImage && selectedImage.length > 0));

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                goBack();
                return true;
            },
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    const getPostMediaUploadUrl = async (files: FileInput[]) => {
        try {
            const response = await getPostMediaUploadUrlMutation({
                variables: {
                    input: {
                        files,
                    },
                },
            });

            if (response.data) {
                return response?.data?.getPostMediaUploadUrl?.urls;
            }
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
                    const { fileName, type, uri } = asset ?? {};
                    setUploadImageLoading(true);
                    setSelectedImage(uri);
                    const file: FileInput[] = [{ fileName: fileName ?? '', fileType: fileName?.split?.('.')?.[1] ?? '', type: 'image' }];
                    const data = await getPostMediaUploadUrl(file);
                    setKeys(data ? data?.[0] : null);
                    const fileUpload = {
                        uri: uri ?? '',
                        type: fileName?.split?.('.')?.[1] ?? '',
                        name: fileName ?? '',
                    };
                    await uploadFileToS3(data?.[0]?.url ?? '', fileUpload);
                    setUploadImageLoading(false);
                }
            });
        } else {
            console.log('Camera permission denied');
        }
    };

    const handlePost = async (clubId: string) => {
        try {
            const response = await addPostMutation({
                variables: {
                    input: {
                        clubId: clubId,
                        description: postText,
                        imagesKeys: [keys?.key ?? '']
                    },
                },
            });
            // goBack();
            navigation.navigate('dashboard', { screen: 'listing', refreshPosts: true });
        } catch (err) {
            console.error('Error adding post:', err);
            showErrorToast(errorMessage);
        }
    };

    const handlePollSubmit = async (question: string, options: any[]) => {
        setPostText(question);
        setIsPollMode(false);

        try {
            const response = await addQuestionPollComment({
                variables: {
                    input: {
                        durationMinutes: 1440, // poll active for only 1 hr
                        options: options?.map(op => op?.text),
                        postId: postId ?? '',
                        question: question,
                        replayTo: replayTo? replayTo : ''
                    },
                },
            });
            navigation.goBack()

        } catch (err) {
            console.error("Error adding poll:", err);
        }
        // TODO: Handle poll options
    };

    const handleSendComment = async () => {
        if (!postText.trim()) return;
        if (!postId) return;

        try {
            const response = await addPostComment({
                variables: {
                    input: {
                        postId,
                        text: postText?.trim(),
                        ...(replayTo ? { replayTo } : {})
                    }
                }
            });

            setPostText('');
            increaseCount && typeof increaseCount === 'function' && increaseCount();
            navigation.goBack();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const postComment = () => {
        handleSendComment()
    }

    const handleSpiceUp = async () => {
        try {
            const response = await addPostMutation({
                variables: {
                    input: {
                        clubId: clubId!,
                        description: postText,
                        imagesKeys: selectedImage ? [keys?.key ?? ''] : undefined,
                        repostedPostId: repostedPostId
                    },
                },
            });
            // goBack();
            navigation.navigate('dashboard', { screen: 'listing', refreshPosts: true });
        } catch (err) {
            console.error('Error adding spiced up post:', err);
            showErrorToast(errorMessage);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={hp(5)}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>{type === 'SPICE_UP' ? 'Spice Up' : type === 'COMMENT' ? 'Post Comments' : 'Your Post'}</Text>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Close height={hp(2)} width={hp(2)} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingRight: 5 }}>
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1}} 
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator
                    persistentScrollbar={true}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage
                            style={styles.profilePic}
                            source={{ 
                                uri: user?.userInfo?.profilePicId ?? getDummyProfile(user?.userInfo?.name) 
                            }}
                        />
                        <Text style={styles.userName}>{userName}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    height: textInputHeight,
                                    textAlignVertical: 'top',
                                    minHeight: hp(15),
                                }
                            ]}
                            placeholder="Share your thoughts..."
                            placeholderTextColor={theme.colors.gray}
                            value={postText}
                            onChangeText={handleTextChange}
                            multiline
                            scrollEnabled={false}
                        />

                        {selectedImage && (
                            <View style={[styles.imageContainer, getImageContainerStyle()]}>
                                {isImageLoading && (
                                    <View style={[styles.image, styles.loadingImage]} />
                                )}
                                <FastImage
                                    source={{ 
                                        uri: selectedImage,
                                        priority: FastImage.priority.high,
                                        cache: FastImage.cacheControl.immutable
                                    }}
                                    style={[styles.image, { opacity: isImageLoading ? 0 : 1 }]}
                                    resizeMode={FastImage.resizeMode.cover}
                                    onLoadStart={() => setIsImageLoading(true)}
                                    onLoadEnd={() => setIsImageLoading(false)}
                                />
                                <TouchableOpacity
                                    style={styles.removeImage}
                                    onPress={() => {
                                        setSelectedImage(null);
                                        setKeys(null);
                                    }}
                                >
                                    <Close width={wp(4)} height={wp(4)} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {type === 'SPICE_UP' && postId && post && (
                        <View style={styles.originalPostContainer}>
                            <RenderPost
                                item={post}
                                previewFlow={true}
                                setPosts={() => {}}
                            />
                        </View>
                    )}
                </ScrollView>
                </View>

                {!isPollMode && <View style={{ paddingHorizontal: wp(5) }}>
                    <ButtonCustom
                        disabled={(selectedImage === null && postText?.length === 0) || addCommentLoading}
                        title={type === 'SPICE_UP' ? 'Spice Up' : type === 'POST' ? 'Select Club' : 'Post Comment'}
                        onPress={type === 'SPICE_UP' ? handleSpiceUp : type === "POST" ? () => setClubsPopupVisible(true) : postComment}
                    />
                </View>}

                <View style={styles.bottomContainer}>
                    <BottomActions
                        showPoll={type === 'COMMENT'}
                        showImage={type === 'POST' || type === 'SPICE_UP'}
                        onImagePress={handleImagePicker}
                        onGifPress={() => {/* TODO: Handle GIF */ }}
                        onPollPress={() => setIsPollMode(true)}
                    />
                </View>

                <ClubsPopup
                    onSelect={async (club: Club) => {
                        setSelectedClub(club);
                        setClubsPopupVisible(false);
                        handlePost(club?.id);
                    }}
                    visible={isClubsPopupVisible}
                    onClose={() => setClubsPopupVisible(false)}
                />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

export default CreatePost;





