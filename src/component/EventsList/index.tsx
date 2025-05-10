import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ButtonCustom } from '../ButtonCustom';
import Location from '../../assets/svg/location.svg';
import Calander from '../../assets/svg/calendartick.svg';
import { Event } from '../../interface/eventinterface';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
interface EventsProps {
    data: Event;
    SelectedValue: (item: any) => void;

}

const EventsList = ({ data, SelectedValue }: EventsProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return (
        <Pressable onPress={() => navigation.navigate('Eventdetails', { eventId: data.id })} style={styles.container}>
            <View style={styles.imgContainerLeft}>
                <Image
                    style={styles.img}
                    source={data.imageId ?? ''}
                />
            </View>
            <View>
                <Text style={styles.txt}>{data.name}</Text>
                <View style={styles.textContainer}>
                    <Location />
                    <Text style={styles.detailstxt}>{data.mode}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Calander />
                    <Text style={styles.detailstxt}>{data.scheduleTime}</Text>
                </View>

            </View>
        </Pressable>
    )
}


export default EventsList