import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './screens/Tabs/Dashboard'
import Clubs from './screens/Tabs/Clubs'
import Events from './screens/Tabs/Events'
import Message from './screens/Tabs/Message'
import MessageList from './screens/MessageList'
import Profile from './screens/Tabs/Profile'
import { theme } from './theme';
import { Platform, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DashBoardActive from './assets/svg/homeactive.svg';
import DashBoardInActive from './assets/svg/homeinactive.svg';
import UserActive from './assets/svg/useractive.svg';
import UserInActive from './assets/svg/userinactive.svg';
import MessageActive from './assets/svg/messageactive.svg';
import MessageInActive from './assets/svg/messageInactive.svg';
import EventsActive from './assets/svg/eventactive.svg';
import EventsInActive from './assets/svg/eventinactive.svg';
import ClubsActive from './assets/svg/clubsactive.svg';
import ClubsInActive from './assets/svg/clubsinactive.svg';
import Login from './screens/Login';
import LoginWithOtp from './screens/LoginWithOtp';
import ForgotPassword from './screens/ForgotPassword';
import ClubDetails from './screens/Tabs/Clubs/ClubDetails'
import ProfileEdit from './screens/ProfileEdit';
import SplashScreen from './screens/SplashScreen';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeClubCategories, storeClubCategoryLoading } from './redux-saga/club/clubAction';
import { RootState } from './redux-saga/rootReducer';
import { useLazyQuery } from '@apollo/client';
import { GetClubCategoriesResponse } from './interface/clubinterface';
import { GET_CLUB_CATEGORIES } from './graphql/clubs/clubsQuery';
import CreatePost from './screens/Tabs/CreatePost';
import PostCommentsScreen from './screens/Tabs/CreatePost/components/Comments';
import ProfileVerify from './screens/ProfileVerify';
import PendingProfileVerify from './screens/PendingProfileVerify';
import SavedPosts from './screens/SavedPosts';
import Archive from './screens/Archive';
import AccountPrivacy from './screens/AccountPrivacy';
import BlockedAccounts from './screens/BlockedAccounts';
import HelpSupport from './screens/HelpSupport';
import MyClubs from './screens/MyClubs';
import MyEvents from './screens/MyEvents';
import Reports from './screens/Reports';
import SafetyNotices from './screens/SafetyNotices';
import Violations from './screens/Violations';
import EventDetails from './screens/Tabs/Events/EventDetails';
import EventListing from './screens/Tabs/Events/components/EventListing';
import EventsLocation from './screens/Tabs/Events/components/EventsLocation';
import EventTicket from './screens/Tabs/Events/components/EventTicket';
import SearchScreen from './screens/Search';
import MyCampus from './screens/MyCampus';

const Stack = createNativeStackNavigator();
const Auth = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Auths = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Auth.Screen name="login" component={Login} />
        <Auth.Screen name="loginWithOtp" component={LoginWithOtp} />
        <Auth.Screen name="forgotPassword" component={ForgotPassword} />
        <Auth.Screen name="profileVerify" component={ProfileVerify} />
        <Auth.Screen name="profileVerificationPending" component={PendingProfileVerify} />
    </Auth.Navigator>
  )
}


const Club = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="clubs">
        <Stack.Screen name="clubs" component={Clubs} />
        <Auth.Screen name="clubdetails" component={ClubDetails} />
        <Auth.Screen name="search" component={SearchScreen} />
        <Auth.Screen name="profile" component={Profile} />
        <Stack.Screen name="Eventdetails" component={EventDetails} />
        <Stack.Screen name="EventsTicket" component={EventTicket} />
        <Stack.Screen name="PostComments" component={PostCommentsScreen} />
        <Stack.Screen name="createPost" component={CreatePost} />
    </Auth.Navigator>
  )
}

const EventStack = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="event">
        <Stack.Screen name="event" component={Events} />
        <Stack.Screen name="eventdetails" component={EventDetails} />
        <Stack.Screen name="EventListing" component={EventListing} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="EventsLocation" component={EventsLocation} />
        <Stack.Screen name="EventsTicket" component={EventTicket} />
        <Stack.Screen name="search" component={SearchScreen} />
    </Auth.Navigator>
  )
}

const MessageStack = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="messagelist">
        <Stack.Screen name="messagelist" component={MessageList} />
        <Stack.Screen name="message" component={Message} />
        <Stack.Screen name="profile" component={Profile} />
    </Auth.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="profile">
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="profileVerify" component={ProfileVerify} />
        <Stack.Screen name="PostComments" component={PostCommentsScreen} />
        <Stack.Screen name="createPost" component={CreatePost} />
    </Stack.Navigator>
  )
}

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="listing">
        <Stack.Screen name="listing" component={Dashboard} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="createPost" component={CreatePost} />
        <Stack.Screen name="PostComments" component={PostCommentsScreen} />
        <Stack.Screen name="message" component={Message} />
        <Stack.Screen name="SavedPosts" component={SavedPosts} />
        <Stack.Screen name="Archive" component={Archive} />
        <Stack.Screen name="myCampus" component={MyCampus} />
        <Stack.Screen name="AccountPrivacy" component={AccountPrivacy} />
        <Stack.Screen name="BlockedAccounts" component={BlockedAccounts} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        <Stack.Screen name="MyClubs" component={MyClubs} />
        <Stack.Screen name="MyEvents" component={MyEvents} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="SafetyNotices" component={SafetyNotices} />
        <Stack.Screen name="Violations" component={Violations} />
        <Stack.Screen name="profileVerify" component={ProfileVerify} />
        <Stack.Screen name="profileVerificationPending" component={PendingProfileVerify} />
        <Stack.Screen name="EventListing" component={EventListing} />
        <Stack.Screen name="clubdetails" component={ClubDetails} />
        <Stack.Screen name="Eventdetails" component={EventDetails} />
        <Stack.Screen name="EventsTicket" component={EventTicket} />
        <Stack.Screen name="search" component={SearchScreen} />
    </Stack.Navigator>
  )
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {  height: hp('7'), alignItems: 'center', justifyContent:'center', backgroundColor: '#243139' },
        tabBarActiveTintColor: theme.colors.orange,
        tabBarInactiveTintColor: theme.colors.gray,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      screenListeners={({ navigation }) => ({
        tabPress: (e) => {
          // Prevent default navigation
          e.preventDefault();
          
          // Get the target route name from the event
          const targetRoute = e.target?.split('-')[0];
          
          // Navigate to initial route based on the tab
          switch (targetRoute) {
            case 'dashboard':
              navigation.navigate('dashboard', { screen: 'listing' });
              break;
            case 'clubs':
              navigation.navigate('clubs', { screen: 'clubs' });
              break;
            case 'events':
              navigation.navigate('events', { screen: 'event' });
              break;
            case 'message':
              navigation.navigate('message', { screen: 'messagelist' });
              break;
            case 'profiles':
              navigation.navigate('profiles', { screen: 'profile' });
              break;
          }
        },
      })}
    >
      <Tab.Screen name="dashboard" component={DashboardStack} options={{
        tabBarIcon: ({ focused }) => focused ? <DashBoardActive /> : <DashBoardInActive />,
        tabBarLabel: ({ focused }) => <Text style={ { fontFamily: theme.fontFamily.light, fontSize: wp('3.4'), color: focused ? theme.colors.orange : theme.colors.gray }}>Home</Text>
      }} />
      <Tab.Screen name="clubs" component={Club}
        options={{
          tabBarIcon: ({ focused }) => focused ? <ClubsActive /> : <ClubsInActive />,
          tabBarLabel: ({ focused }) => <Text style={{ fontFamily: theme.fontFamily.light, fontSize: wp('3.4'), color: focused ? theme.colors.orange : theme.colors.gray }}>Clubs</Text>
        }}
      />
      <Tab.Screen name="events" component={EventStack} options={{
        tabBarIcon: ({ focused }) => focused ? <EventsActive /> : <EventsInActive />,
        tabBarLabel: ({ focused }) => <Text style={{ fontFamily: theme.fontFamily.light, fontSize: wp('3.4'), color: focused ? theme.colors.orange : theme.colors.gray }}>Events</Text>
      }} />
      <Tab.Screen name="message" component={MessageStack} options={{
        tabBarIcon: ({ focused }) => focused ? <MessageActive /> : <MessageInActive />,
        tabBarLabel: ({ focused }) => <Text style={{ fontFamily: theme.fontFamily.light, fontSize: wp('3.4'), color: focused ? theme.colors.orange : theme.colors.gray}}>Message</Text>
      }} />
      <Tab.Screen name="profiles" component={ProfileStack} options={{
        tabBarIcon: ({ focused }) => focused ? <UserActive /> : <UserInActive />,
        tabBarLabel: ({ focused }) => <Text style={{fontFamily: theme.fontFamily.light, fontSize: wp('3.4'), color: focused ? theme.colors.orange : theme.colors.gray}}>Profile</Text>
      }} />
    </Tab.Navigator>
  )
}

const Routes = () => {
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.authReducer.accessToken)
    const [fetchCategories, { loading, error, data }] = useLazyQuery<GetClubCategoriesResponse>(GET_CLUB_CATEGORIES, {
      context: {
        headers: {
            authorization: `Bearer ${token}`,
        }
    }
    });

  useEffect(() => {
    const fetchCategory = async () => {
      dispatch(storeClubCategoryLoading(true))
      try {
        const response = await fetchCategories()
        dispatch(storeClubCategories(response?.data?.getClubCategories?.categories ?? []))
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally{
        dispatch(storeClubCategoryLoading(false))
      }
    }

    !!token?.length && fetchCategory()
    
  }, [token])
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="AuthNevigator" component={Auths} />
        <Stack.Screen name="TabNevigator" component={Tabs} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes