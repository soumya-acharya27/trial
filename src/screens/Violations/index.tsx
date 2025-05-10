import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import CommonHeader from '../../components/CommonHeader';

const Violations = () => {
  return (
    <View style={styles.container}>
      <CommonHeader title="Violations" />
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>You don't have any violations</Text>
        <Text style={styles.emptySubtitle}>
          Read our Guidelines to learn what we allow on PeerHub and how you can help us report and remove whatever we don't.
        </Text>
      </View>
    </View>
  );
};

export default Violations; 