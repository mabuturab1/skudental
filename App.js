import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { isUserAuthenticated } from './helpers/Utils';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import { store, persistor } from './store/store';
import { useFonts } from 'expo-font';
import 'react-native-get-random-values';
import { ShowAlert, ChatRoomsListener } from './components';

import { messaging, requestUserPermission } from './helpers/firebase/Firebase';
const getFontsConfig = () => ({
  RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
  RobotoBlackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
  RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
  RobotoBoldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
  RobotoItalic: require('./assets/fonts/Roboto-Italic.ttf'),
  RobotoLight: require('./assets/fonts/Roboto-Light.ttf'),
  RobotoLightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
  RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
  RobotoMediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
  RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  RobotoThin: require('./assets/fonts/Roboto-Thin.ttf'),
  RobotoThinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf'),
});
const MainNavigationScreens = () => {
  const auth = useSelector(({ auth }) => auth);
  const token = auth.token;
  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging.onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, [requestUserPermission]);
  return MainNavigator(auth);
};
export default function App() {
  const [fontsLoaded] = useFonts(getFontsConfig());
  const persistorLoaded = useRef(false);

  useEffect(() => {
    try {
      SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
  }, []);
  if (fontsLoaded && persistorLoaded.current) {
    SplashScreen.hideAsync();
    persistorLoaded.current = false;
  }
  const showApp = () => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      return;
    }
    persistorLoaded.current = true;
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={showApp}>
        <NavigationContainer>
          <MainNavigationScreens />
          <ShowAlert />
          <ChatRoomsListener />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
