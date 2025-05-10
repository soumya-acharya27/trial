import React, { useState, useEffect } from 'react';
import { View, Text, Switch, BackHandler } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';

interface PrivacySettings {
  peeredUp: {
    profilePhoto: boolean;
    bio: boolean;
    phoneNumber: boolean;
    emailId: boolean;
    activities: boolean;
  };
  general: {
    profilePhoto: boolean;
    bio: boolean;
    phoneNumber: boolean;
    emailId: boolean;
    activities: boolean;
  };
}

const AccountPrivacy = () => {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    peeredUp: {
      profilePhoto: true,
      bio: true,
      phoneNumber: true,
      emailId: true,
      activities: true,
    },
    general: {
      profilePhoto: true,
      bio: true,
      phoneNumber: true,
      emailId: true,
      activities: true,
    },
  });

  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const handleSwitchChange = (
    section: 'peeredUp' | 'general',
    field: keyof PrivacySettings['peeredUp'],
    value: boolean
  ) => {
    setPrivacySettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Account Privacy" />
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>People you Peered-Up</Text>
          <PrivacyOption 
            title="Profile Photo" 
            value={privacySettings.peeredUp.profilePhoto}
            onValueChange={(value) => handleSwitchChange('peeredUp', 'profilePhoto', value)}
          />
          <PrivacyOption 
            title="Bio" 
            value={privacySettings.peeredUp.bio}
            onValueChange={(value) => handleSwitchChange('peeredUp', 'bio', value)}
          />
          <PrivacyOption 
            title="Phone Number" 
            value={privacySettings.peeredUp.phoneNumber}
            onValueChange={(value) => handleSwitchChange('peeredUp', 'phoneNumber', value)}
          />
          <PrivacyOption 
            title="Email ID" 
            value={privacySettings.peeredUp.emailId}
            onValueChange={(value) => handleSwitchChange('peeredUp', 'emailId', value)}
          />
          <PrivacyOption 
            title="Activities" 
            value={privacySettings.peeredUp.activities}
            onValueChange={(value) => handleSwitchChange('peeredUp', 'activities', value)}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <PrivacyOption 
            title="Profile Photo" 
            value={privacySettings.general.profilePhoto}
            onValueChange={(value) => handleSwitchChange('general', 'profilePhoto', value)}
          />
          <PrivacyOption 
            title="Bio" 
            value={privacySettings.general.bio}
            onValueChange={(value) => handleSwitchChange('general', 'bio', value)}
          />
          <PrivacyOption 
            title="Phone Number" 
            value={privacySettings.general.phoneNumber}
            onValueChange={(value) => handleSwitchChange('general', 'phoneNumber', value)}
          />
          <PrivacyOption 
            title="Email ID" 
            value={privacySettings.general.emailId}
            onValueChange={(value) => handleSwitchChange('general', 'emailId', value)}
          />
          <PrivacyOption 
            title="Activities" 
            value={privacySettings.general.activities}
            onValueChange={(value) => handleSwitchChange('general', 'activities', value)}
          />
        </View>
      </View>
    </View>
  );
};

interface PrivacyOptionProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const PrivacyOption = ({ title, value, onValueChange }: PrivacyOptionProps) => (
  <View style={styles.option}>
    <Text style={styles.optionText}>{title}</Text>
    <Switch 
      trackColor={{false: '#767577', true: theme.colors.orange}}
      thumbColor={'#FFEEE6'}
      ios_backgroundColor="#3e3e3e" 
      value={value} 
      onValueChange={onValueChange} 
    />
  </View>
);

export default AccountPrivacy; 