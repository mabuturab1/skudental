// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// var firebaseConfig = {
//   apiKey: 'AIzaSyCuxI7dLcSit5rwFZnzNYdYNjVSWSURNPU',
//   authDomain: 'upwork-abuturab1.firebaseapp.com',
//   databaseURL: 'https://upwork-abuturab1.firebaseio.com',
//   projectId: 'upwork-abuturab1',
//   storageBucket: 'upwork-abuturab1.appspot.com',
//   messagingSenderId: '851288471005',
//   appId: '1:851288471005:web:39e59fd8b107a106dd3234',
//   measurementId: 'G-9YVWEWQGFF',
// };
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const database = firebase.firestore();
// const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export { auth, database, googleAuthProvider, facebookAuthProvider, firebase };
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
const authModule = auth();
const EmailAuthProvider = auth.EmailAuthProvider;
const messagingModule = messaging();
import firestore from '@react-native-firebase/firestore';

const chatRoomsCollection = firestore().collection('chatRooms');
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
export {
  authModule as auth,
  messagingModule as messaging,
  chatRoomsCollection,
  firestore,
  EmailAuthProvider,
  requestUserPermission,
};
