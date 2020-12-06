import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderButton, MaterialMenu } from '../components';
import { isAndroid } from '../helpers/Utils';
import { Ionicons } from '@expo/vector-icons';
import {
  RecordDetailsScreen,
  RecordListScreen,
  LabDocketScreen,
  PricingScreen,
  SkSalesScreen,
  ArrangePickupScreen,
  PickupRequestDetailsScreen,
  CreateRecordScreen,
  RecordInquiryScreen,
  UserSigninScreen,
  UserSignupScreen,
  PickupListScreen,
} from '../screens';
import { StyleSheet, View } from 'react-native';
import { ThemeColors } from '../constants/Colors';
import { routes } from '../constants/routes';
const screenOptions = {
  headerStyle: {
    backgroundColor: isAndroid() ? ThemeColors.primary : '',
  },
  headerTitleStyle: { alignSelf: 'flex-start' },

  headerTintColor: isAndroid() ? '#fff' : ThemeColors.primary,
};

const getCommonOptions = (drawerNavigation) => ({
  // headerLeft: (props) => menuButton(drawerNavigation),
  headerRight: (props) => popupMenu(drawerNavigation),
});

const Stack = createStackNavigator();

const recordListData = [
  { componentScreenName: 'Record List', component: RecordListScreen },
  { componentScreenName: 'TestDetails', component: RecordDetailsScreen },
];

const authData = [
  { componentScreenName: routes.UserSignIn, component: UserSigninScreen },
  { componentScreenName: routes.UserSignUp, component: UserSignupScreen },
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

const drawerData = [
  {
    navigatorName: routes.SkSales,
    component: SkSalesScreen,
    componentName: 'SkDental Lab',
    wrapStackNavigator: true,
  },
  {
    navigatorName: routes.Pricing,
    component: PricingScreen,
    componentName: 'Pricing ',
    wrapStackNavigator: true,
  },
  {
    navigatorName: routes.LabDocket,
    component: LabDocketScreen,
    componentName: 'Lab Docket',
    wrapStackNavigator: true,
  },
  {
    navigatorName: routes.CreateRecord,
    component: CreateRecordScreen,
    componentName: 'Create Patient Record ',
    wrapStackNavigator: true,
  },
  {
    navigatorName: routes.RecordList,
    component: RecordListNavigator,
    componentName: 'Patient Record List',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.ArrangePickup,
    component: ArrangePickupScreen,
    componentName: 'Arrange Pickup',
    wrapStackNavigator: true,
  },
  {
    navigatorName: routes.RecordInquriy,
    component: RecordInquiryScreen,
    componentName: 'Record Inquiry',
    wrapStackNavigator: true,
  },
  {
    navigatorName: routes.PickupList,
    component: PickupListScreen,
    componentName: 'Pickup List',
    wrapStackNavigator: true,
  },
  {
    navigatorName: routes.Auth,
    component: AuthNavigator,
    componentName: 'Authentication',
    wrapStackNavigator: false,
  },
];

const tabData = [
  {
    navigatorName: routes.SkSales,
    component: SkSalesScreen,
    componentName: 'SkDental Lab',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.RecordList,
    component: RecordListNavigator,
    componentName: 'Patient Record List',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.CreateRecord,
    component: CreateRecordScreen,
    componentName: 'Create Patient Record ',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.ArrangePickup,
    component: ArrangePickupScreen,
    componentName: 'Arrange Pickup',
    wrapStackNavigator: false,
  },
  {
    navigatorName: routes.RecordInquriy,
    component: RecordInquiryScreen,
    componentName: 'Record Inquiry',
    wrapStackNavigator: false,
  },
];

const getTabIcon = (routeName, focused) => {
  const prefix = isAndroid() ? 'md-' : 'ios-';
  switch (routeName) {
    case routes.SkSales:
      return prefix + (focused ? 'home' : 'home-outline');
    case routes.RecordList:
      return prefix + (focused ? 'receipt' : 'receipt-outline');
    case routes.CreateRecord:
      return prefix + (focused ? 'add-circle' : 'add-circle-outline');
    case routes.ArrangePickup:
      return prefix + (focused ? 'bus' : 'bus-outline');
    case routes.RecordInquriy:
      return (
        prefix +
        (focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline')
      );
  }
};

const styles = StyleSheet.create({
  menuButtonWrapper: {
    paddingLeft: 5,
  },
});
const menuButton = (navigation) => {
  console.log('navigation is', navigation.toggleDrawer);
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

const popupMenu = (navigation) => {
  const popupMenuData = [
    { label: 'Lab Docket', id: 1 },
    { label: 'Logout', id: 2 },
  ];
  const onPopupMenuClick = (id) => {
    switch (id) {
      case 1:
        return navigation.navigate(routes.LabDocket);
      case 2:
        return navigation.reset({
          index: 0,
          routes: [{ name: routes.Auth }],
        });
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
const Drawer = createDrawerNavigator();

// export default drawerNavigator = () => (
//   <Drawer.Navigator initialRouteName='Home' >
//     {drawerData.map(
//       ({ wrapStackNavigator, component, componentName, navigatorName }) =>
//         wrapStackNavigator ? (
//           <Drawer.Screen
//             key={componentName + navigatorName}
//             name={navigatorName}
//           >
//             {(props) => (
//               <WrapStackNavigator
//                 {...props}
//                 component={component}
//                 name={componentName}
//               />
//             )}
//           </Drawer.Screen>
//         ) : (
//           <Drawer.Screen
//             key={navigatorName}
//             name={navigatorName}
//             component={component}
//           />
//         )
//     )}
//   </Drawer.Navigator>
// );
const Tab = createBottomTabNavigator();
const tabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = getTabIcon(route.name, focused);
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
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
export default mainStackNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions} initialRouteName={routes.Auth}>
    <Stack.Screen
      options={({ navigation }) => ({
        ...getCommonOptions(navigation),
        title: 'SkDentals Lab',
        headerLeft: null,
      })}
      name={routes.Home}
      component={tabNavigator}
    />
    <Stack.Screen name={routes.LabDocket} component={LabDocketScreen} />
    <Stack.Screen
      options={{ headerShown: false }}
      name={routes.Auth}
      component={AuthNavigator}
    />
    
  </Stack.Navigator>
);