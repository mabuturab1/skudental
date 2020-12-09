import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { Provider, useSelector } from 'react-redux';
import { isUserAuthenticated } from './helpers/Utils';
import { PersistGate } from 'redux-persist/integration/react';
import * as SplashScreen from 'expo-splash-screen';
import { store, persistor } from './store/store';
const MainNavigationScreens = () => {
  const token = useSelector(({ auth }) => auth.token);
  return MainNavigator(isUserAuthenticated(token));
};
export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    });
  }, []);
  const showApp = () => {
    SplashScreen.hideAsync();
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={showApp}>
        <NavigationContainer>
          <MainNavigationScreens />
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
