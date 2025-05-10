import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';
import { SAFETY_GUIDELINES } from '../../constants/safetyGuidelines';

const SafetyNotices = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title="Safety Notices" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.mainTitle}>PeerHub Community Guidelines</Text>
        
        <Text style={styles.welcomeText}>
          Hey there! 👋 Welcome to PeerHub, a space where students connect, collaborate, and grow. To keep this community safe, respectful, and valuable for everyone, here are a few simple ground rules:
        </Text>

        {SAFETY_GUIDELINES.map((guideline) => (
          <View key={guideline.id} style={styles.guidelineContainer}>
            <Text style={styles.guidelineTitle}>
              {guideline.id}. {guideline.title} {guideline.emoji}
            </Text>
            <Text style={styles.guidelineDescription}>
              {guideline.description}
            </Text>
          </View>
        ))}

        <Text style={styles.footerText}>
          Thanks for being part of PeerHub—let’s learn, grow, and innovate together! 🚀
        </Text>
      </ScrollView>
    </View>
  );
};

export default SafetyNotices; 