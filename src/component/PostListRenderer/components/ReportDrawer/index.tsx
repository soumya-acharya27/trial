import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { ReportCategory } from '../../../../interface/clubinterface';
import { usePostReport } from '../../../../hooks/usePostReport';

interface Props {
  visible: boolean;
  onClose: () => void;
  postId: string;
  successCB: () => void;
  adjustRepost: () => void;
}

const ReportDrawer: React.FC<Props> = ({ visible, onClose, postId, successCB, adjustRepost }) => {
  const { reportCategories, categoriesLoading, submitReport, reportLoading } = usePostReport();

  const handleReportPress = async (reportId: string) => {
    try {
      await submitReport(postId, reportId);
      successCB()
      adjustRepost()
      onClose();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.container}>
          <View style={styles.handle} />
          <Text style={styles.title}>Report Post</Text>
          
          {categoriesLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <ScrollView style={styles.content}>
              {reportCategories.map((category: ReportCategory) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.reasonItem}
                  onPress={() => handleReportPress(category.id)}
                  disabled={reportLoading}
                >
                  <Text style={[
                    styles.reasonText,
                    reportLoading && styles.disabledText
                  ]}>
                    {category.reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ReportDrawer; 