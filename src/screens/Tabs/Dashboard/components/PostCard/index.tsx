import React, { useState, useRef, useEffect, useCallback } from "react";
import { Image, Pressable, Text, TouchableOpacity, View, Modal, StatusBar, ViewStyle } from "react-native"
import { Post } from "../../../../../interface/clubinterface"
import { styles } from "../../styles";
import HeartFilled from "../../../../../assets/svg/heartFilled.svg"
import HeartUnFilled from "../../../../../assets/svg/heartUnfilled.svg"
import Comment from "../../../../../assets/svg/message.svg"
import Repost from "../../../../../assets/svg/repost.svg"
import Save from "../../../../../assets/svg/save.svg"
import Send from "../../../../../assets/svg/send.svg"
import Menu from "../../../../../assets/svg/Menu.svg"
import Close from "../../../../../assets/svg/Close.svg"
import DefaultImage from "../../../../../assets/png/defaultImage.png"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useLikePost } from "../../../../../hooks/useLikePost";
import { getDummyProfile } from "../../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux-saga/rootReducer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FastImage from "react-native-fast-image";
import { useSavePost } from "../../../../../hooks/useSavePost";
import { useFollowUser } from "../../../../../hooks/useFollowUser";
import { useUnFollowUser } from "../../../../../hooks/useUnFollowUser";
import { toggleShowBrowseModal, toggleShowVerifyModal } from "../../../../../redux-saga/club/clubAction";
import PostOptionsMenu from "../../../../../component/PostListRenderer/components/PostOptionsMenu";
import ReportDrawer from "../../../../../component/PostListRenderer/components/ReportDrawer";
import { theme } from "../../../../../theme";
import RepostDrawer from '../RepostDrawer';

const RenderPost = ({ previewFlow=false, item, setPosts, innerPost=false, menuVisible, setMenuVisible }: {previewFlow?: boolean, item: Post, setPosts: React.Dispatch<React.SetStateAction<Post[]>>, innerPost?: boolean, menuVisible: string, setMenuVisible: React.Dispatch<React.SetStateAction<string>> }) => {
    const {likePost, loading: likeLoading} = useLikePost()
    const { savePost } = useSavePost()
    const { followUser, loading: followLoading } = useFollowUser()
    const { removeFollower, loading: unFollowLoading } = useUnFollowUser()
    const myId = useSelector((state: RootState) => state.authReducer.userInfo.id)

    const user = useSelector((state: RootState) => state.authReducer)
    const { isCollegeVerified, profileUnderReview } = user?.userInfo
    const dispatch = useDispatch()

    const checkForAccess = () => {
        setMenuVisible('')
        if(!isCollegeVerified){
            dispatch(toggleShowVerifyModal(true))
            return true;
        }
        if(profileUnderReview) {
            dispatch(toggleShowBrowseModal(true))
            return true;
        }
        return false
    }

    const followCta = async (follow: boolean) => {
        if (follow) {    //unfollow flow
            try {
                const response = await removeFollower(item?.userId, myId);
                if (response) {
                    setPosts(prev => (prev?.map(post => {
                        if (post?.userId === item?.userId) {
                            return {
                                ...post,
                                isFollowed: response?.isFollow,
                                repostedPost: post.repostedPost ? {
                                    ...post.repostedPost,
                                    isFollowed: response?.isFollow
                                } : undefined
                            };
                        }
                        return post;
                    })));
                }
            } catch (error) {
                console.error("Failed to toggle follow status:", error);
            }
        } else {  //follow flow
            try {
                const response = await followUser(item?.userId, true);
                if (response) {
                    setPosts(prev => (prev?.map(post => {
                        if (post?.userId === item?.userId) {
                            return {
                                ...post,
                                isFollowed: response?.isFollow,
                                repostedPost: post.repostedPost ? {
                                    ...post.repostedPost,
                                    isFollowed: response?.isFollow
                                } : undefined
                            };
                        }
                        return post;
                    })));
                }
            } catch (error) {
                console.error("Failed to toggle follow status:", error);
            }
        }
    }
    const [isLiked, setIsLiked] = useState(item?.isLiked);
    const [isSaved, setIsSaved] = useState(item?.isSaved);

    useEffect(() => {
        setIsLiked(item?.isLiked)
    },[item?.isLiked])

    useEffect(() => {
        setIsSaved(item?.isSaved)
    },[item?.isSaved])

    const likePostCta = async () => {
        if(checkForAccess())    return;
        if(likeLoading) return;
        try {
            setIsLiked(prev => !prev)
            const updatedIsLiked = await likePost(!isLiked, item?.id);
            setPosts(prev => (prev?.map(post => post?.id === item?.id ? { ...post, isLiked: !!updatedIsLiked, totalLikes: !!updatedIsLiked ? post?.totalLikes + 1 : post?.totalLikes - 1 } : { ...post })))
        } catch (error) {
            console.error('Error toggling like status:', error);
        }
    }
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const credentials = useSelector((state: RootState) => state.authReducer)

    const takeToProfile = (id: string) => {
        const isMyProfile = credentials?.userInfo?.id === id

        if (!isMyProfile)
            return navigation.navigate('profile', { userId: id })

        return navigation.navigate('profiles', { screen: 'profile' })
    }

    const [showRepostDrawer, setShowRepostDrawer] = useState(false);
    const [showReportDrawer, setShowReportDrawer] = useState(false);

    const handleRepost = () => {
        // setShowRepostDrawer(false);
    };

    const handleSpiceUp = () => {
        setShowRepostDrawer(false);
        // send main post's id if it's already spiced up post
        let repostId = item?.repostedPost?.id?.length? item?.repostedPost?.id : item?.id
        
        navigation.navigate('createPost', {
            type: 'SPICE_UP',
            postId: item.id,
            clubId: item.club.id,
            repostedPostId: repostId
        });
    };

    let repostedPost=false;
    let spicedUpPost=false;

    (() => {
        if(item?.repostedPost?.id?.length){
            if(item?.description?.length || item?.images?.length || item?.videos?.length)
                spicedUpPost=true;
            else
                repostedPost=true;
        }
    })()

    const [imageAspectRatio, setImageAspectRatio] = useState(1);

    useEffect(() => {
        if (item?.images?.[0]) {
            Image.getSize(item.images[0], (width, height) => {
                setImageAspectRatio(width / height);
            });
        }
    }, [item?.images]);

    const getImageContainerStyle = (): ViewStyle => {
        if (imageAspectRatio > 1) {
            // Wider image
            return {
                height: hp(25), // Adjust this value based on your needs
            };
        } else {
            // Taller image
            return {
                height: hp(45), // Adjust this value based on your needs
            };
        }
    };

    const handleSave = async () => {
        if(checkForAccess())    return;
        try {
            setIsSaved(!isSaved);
            const id = await savePost(!isSaved, item?.id);
            setPosts(prev => (prev?.map(post => post?.id === item?.id ? { ...post, isSaved: !isSaved } : { ...post })))
        } catch (error) {
            console.error('Error toggling Save status:', error);
        }
    };

    const handleShare = () => {
        setShowRepostDrawer(true);
    };


    const handleMenuOptionPress = (optionId: string) => {
        setMenuVisible(item?.id);
        if (optionId === 'reportPost') {
            setShowReportDrawer(true);
        }
    };

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isProfilePicLoading, setIsProfilePicLoading] = useState(true);
    const [showImageModal, setShowImageModal] = useState(false);

    const ImagePreviewModal = useCallback(() => {
        if (!previewFlow) return null;
    
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showImageModal}
                onRequestClose={() => setShowImageModal(false)}
                hardwareAccelerated={true}
            >
                <StatusBar backgroundColor="#000000" barStyle="light-content" />
                <View style={{
                    flex: 1,
                    backgroundColor: '#000000',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => setShowImageModal(false)}
                        style={{
                            position: 'absolute',
                            top: hp(5),
                            right: wp(5),
                            zIndex: 1,
                        }}
                    >
                        <Close width={wp(6)} height={wp(6)} />
                    </TouchableOpacity>
                    {showImageModal && (
                        <FastImage
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            source={{
                                uri: item?.images?.[0],
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.web
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                            onLoadEnd={() => setIsImageLoading(false)}
                        />
                    )}
                </View>
            </Modal>
        );
    }, [previewFlow, showImageModal, item?.images?.[0]]);

    return (
        <Pressable disabled={followLoading || unFollowLoading} onPress={() => {
            if(checkForAccess()) return;
            navigation.navigate('PostComments', { post: item, setPosts: setPosts })
        }} style={[styles.postContainer, innerPost && {marginHorizontal : 0}]}>
            {item?.repostedByUser?.userName?.length &&  (
                <Pressable onPress={() => takeToProfile(item?.repostedByUser?.id)} style={{flexDirection:'row', alignItems:'center', marginBottom: hp(1)}}>
                    {item?.repostedByUser?.profilePicId?.length ? (
                        <FastImage 
                            source={{ 
                                uri: item?.repostedByUser?.profilePicId,
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.immutable
                            }} 
                            style={[styles.profilePic, isProfilePicLoading && styles.loadingImage, styles.repostedImg]} 
                            onLoadStart={() => setIsProfilePicLoading(true)}
                            onLoadEnd={() => setIsProfilePicLoading(false)}
                        />
                    ) : (
                        <FastImage 
                            source={{ 
                                uri: getDummyProfile(item?.repostedByUser?.name),
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.immutable
                            }} 
                            style={[styles.profilePic, isProfilePicLoading && styles.loadingImage, styles.repostedImg]} 
                            onLoadStart={() => setIsProfilePicLoading(true)}
                            onLoadEnd={() => setIsProfilePicLoading(false)}
                        />
                    )}
                    <Text style={styles.repostTxt}>Reposted by {item?.repostedByUser?.userName}</Text>
                </Pressable>
            )}
            
            
            <View style={styles.headerContainer}>
                <Pressable onPress={() => takeToProfile(item?.userId)}>
                    {item?.user?.profilePicId?.length ? (
                        <FastImage 
                            source={{ 
                                uri: item?.user?.profilePicId,
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.immutable
                            }} 
                            style={[styles.profilePic, isProfilePicLoading && styles.loadingImage]} 
                            onLoadStart={() => setIsProfilePicLoading(true)}
                            onLoadEnd={() => setIsProfilePicLoading(false)}
                        />
                    ) : (
                        <FastImage 
                            source={{ 
                                uri: getDummyProfile(item?.user?.name),
                                priority: FastImage.priority.high,
                                cache: FastImage.cacheControl.immutable
                            }} 
                            style={[styles.profilePic, isProfilePicLoading && styles.loadingImage]} 
                            onLoadStart={() => setIsProfilePicLoading(true)}
                            onLoadEnd={() => setIsProfilePicLoading(false)}
                        />
                    )}
                </Pressable>
                <Pressable onPress={() => takeToProfile(item?.userId)}>
                    <Text numberOfLines={1} style={[styles.userName, !item?.repostedPost && {width: wp(35)}]}> {item?.user?.name} </Text>
                    <Text numberOfLines={1} style={[styles.clubName, !item?.repostedPost && {width: wp(35)}]}> {item?.club?.name} </Text>
                </Pressable>
                {(!repostedPost && !spicedUpPost) && <View style={{ flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
                    {/* {item?.userId !== myId && <TouchableOpacity disabled={followLoading || unFollowLoading} onPress={() => followCta(item?.isFollowed)} style={[styles.followButton, item?.isFollowed && styles.unFollowButton, (followLoading || unFollowLoading) && {opacity:0.6}]}>
                        <Text style={styles.followButtonText}>{item?.isFollowed ? 'Peer Down' : 'Peer Up'}</Text>
                    </TouchableOpacity>} */}
                    {item?.userId !== myId && (
                        <View style={{ marginLeft: wp(2) }}>
                            <TouchableOpacity 
                                onPress={() => setMenuVisible(prev => prev === item?.id ? '' : item?.id)}
                                style={{ paddingHorizontal: wp(0.8), paddingVertical: hp(1) }}
                            >
                                <Menu width={wp('4%')} height={wp('4%')} />
                            </TouchableOpacity>
                            <PostOptionsMenu
                                visible={menuVisible === item?.id}
                                onClose={() => setMenuVisible('')}
                                onOptionPress={handleMenuOptionPress}
                                userId={item.userId}
                                postId={item.id}
                                setPosts={setPosts}
                            />
                            <ReportDrawer
                                visible={showReportDrawer}
                                onClose={() => setShowReportDrawer(false)}
                                postId={item.id}
                                successCB={() => {
                                    setPosts(post => post?.filter(p => p?.id !== item.id))
                                }}
                            />
                        </View>
                    )}
                </View>}

                {item?.repostedPost && <View style={{ flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
                    <View style={styles.reppostContainer}>
                        <Repost color={theme.colors.orange} width={wp('5%')} height={wp('5%')} />
                        <Text style={styles.respostedTxt}>{repostedPost ? 'Reposted' : 'Spiced Up'}</Text>
                    </View>
                </View>}
            </View>

            {spicedUpPost && (
                <>
                    <Text style={styles.postDescription}>{item.description}</Text>
                    <View style={{ position: 'relative' }}>
                        {item.images && item.images.length > 0 && (
                            <View style={[styles.postImageContainer, getImageContainerStyle()]}>
                                <Image 
                                    source={DefaultImage} 
                                    style={[styles.postImage, { opacity: isImageLoading ? 1 : 0 }]}
                                    resizeMode="contain"
                                />
                                <Pressable 
                                    onPress={() =>{
                                        if(previewFlow) {
                                            setShowImageModal(true)
                                        } else {
                                            if(checkForAccess())    return;
                                            navigation.navigate('PostComments', { post: item, setPosts: setPosts })
                                        }
                                    }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <FastImage
                                        style={[styles.postImage, { opacity: isImageLoading ? 0 : 1 }]}
                                        source={{
                                            uri: item?.images[0],
                                            priority: FastImage.priority.high,
                                            cache: FastImage.cacheControl.immutable
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                        onLoadStart={() => setIsImageLoading(true)}
                                        onLoadEnd={() => setIsImageLoading(false)}
                                    />
                                </Pressable>
                            </View>
                        )}
                    </View>
                </>
            )}

            {(spicedUpPost || repostedPost) && <RenderPost menuVisible={menuVisible} setMenuVisible={setMenuVisible} item={item?.repostedPost} innerPost setPosts={setPosts} previewFlow={previewFlow}/> }
            

            {!repostedPost && !spicedUpPost && (
                <>
                    {item?.description?.length && <Text numberOfLines={!previewFlow ? 15 : undefined} style={styles.postDescription}>{item.description}</Text>}

                    <View style={{ position: 'relative' }}>
                        {item.images && item.images.length > 0 && (
                            <View style={[styles.postImageContainer, getImageContainerStyle()]}>
                                <Image 
                                    source={DefaultImage} 
                                    style={[styles.postImage, { opacity: isImageLoading ? 1 : 0 }]}
                                    resizeMode="contain"
                                />
                                <Pressable 
                                    onPress={() =>{
                                        if(previewFlow) {
                                            setShowImageModal(true)
                                        } else {
                                            if(checkForAccess())    return;
                                            navigation.navigate('PostComments', { post: item, setPosts: setPosts })
                                        }
                                    }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <FastImage
                                        style={[styles.postImage, { opacity: isImageLoading ? 0 : 1 }]}
                                        source={{
                                            uri: item?.images[0],
                                            priority: FastImage.priority.high,
                                            cache: FastImage.cacheControl.immutable
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                        onLoadStart={() => setIsImageLoading(true)}
                                        onLoadEnd={() => setIsImageLoading(false)}
                                    />
                                </Pressable>
                            </View>
                        )}
                    </View>
                </>
            )}

            {!innerPost ? <Pressable onPress={() => {}} style={styles.interactionContainer}>
                <Pressable onPress={likePostCta} style={styles.iconContainer}>
                    {isLiked ? (
                        <HeartFilled width={wp('5%')} height={wp('5%')} />
                    ) : (
                        <HeartUnFilled width={wp('5%')} height={wp('5%')} />
                    )}
                    <Text style={styles.iconText}>{String(item?.totalLikes || 0)}</Text>
                </Pressable>

                <TouchableOpacity
                    onPress={() => { 
                        if(checkForAccess())    return;
                        navigation.navigate('createPost', { type: 'COMMENT', postId: item?.id, increaseCount: () => {
                            setPosts(prev => (prev?.map(post => post?.id === item?.id ? { ...post, totalComments: item?.totalComments + 1 } : { ...post })))
                        } })                
                    }}
                    style={styles.iconContainer}
                >
                    <Comment width={wp('5%')} height={wp('5%')} />
                    <Text style={styles.iconText}>{String(item?.totalComments || 0)}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShare} style={styles.iconContainer}>
                    <Repost color="#BEBAB9" width={wp('5%')} height={wp('5%')} />
                    <Text style={styles.iconText}>{String((item as any)?.totalReposts || 0)}</Text>
                </TouchableOpacity>

                <View style={[styles.iconContainer, styles.rightIconsContainer]}>
                    <TouchableOpacity onPress={handleRepost}>
                        <Send width={wp('5%')} height={wp('5%')} />
                    </TouchableOpacity>
                    <View style={styles.iconDivider} />
                    <TouchableOpacity onPress={handleSave}>
                        <Save width={wp('5%')} height={wp('5%')} style={{ color: isSaved ? theme.colors.orange : theme.colors.bgColor }} />
                    </TouchableOpacity>
                </View>
            </Pressable> : <View style={styles.interactionContainer}>
                <Text style={styles.iconText}>{item?.totalLikes} Likes</Text>
                <Text style={[styles.iconText, {alignSelf:'flex-end'}]}>{String(item?.totalComments || 0)} Comments • {String((item as any)?.totalReposts || 0)} Reposts</Text>
            </View>}
            {/* <ImagePreviewModal /> */}
            {ImagePreviewModal()}
            <RepostDrawer
                visible={showRepostDrawer}
                onClose={() => setShowRepostDrawer(false)}
                onRepost={handleRepost}
                onSpiceUp={handleSpiceUp}
                postId={item?.repostedPost?.id?.length? item?.repostedPost?.id : item?.id}
                clubId={item?.club?.id}
                adjustRepost={() => {
                    setPosts(prev => (prev?.map(post => post?.id === item?.id ? { ...post, totalReposts: item?.totalReposts + 1 } : { ...post })))
                }}
            />
        </Pressable>
    );
};

export default RenderPost