import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderButton } from '../components';
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
import { Platform, StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
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
  headerLeft: (props) => menuButton(drawerNavigation),
});

const Stack = createStackNavigator();

const recordListData = [
  { componentScreenName: 'Record List', component: RecordListScreen },
  { componentScreenName: 'TestDetails', component: RecordDetailsScreen },
];

const authData = [
  { componentScreenName: 'User SignIn', component: UserSigninScreen },
  { componentScreenName: 'User SignUp', component: UserSignupScreen },
];

const createStackNav = (listData, drawerNavigation) => (
  <Stack.Navigator screenOptions={screenOptions}>
    {listData.map(({ component, componentScreenName }) => (
      <Stack.Screen
        key={componentScreenName}
        options={getCommonOptions(drawerNavigation)}
        name={componentScreenName}
        component={component}
      />
    ))}
  </Stack.Navigator>
);

const RecordListNavigator = (props) =>
  createStackNav(recordListData, props.navigation);
const AuthNavigator = (props) => createStackNav(authData, props.navigation);

const drawerData = [
  {
    navigatorName: routes.Home,
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
    navigatorName: routes.Home,
    component: SkSalesScreen,
    componentName: 'SkDental Lab',
    wrapStackNavigator: true,
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
    wrapStackNavigator: true,
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
];

const getTabIcon = (routeName, focused) => {
  switch (routeName) {
    case routes.Home:
      return focused ? 'home' : 'home-outline';
    case routes.RecordList:
      return focused ? 'receipt' : 'receipt-outline';
    case routes.CreateRecord:
      return focused ? 'add-circle' : 'add-circle-outline';
    case routes.ArrangePickup:
      return focused ? 'bus' : 'bus-outline';
    case routes.RecordInquriy:
      return focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
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

const WrapStackNavigator = ({ component: Component, name, navigation }) => (
  <Stack.Navigator headerMode='screen' screenOptions={screenOptions}>
    <Stack.Screen
      options={{
        headerLeft: (props) => menuButton(navigation),
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
export default tabNavigator = () => (
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
    }}
  >
    {tabData.map(
      ({ wrapStackNavigator, component, componentName, navigatorName }) =>
        wrapStackNavigator ? (
          <Tab.Screen key={componentName + navigatorName} name={navigatorName}>
            {(props) => (
              <WrapStackNavigator
                {...props}
                component={component}
                name={componentName}
              />
            )}
          </Tab.Screen>
        ) : (
          <Tab.Screen
            key={navigatorName}
            name={navigatorName}
            component={component}
          />
        )
    )}
  </Tab.Navigator>
);
