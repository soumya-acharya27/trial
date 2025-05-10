import { View, Text, Pressable, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import MemberList from '../../../../../component/MemberList'
import PostsList from '../../../../../component/PostList'

const Post = () => {

    const mockData = [
        { name: "Academic", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png')},
        { name: "Art", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
        { name: "Sport", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
        { name: "Communication", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
        { name: "Demo1", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
        { name: "Demo2", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
        { name: "Demo3", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
        { name: "Society", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
        { name: "Society1", profile: require('../../../../../assets/svg/image.png'),collage:'IIT Mumbai' ,clubs:'5',bgImg: require('../../../../../assets/svg/demo.png') },
    ]

    const renderCard = useCallback(
        ({ item, index }: { item: any, index: number }) => (
            <PostsList
                data={item}
                SelectedValue={(item) => {
                }} />
        ),
        [],
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={mockData}
                keyExtractor={(item) => item?.name}
                renderItem={({ item, index }) => renderCard({ item, index })}
                horizontal={true}
                contentContainerStyle={{ }}

            />

        </View>
    )

}

export default Post
