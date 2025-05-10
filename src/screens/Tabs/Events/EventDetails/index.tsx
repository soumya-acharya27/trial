import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Back from '../../../../assets/svg/Back.svg';
import Location from '../../../../assets/svg/location.svg';
import Calendar from '../../../../assets/svg/calendartickw.svg';
import People from '../../../../assets/svg/people.svg';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENT_DETAILS, EventDetailsResponse } from './EventQuery';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux-saga/rootReducer';
import FastImage from 'react-native-fast-image';
import { ButtonCustom } from '../../../../component/ButtonCustom';
import { RegisterForEventInput, RegisterForEventResponse } from '../../../../interface/eventinterface';
import { REGISTER_FOR_EVENT } from '../../../../graphql/events/eventsMutation';
import { errorMessage, isValidImageUrl, showErrorToast } from '../../../../utils';

const EventDetails = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { eventId } = route.params as { eventId: string };
  const token = useSelector((state: RootState) => state.authReducer.accessToken);

  const { loading, error, data } = useQuery<EventDetailsResponse>(GET_EVENT_DETAILS, {
    variables: { id: eventId },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  });

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          navigation.goBack()
          return true;
        },
      );
      return () => {
        backHandler.remove();
      };
    }, []);


  const [registerForEvent, { data:registerData, loading:registerLoading, error:registerError }] = useMutation<
      RegisterForEventResponse,
      { input: RegisterForEventInput}
    >(REGISTER_FOR_EVENT, {
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        }
      },
      onCompleted: (registerResponse) => {
        navigation.navigate('EventsTicket', {
          event: data?.getEventDetails,
          qrImage: registerResponse?.registerForEvent?.qrCode
        })
      },
      onError: (err) => {
        console.log('err is ', err)
        showErrorToast(errorMessage)
      }
    });

  const registerCta = async () => {
    if(data?.getEventDetails?.isRegistered){
      return navigation.navigate('EventsTicket', {
        event: data?.getEventDetails,
        qrImage: data?.getEventDetails?.qrCode
      })
    }
    try {
      const response = await registerForEvent({ variables: { input: { eventId } } });
    } catch (err) {
      console.log("err is ", err)
    }
  }

  const eventDetails = data?.getEventDetails;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage 
          source={ eventDetails?.imageId && isValidImageUrl(eventDetails?.imageId)  ? {  uri: eventDetails.imageId, priority: FastImage.priority.normal} : require("../../../../assets/png/defaultImage.png") } 
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back height={hp(2.5)} width={hp(2.5)} />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryOverlay}>
          <Text style={styles.categoryText}>{eventDetails?.domain}</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{eventDetails?.name}</Text>
        <Text style={styles.description}>{eventDetails?.description}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Location width={hp(2.5)} height={hp(2.5)} />
            <Text style={styles.infoText}>{eventDetails?.mode}</Text>
          </View>

          {eventDetails?.scheduleTime && <View style={styles.infoItem}>
            <Calendar width={hp(2.5)} height={hp(2.5)} />
            <Text style={styles.infoText}>
              {format(new Date(eventDetails?.scheduleTime), 'dd MMM yyyy - hh : mma')}
            </Text>
          </View>}

          <View style={styles.infoItem}>
            <People width={hp(2.5)} height={hp(2.5)} />
            <Text style={styles.infoText}>{eventDetails?.totalMembers || 0}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <ButtonCustom 
          onPress={registerCta}
          title={eventDetails?.isRegistered ? "View Tickets" : "Register"}
          disabled={!eventDetails?.isRegistrationOpen || registerLoading}
        />
      </View>
    </SafeAreaView>
  );
};

export default EventDetails;