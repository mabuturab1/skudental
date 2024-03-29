import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import UserReducer from './user/reducer';
import TransportReducer from './transport/reducer';
import RecordReducer from './record/reducer';
import ChatRoomReducer from './chatRoom/reducer';
import AlertReducer from './alert/reducer';
import AdminReducer from './admin/reducer';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import freeze from 'redux-freeze'
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
};
const appReducer = combineReducers({
  auth: UserReducer,
  transport: TransportReducer,
  record: RecordReducer,
  chatRoom: ChatRoomReducer,
  alert: AlertReducer,
  admin: AdminReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
    AsyncStorage.multiRemove(['token', 'userRole']);
  }

  return appReducer(state, action);
};
const middlewares=[ReduxThunk];
// if(__DEV__){
//   middlewares.push(freeze);
// }
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middlewares));
let persistor = persistStore(store);
export { store, persistor };
