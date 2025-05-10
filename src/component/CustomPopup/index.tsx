import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { styles } from './styles';
import { ButtonCustom, ButtonSecondary } from '../ButtonCustom';

interface PopupProps {
  visible: boolean;
  title: string;
  primaryText: string;
  secondaryText: string;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
  onClose: () => void;
}

const CustomPopup: React.FC<PopupProps> = ({
  visible,
  title,
  primaryText,
  secondaryText,
  onPrimaryCta,
  onSecondaryCta,
  onClose,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <ButtonSecondary
              title={secondaryText}
              onPress={onSecondaryCta}
              width={wp('30%')}
            />
            <ButtonCustom
              title={primaryText}
              onPress={onPrimaryCta}
              width={wp('30%')}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomPopup;
