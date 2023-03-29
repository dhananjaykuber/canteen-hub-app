import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './components/CustomDrawer';
import {BLACK, GREY, WHITE, YELLOW} from './constants/color';

import Login from './screens/Login';
import Menus from './screens/Menus';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import Order from './screens/Order';

import {store} from './store';
import {Provider} from 'react-redux';

import auth from '@react-native-firebase/auth';
import Navigation from './components/Navigation';

const Drawer = createDrawerNavigator();

const App = () => {
  // const {user} = useSelector(state => user.state);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      console.log(user.email, user.displayName);
    });

    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'));
  }, []);

  return (
    <Provider store={store}>
      {/* <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          drawerContent={props => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: YELLOW,
            drawerActiveTintColor: WHITE,
            drawerInactiveTintColor: BLACK,
            drawerLabelStyle: {
              marginLeft: -25,
              fontSize: 15,
              fontFamily: 'Poppins-Medium',
              fontWeight: '500',
            },
          }}>
          <Drawer.Screen
            name="Menus"
            component={Menus}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons
                  name="fast-food-outline"
                  size={20}
                  color={color}
                  style={{marginTop: -3}}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Cart"
            component={Cart}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons
                  name="cart-outline"
                  size={20}
                  color={color}
                  style={{marginTop: -3}}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Order"
            component={Order}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons
                  name="clipboard-outline"
                  size={20}
                  color={color}
                  style={{marginTop: -3}}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={color}
                  style={{marginTop: -3}}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons
                  name="clipboard-outline"
                  size={20}
                  color={color}
                  style={{marginTop: -3}}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer> */}
      <Navigation />
    </Provider>
  );
};

export default App;
