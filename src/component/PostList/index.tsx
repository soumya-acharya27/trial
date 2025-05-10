import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ButtonCustom } from '../ButtonCustom';

interface ClubCardProps {
    data: any;
    SelectedValue: (item: any) => void;

}

const PostsList = ({ data, SelectedValue }: ClubCardProps) => {


    return (
        <View style={{flex:1,width:'100%'}}>

            <View style={styles.container}>
                <View style={styles.imgContainerLeft}>
                    <Image
                        style={styles.img}
                        source={data.profile}
                    />
                </View>
                <View>
                    <Text style={styles.txt}>{data.name}</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.detailstxt}>{data.collage}</Text>
                        <View style={styles.line} />
                        <Text style={styles.detailstxt}>{data.clubs + " Clubs"}</Text>
                    </View>

                </View>
            </View>
            <Image
                style={styles.imgBG}
                source={data.bgImg}
            />
        </View>
    )
}


export default PostsList