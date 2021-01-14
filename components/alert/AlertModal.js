import { Alert } from 'react-native';
export const createAlert = (title, message, callback) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: () => callback(false),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => callback(true) },
    ],
    { cancelable: false }
  );
