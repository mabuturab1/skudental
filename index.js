import { registerRootComponent } from 'expo';

import App from './App';
import { messaging } from './helpers/firebase/Firebase';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
messaging.setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
registerRootComponent(App);
