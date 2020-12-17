import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import UserReducer from './user/reducer';
import TransportReducer from './transport/reducer';
import RecordReducer from './record/reducer';
import ChatRoomReducer from './chatRoom/reducer';
import ReduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
});
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
    AsyncStorage.removeItem('persist:root');
  }

  return appReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
let persistor = persistStore(store);
export { store, persistor };
