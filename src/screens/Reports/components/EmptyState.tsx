import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const EmptyState = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>You haven't reported anything</Text>
      <Text style={styles.emptySubtitle}>
        Read our Guidelines to learn what we allow on PeerHub and how you can help us report and remove whatever we don't.
      </Text>
    </View>
  );
};

export default EmptyState; 