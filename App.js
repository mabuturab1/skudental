import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/MainNavigator';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk;';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import UserReducer from './store/user/reducer';
import TransportReducer from './store/transport/reducer';
import RecordReducer from './store/record/reducer';
const rootReducer = combineReducers({
  user: UserReducer,
  transport: TransportReducer,
  record: RecordReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>{DrawerNavigator()}</NavigationContainer>
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
