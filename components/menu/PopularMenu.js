import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK, GREY, WHITE, YELLOW} from '../../constants/color';

import {useDispatch} from 'react-redux';
import {addItem} from '../../redux/cart/cartSlice';
import Snackbar from 'react-native-snackbar';

const PopularMenu = ({item}) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addItem(item));

    Snackbar.show({
      text: `${item.name} added to cart!`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: YELLOW,
      duration: 2000,
      fontFamily: 'Poppins-Medium',
      textColor: WHITE,
    });
  };

  return (
    <View
      style={{
        margin: 3,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
      }}>
      <Image source={{uri: item.image}} style={{width: 120, height: 100}} />
      <Text
        style={{
          color: GREY,
          textAlign: 'center',
          fontFamily: 'Poppins-Medium',
          marginTop: 8,
        }}>
        {item.name}
      </Text>
      <Text
        style={{
          color: BLACK,
          textAlign: 'center',
          fontFamily: 'Poppins-SemiBold',
          marginTop: -2,
        }}>
        Rs. {item.price}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: YELLOW,
          alignSelf: 'center',
          borderRadius: 5,
          paddingHorizontal: 2,
          marginTop: 8,
        }}
        onPress={addItemToCart}>
        <Ionicons name="add" size={22} color={WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default PopularMenu;
