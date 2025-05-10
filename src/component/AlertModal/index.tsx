import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { theme } from "../../theme";

interface CustomModalProps {
  visible: boolean;
  text: string;
  buttonText: string;
  onButtonPress: () => void;
  onClose: () => void;
}

const AlertModal: React.FC<CustomModalProps> = ({
  visible,
  text,
  buttonText,
  onButtonPress,
  onClose,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.text}>{text}</Text>
              <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#243139",
    padding: 20,
    alignItems: "center",
    position: "relative",
    zIndex: 10000
  },
  text: {
    color: "#FFFFFF",
    fontSize: widthPercentageToDP(4.2),
    marginBottom: heightPercentageToDP(3),
    fontFamily: theme.fontFamily.medium,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.orange,
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(3),
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: widthPercentageToDP(4.2),
    fontFamily: theme.fontFamily.boldSemi
  },
});

export default AlertModal;
