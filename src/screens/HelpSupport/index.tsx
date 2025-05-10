import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import RightArrow from '../../assets/svg/Right.svg';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HelpSupport = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      }
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CommonHeader title="Help & Support" />
      <View style={styles.content}>
        <MenuItem 
          title="Reports"
          subtitle="These are the reports that you've submitted."
          onPress={() => navigation.navigate('Reports')}
        />
        <MenuItem 
          title="Safety Notices"
          subtitle="Find the resources to help you recover from a difficult experiences."
          onPress={() => navigation.navigate('SafetyNotices')}
        />
        <MenuItem 
          title="Violations"
          subtitle="These are the posts that you've shared that go against our guidelines."
          onPress={() => navigation.navigate('Violations')}
        />
      </View>
    </View>
  );
};

const MenuItem = ({ title, subtitle, onPress }: { title: string, subtitle: string, onPress: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <Text style={styles.menuItemTitle}>{title}</Text>
      <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
    </View>
    <RightArrow height={hp(2)} width={hp(2)} />
  </TouchableOpacity>
);

export default HelpSupport; 