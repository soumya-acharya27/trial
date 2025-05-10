import { StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 