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
import { ShowAlert, ChatRoomsListener, AutoLogin } from './components';

import { messaging, requestUserPermission } from './helpers/firebase/Firebase';
const getFontsConfig = () => ({
  RalewayBlack: require('./assets/fonts/Raleway-Black.ttf'),
  RalewayBlackItalic: require('./assets/fonts/Raleway-BlackItalic.ttf'),
  RalewayBold: require('./assets/fonts/Raleway-Bold.ttf'),
  RalewayBoldItalic: require('./assets/fonts/Raleway-BoldItalic.ttf'),
  RalewayExtraBold: require('./assets/fonts/Raleway-ExtraBold.ttf'),
  RalewayExtraBoldItalic: require('./assets/fonts/Raleway-ExtraBoldItalic.ttf'),
  RalewayItalic: require('./assets/fonts/Raleway-Italic.ttf'),
  RalewayLight: require('./assets/fonts/Raleway-Light.ttf'),
  RalewayLightItalic: require('./assets/fonts/Raleway-LightItalic.ttf'),
  RalewayMedium: require('./assets/fonts/Raleway-Medium.ttf'),
  RalewayMediumItalic: require('./assets/fonts/Raleway-MediumItalic.ttf'),
  RalewaySemiBold: require('./assets/fonts/Raleway-SemiBold.ttf'),
  RalewaySemiBoldItalic: require('./assets/fonts/Raleway-SemiBoldItalic.ttf'),
  RalewayRegular: require('./assets/fonts/Raleway-Regular.ttf'),
  RalewayThin: require('./assets/fonts/Raleway-Thin.ttf'),
  RalewayThinItalic: require('./assets/fonts/Raleway-ThinItalic.ttf'),
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
        {fontsLoaded ? (
          <NavigationContainer>
            <MainNavigationScreens />
            <ShowAlert />
            <ChatRoomsListener />
            <AutoLogin />
          </NavigationContainer>
        ) : null}
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
