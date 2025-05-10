import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { styles } from './styles'
import EventHeader from '../EventHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ButtonCustom, ButtonSecondary } from '../../../../../component/ButtonCustom'
import Location from '../../../../../assets/svg/location.svg';
import Calendar from '../../../../../assets/svg/calendartickw.svg';
import People from '../../../../../assets/svg/people.svg';
import FastImage from 'react-native-fast-image'
import { Event } from '../../../../../interface/eventinterface'

interface EventTicketParams {
  event: Event,
  qrImage: string;
}

const EventTicket = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {event, qrImage} = useRoute()?.params as EventTicketParams ?? {}
  return (
    <SafeAreaView style={styles.container}>
      <EventHeader showLocation={false} onBack={() => navigation.goBack()} />

      <View style={styles.banner}>
        <Text style={styles.bannerTxt}>Please show this code at the event and scan it to proceed</Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.ticket}>
          <View style={styles.eventInfo}>
            <FastImage
              source={{
                uri: event?.imageId,
                priority: FastImage.priority.normal,
              }}
              style={styles.eventImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.eventDetails}>
              <Text style={styles.eventName}>{event?.name}</Text>

              <View style={styles.infoRow}>
                <Location width={16} height={16} />
                <Text style={styles.infoText}>{event?.mode}</Text>
              </View>

              <View style={styles.infoRow}>
                <Calendar width={16} height={16} />
                <Text style={styles.infoText}>{event?.scheduleTime}</Text>
              </View>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <FastImage
              source={{
                uri: qrImage,
                priority: FastImage.priority.normal,
              }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
      </View>

      <ButtonSecondary
        title='Back to home'
        onPress={() => navigation.navigate('events', { screen: 'event', })}
      />

    </SafeAreaView>
  )
}

export default EventTicket