import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {BLACK, GREY, WHITE} from '../constants/color';

const CustomDrawer = props => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'space-between',
        backgroundColor: WHITE,
      }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: WHITE}}>
        <View style={{flex: 1, paddingHorizontal: 5}}></View>

        <Text
          style={{
            color: BLACK,
            fontFamily: 'Poppins-Medium',
            textTransform: 'uppercase',
            marginLeft: 15,
            fontSize: 20,
          }}>
          Canteen Hub
        </Text>

        <View
          style={{
            flex: 1,
            backgroundColor: WHITE,
            paddingTop: 15,
          }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
