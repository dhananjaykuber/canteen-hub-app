import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '@env';
import firestore from '@react-native-firebase/firestore';
import RazorpayCheckout from 'react-native-razorpay';
import Snackbar from 'react-native-snackbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK, GREY, WHITE, YELLOW} from '../constants/color';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  increase,
  decrease,
  removeItem,
  calculateSubtotal,
  clearCart,
} from '../redux/cart/cartSlice';

const width = Dimensions.get('window').width;

const Cart = ({navigation}) => {
  const dispatch = useDispatch();

  const {cartItems, totalAmount} = useSelector(state => state.cart);
  const {user} = useSelector(state => state.user);

  const [orderId, setOrderId] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(calculateSubtotal());
  }, [cartItems]);

  const showMessage = (message, color) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: color,
      duration: 2000,
      fontFamily: 'Poppins-Medium',
      textColor: WHITE,
    });
  };

  const handleCheckout = async () => {
    setLoading(true);

    const date =
      new Date().getDate() + 1 > 10
        ? new Date().getDate()
        : '0' + new Date().getDate();
    const month =
      new Date().getMonth() + 1 > 10
        ? new Date().getMonth() + 1
        : '0' + (new Date().getMonth() + 1);
    const year = new Date().getFullYear();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/order/create-order`,
        {amount: totalAmount * 100},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      var options = {
        description: 'Canteen Hub Order Payment',
        image:
          'https://cdni.iconscout.com/illustration/premium/thumb/workers-sitting-in-canteen-6258340-5168008.png',
        currency: 'INR',
        key: process.env.RAZORPAY_KEY,
        amount: totalAmount,
        name: 'Canteen Hub',
        order_id: response.data.id,
        prefill: {
          email: user.email,
          name: user.name,
        },
        theme: {color: '#FAB317'},
      };

      RazorpayCheckout.open(options)
        .then(data => {
          firestore()
            .collection('orders')
            .doc()
            .set({
              items: cartItems,
              total: totalAmount,
              served: false,
              email: user.email,
              date: `${date}-${month}-${year}`,
              paid: true,
              paymentId: data.razorpay_payment_id,
              orderId: orderId,
              name: user.name,
              createdAt: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              showMessage('You order placed successfully', '#4CAF50');
              dispatch(clearCart());
            });
        })
        .catch(error => {
          showMessage('Cannot complete transaction.', '#f44336');
          setLoading(false);
          return;
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const renderItem = ({item}) => {
    return (
      <>
        {item.total > 0 && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: WHITE,
              margin: 5,
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                backgroundColor: YELLOW,
                borderRadius: 50,
                paddingHorizontal: 3,
                paddingVertical: 2,
              }}
              onPress={() => dispatch(removeItem(item.id))}>
              <Ionicons name="trash-outline" size={15} color={WHITE} />
            </TouchableOpacity>
            <Image
              source={{uri: item.image}}
              style={{width: 100, height: 80}}
            />
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={{color: BLACK, fontFamily: 'Poppins-Medium'}}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: YELLOW,
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingRight: 4,
                    paddingLeft: 4,
                  }}>
                  <TouchableOpacity onPress={() => dispatch(decrease(item.id))}>
                    <Ionicons name="remove-outline" size={20} color={YELLOW} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: WHITE,
                      fontFamily: 'Poppins-Medium',
                      backgroundColor: YELLOW,
                      width: 25,
                      textAlign: 'center',
                      marginHorizontal: 2,
                    }}>
                    {item?.total}
                  </Text>
                  <TouchableOpacity onPress={() => dispatch(increase(item.id))}>
                    <Ionicons name="add" size={20} color={YELLOW} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    color: BLACK,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  Rs.{item.price}
                </Text>
              </View>
            </View>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.cartScreen}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 15,
          backgroundColor: YELLOW,
        }}>
        <Text
          style={{
            color: WHITE,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
          Canteen Hub
        </Text>
        <TouchableOpacity>
          <Ionicons
            name="menu-outline"
            size={25}
            color={WHITE}
            onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: WHITE,
          flex: 1,
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
          marginTop: 10,
          paddingVertical: 30,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            color: YELLOW,
            fontFamily: 'Poppins-SemiBold',
            paddingHorizontal: 10,
            fontSize: 18,
            marginVertical: 10,
          }}>
          Canteen Hub Cart
        </Text>

        {cartItems.length > 0 ? (
          <View>
            <Text
              style={{
                color: BLACK,
                fontFamily: 'Poppins-SemiBold',
                paddingHorizontal: 10,
                fontSize: 15,
                marginVertical: 10,
              }}>
              Items
            </Text>

            <FlatList
              data={cartItems}
              renderItem={renderItem}
              ListFooterComponent={
                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#D3D3D3',
                      padding: 10,
                    }}>
                    <Text style={{color: GREY, fontFamily: 'Poppins-Medium'}}>
                      Cart Subtotal
                    </Text>
                    <Text style={{color: BLACK, fontFamily: 'Poppins-Bold'}}>
                      Rs. {totalAmount}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: YELLOW,
                      paddingVertical: 12,
                      borderRadius: 7,
                      marginTop: 20,
                    }}
                    onPress={handleCheckout}
                    disabled={loading}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          textTransform: 'uppercase',
                          textAlign: 'center',
                        }}>
                        Checkout
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        ) : (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/canteenhub-ef590.appspot.com/o/empty-cart.png?alt=media&token=3cb51323-7df4-486f-a4fa-0c7b9ad4296f',
              }}
              style={{width: 150, height: 150, marginLeft: -40}}
            />
            <Text
              style={{
                color: BLACK,
                fontFamily: 'Poppins-SemiBold',
                paddingHorizontal: 10,
                fontSize: 16,
                marginVertical: 10,
              }}>
              Your Cart is Empty
            </Text>
            <Text
              style={{
                color: GREY,
                fontFamily: 'Poppins-Medium',
                paddingHorizontal: 10,
                fontSize: 13,
                textAlign: 'center',
                width: 300,
              }}>
              Look like you haven't added anything to your cart yet
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: YELLOW,
                paddingVertical: 12,
                borderRadius: 80,
                marginTop: 20,
                paddingHorizontal: 30,
              }}
              onPress={() => navigation.navigate('Menus')}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}>
                Go To Menu
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartScreen: {
    flex: 1,
    backgroundColor: YELLOW,
  },
});

export default Cart;
