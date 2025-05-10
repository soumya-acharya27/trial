import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Close from '../../../../../assets/svg/Close.svg';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../../../theme';
import Logo from '../../../../../assets/svg/peerhublogo.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SideMenuProps {
  onClose: () => void;
  slideAnim: Animated.Value;
  logoutCta: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose, slideAnim, logoutCta }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleMenuItemClick = (route: string) => {
    switch (route) {
      case 'myCampus':
        // Navigate to 
        navigation.navigate('myCampus')
        break;
      case 'myEvents':
        navigation.navigate('MyEvents');
        break;
      case 'myClubs':
        navigation.navigate('MyClubs');
        break;
      case 'savedPosts':
        navigation.navigate('SavedPosts');
        break;
      case 'archive':
        navigation.navigate('Archive');
        break;
      case 'notifications':
        // Navigate to Notifications
        break;
      case 'accountPrivacy':
        navigation.navigate('AccountPrivacy');
        break;
      case 'blockedAccounts':
        navigation.navigate('BlockedAccounts');
        break;
      case 'helpSupport':
        navigation.navigate('HelpSupport');
        break;
      case 'logout':
        logoutCta()
        break;
    }
    onClose();
  };

  return (
    <TouchableOpacity 
      style={styles.overlay}
      activeOpacity={1}
      // onPress={onClose}
    >
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity onPress={onClose}>
            <Close height={hp(2)} width={hp(2)} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuContent}>
          <TouchableOpacity onPress={() => handleMenuItemClick('myEvents')}>
            <Text style={styles.menuItem}>My Events</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleMenuItemClick('myCampus')}>
            <Text style={styles.menuItem}>My Campus</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleMenuItemClick('myClubs')}>
            <Text style={styles.menuItem}>My Clubs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleMenuItemClick('savedPosts')}>
            <Text style={styles.menuItem}>Saved Posts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleMenuItemClick('archive')}>
            <Text style={styles.menuItem}>Archive</Text>
          </TouchableOpacity>
          
          {/* <TouchableOpacity onPress={() => handleMenuItemClick('notifications')}>
            <Text style={styles.menuItem}>Notifications</Text>
          </TouchableOpacity> */}
          
          {/* <TouchableOpacity onPress={() => handleMenuItemClick('accountPrivacy')}>
            <Text style={styles.menuItem}>Account Privacy</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity onPress={() => handleMenuItemClick('blockedAccounts')}>
            <Text style={styles.menuItem}>Blocked Accounts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleMenuItemClick('helpSupport')}>
            <Text style={styles.menuItem}>Help & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleMenuItemClick('logout')}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Logo width={wp(10)} height={wp(10)} />
          <Text style={styles.footerText}>Proudly Made In 🇮🇳</Text>
          <Text style={styles.version}>v 1.0</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SideMenu; 