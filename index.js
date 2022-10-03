import "react-native-reanimated"
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

// import OneSignal from 'react-native-onesignal';
import secrets from "./src/secrets.json"

import App from './App';

// OneSignal.setAppId(secrets.OneSignalAppID);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
