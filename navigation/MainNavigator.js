import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderButton, MaterialMenu } from '../components';
import {
  isAndroid,
  isUserAuthenticated,
  isUserVerified,
} from '../helpers/Utils';
import { Ionicons } from '@expo/vector-icons';
import {
  RecordDetailsScreen,
  RecordListScreen,
  LabDocketScreen,
  PricingScreen,
  HomeFeedScreen,
  CreateTransportRequestScreen,
  PickupRequestDetailsScreen,
  CreateRecordScreen,
  RecordInquiryScreen,
  UserSigninScreen,
  UserSignupScreen,
  TransportListScreen,
  UpdateUserScreen,
  ConfirmPasswordScreen,
  PasswordResetScreen,
  PinScreen,
  EmailScreen,
  PreviewCarouselScreen,
  PreviewRecordScreen,
  ImagePreviewScreen,
  LogoutScreen,
  RoomScreen,
  ChatRoomListScreen,
  UploadPhotoScreen,
  VerifyUsersScreen,
  WebViewLinkScreen,
  UserRecordListScreen,
  UserSingleRecordPreviewScreen,
  UserNotApprovedScreen,
} from '../screens';
import { StyleSheet, View } from 'react-native';
import { ThemeColors } from '../constants/Colors';
import { routes } from '../constants/routes';
import { Role } from '../constants/UIConstants';
const screenOptions = {
  headerStyle: {
    backgroundColor: isAndroid() ? '#fafafa' : '',
  },
  headerTitleStyle: {
    alignSelf: 'flex-start',
    color: 'black',
    fontFamily: 'RalewayBold',
  },

  headerTintColor: 'black',
};

const getCommonOptions = (drawerNavigation, user) => ({
  // headerLeft: (props) => menuButton(drawerNavigation),
  headerRight: (props) => popupMenu(drawerNavigation, user),
});

const Stack = createStackNavigator();

const recordListData = [
  { componentScreenName: 'Record List', component: RecordListScreen },
  { componentScreenName: 'TestDetails', component: RecordDetailsScreen },
];

const authData = [
  { componentScreenName: routes.UserSignIn, component: UserSigninScreen },
  { componentScreenName: routes.UserSignUp, component: UserSignupScreen },
  { componentScreenName: routes.PasswordReset, component: PasswordResetScreen },
  { componentScreenName: routes.Email, component: EmailScreen },
  { componentScreenName: routes.Pin, component: PinScreen },
];

const createStackNav = (listData, drawerNavigation, additionalOptions = {}) => (
  <Stack.Navigator screenOptions={screenOptions}>
    {listData.map(({ component, componentScreenName }) => (
      <Stack.Screen
        key={componentScreenName}
        options={{ headerShown: false, ...additionalOptions }}
        name={componentScreenName}
        component={component}
      />
    ))}
  </Stack.Navigator>
);

const RecordListNavigator = (props) =>
  createStackNav(recordListData, props.navigation);
const AuthNavigator = (props) =>
  createStackNav(authData, props.navigation, { headerLeft: null });

const tabData = [
  {
    navigatorName: routes.HomeFeed,
    component: HomeFeedScreen,
    componentName: 'SkDental Lab',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.Pricing,
    component: PricingScreen,
    componentName: 'Pricing',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.CreateRecord,
    component: CreateRecordScreen,
    componentName: 'Create Patient Record ',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.TransportList,
    component: TransportListScreen,
    componentName: 'Transport Request List',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.ChatRoomList,
    component: ChatRoomListScreen,
    componentName: 'ChatRoomList',
    wrapStackNavigator: false,
  },
];

const getTabIcon = (routeName, focused) => {
  const prefix = isAndroid() ? 'md-' : 'ios-';
  switch (routeName) {
    case routes.HomeFeed:
      return {
        name: prefix + (focused ? 'home' : 'home-outline'),
        Icon: Ionicons,
      };
    case routes.Pricing:
      return {
        name: prefix + (focused ? 'receipt' : 'receipt-outline'),
        Icon: Ionicons,
      };
    case routes.CreateRecord:
      return {
        name: prefix + (focused ? 'add-circle' : 'add-circle-outline'),
        Icon: Ionicons,
      };
    case routes.TransportList:
      return {
        name: prefix + (focused ? 'airplane' : 'airplane-outline'),
        Icon: Ionicons,
      };
    case routes.ChatRoomList:
      return {
        name:
          prefix +
          (focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'),
        Icon: Ionicons,
      };
  }
};

const styles = StyleSheet.create({
  menuButtonWrapper: {
    paddingLeft: 5,
  },
});
const menuButton = (navigation) => {
  return (
    <View style={styles.menuButtonWrapper}>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={isAndroid() ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    </View>
  );
};

const popupMenu = (navigation, user) => {
  const isAdmin = user?.role?.roleType === Role.Admin;
  const popupMenuData = [
    { label: 'Update Photo', id: 'UPDATE_PHOTO' },
    { label: 'Update User', id: 'UPDATE_USER' },
    { label: 'Lab Docket', id: 'LAB_DOCKET' },
    { label: 'Logout', id: 'LOGOUT' },
  ];
  if (isAdmin)
    popupMenuData.unshift({ label: 'Verify Users', id: 'VERIFY_USERS' });
  const onPopupMenuClick = (id) => {
    switch (id) {
      case 'VERIFY_USERS':
        return navigation.navigate(routes.VerifyUsers);
      case 'UPDATE_PHOTO':
        return navigation.navigate(routes.UploadPhoto);
      case 'UPDATE_USER':
        return navigation.navigate(routes.ConfirmPassword, {
          routeToNavigate: routes.UpdateUser,
        });
      case 'LAB_DOCKET':
        return navigation.navigate(routes.LabDocket);
      case 'LOGOUT':
        return navigation.navigate(routes.Logout);
    }
  };
  return <MaterialMenu data={popupMenuData} onItemClick={onPopupMenuClick} />;
};

const WrapStackNavigator = ({ component: Component, name, navigation }) => (
  <Stack.Navigator headerMode='screen' screenOptions={screenOptions}>
    <Stack.Screen
      options={{
        // headerLeft: (props) => menuButton(navigation),
        headerRight: (props) => popupMenu(navigation),
      }}
      name={name}
      component={Component}
    />
  </Stack.Navigator>
);
const Tab = createBottomTabNavigator();
const tabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let { Icon, name } = getTabIcon(route.name, focused);
        // You can return any component that you like here!
        return <Icon name={name} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false,
    }}
  >
    {tabData.map(
      ({ wrapStackNavigator, component, componentName, navigatorName }) => (
        <Tab.Screen
          key={navigatorName}
          name={navigatorName}
          component={component}
        />
      )
    )}
  </Tab.Navigator>
);
export default mainStackNavigator = (auth) => (
  <Stack.Navigator
    screenOptions={screenOptions}
    initialRouteName={
      isUserAuthenticated(auth.token)
        ? isUserVerified(auth?.user)
          ? routes.Home
          : routes.UserNotApproved
        : routes.Auth
    }
  >
    <Stack.Screen
      options={({ navigation }) => ({
        ...getCommonOptions(navigation, auth.user),
        title: 'SK',
        headerLeft: null,
      })}
      name={routes.Home}
      component={tabNavigator}
    />
    <Stack.Screen name={routes.LabDocket} component={LabDocketScreen} />
    <Stack.Screen name={routes.UpdateUser} component={UpdateUserScreen} />
    <Stack.Screen
      name={routes.PreviewCarousel}
      options={{ headerShown: false }}
      component={PreviewCarouselScreen}
    />
    <Stack.Screen
      name={routes.UserSingleRecordPreview}
      options={{ headerShown: false }}
      component={UserSingleRecordPreviewScreen}
    />
    <Stack.Screen name={routes.PreviewRecord} component={PreviewRecordScreen} />
    <Stack.Screen
      name={routes.ImagePreview}
      options={{ headerShown: false, animationEnabled: false }}
      component={ImagePreviewScreen}
    />
    <Stack.Screen
      name={routes.ConfirmPassword}
      component={ConfirmPasswordScreen}
    />
    <Stack.Screen name={routes.WebviewLink} component={WebViewLinkScreen} />
    <Stack.Screen name={routes.Pricing} component={PricingScreen} />
    <Stack.Screen
      options={({ route }) => ({
        title: route?.params?.title || 'UserRecords',
      })}
      name={routes.UserRecordList}
      component={UserRecordListScreen}
    />
    <Stack.Screen
      name={routes.CreateTransportRequest}
      component={CreateTransportRequestScreen}
    />
    <Stack.Screen name={routes.VerifyUsers} component={VerifyUsersScreen} />
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.Auth}
      component={AuthNavigator}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.UserNotApproved}
      component={UserNotApprovedScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.UploadPhoto}
      component={UploadPhotoScreen}
    />
    <Stack.Screen
      name={routes.ChatRoom}
      options={{ title: 'Chat Room' }}
      component={RoomScreen}
    />
    <Stack.Screen
      name={routes.Logout}
      options={{ headerShown: false, animationEnabled: false }}
      component={LogoutScreen}
    />
  </Stack.Navigator>
);
