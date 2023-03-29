import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK, GREY, WHITE, YELLOW, RED} from '../constants/color';
import {useSelector} from 'react-redux';

const Order = ({navigation}) => {
  const {user} = useSelector(state => state.user);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const date =
      new Date().getDate() + 1 > 10
        ? new Date().getDate()
        : '0' + new Date().getDate();
    const month =
      new Date().getMonth() + 1 > 10
        ? new Date().getMonth() + 1
        : '0' + (new Date().getMonth() + 1);
    const year = new Date().getFullYear();

    firestore()
      .collection('orders')
      .where('email', '==', user.email)
      .where('date', '==', `${date}-${month}-${year}`)
      .onSnapshot(querySnapshot => {
        setItems([]);
        querySnapshot.forEach(documentSnapshot => {
          const tempData = {
            date: `${date}-${month}-${year}`,
            orderNo: documentSnapshot.id,
            subtotal: documentSnapshot.data().total,
            status: documentSnapshot.data().served,
          };
          let tempItems = [];
          documentSnapshot.data().items.map(item => {
            tempItems.push(item);
          });
          tempData.items = tempItems;
          setItems(items => [...items, tempData]);
        });
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: YELLOW,
          padding: 10,
          borderRadius: 7,
          marginVertical: 5,
        }}
        key={item.orderNo}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              backgroundColor: item.status ? '#378805' : 'red',
              textAlign: 'center',
              borderRadius: 5,
              paddingTop: 2,
              paddingHorizontal: 10,
              marginBottom: 10,
              fontFamily: 'Poppins-SemiBold',
            }}>
            {item.status ? 'Served' : 'Not Served'}
          </Text>
          <Text style={{color: GREY, fontFamily: 'Poppins-SemiBold'}}>
            {item.date}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontFamily: 'Poppins-SemiBold', color: BLACK}}>
            Order No - {item.orderNo}
          </Text>
          <Text style={{fontFamily: 'Poppins-SemiBold', color: YELLOW}}>
            Rs. {item.subtotal}
          </Text>
        </View>
        <View
          style={{
            borderTopColor: '#D3D3D3',
            borderTopWidth: 0.5,
            marginTop: 8,
            paddingTop: 12,
          }}>
          {item.items.map(ele => (
            <View style={{flexDirection: 'row'}} key={item.name}>
              <Text
                style={{
                  color: BLACK,
                  fontFamily: 'Poppins-Medium',
                  marginTop: -4,
                  fontSize: 13,
                  flex: 0.6,
                }}>
                {ele.name}
              </Text>
              <Text
                style={{
                  color: BLACK,
                  fontFamily: 'Poppins-Medium',
                  marginTop: -4,
                  fontSize: 13,
                  flex: 0.2,
                }}>
                Qty: {ele.total}
              </Text>
              <Text
                style={{
                  color: BLACK,
                  fontFamily: 'Poppins-Medium',
                  marginTop: -4,
                  fontSize: 13,
                  flex: 0.2,
                  textAlign: 'right',
                }}>
                Rs. {ele.price * ele.total}
              </Text>
            </View>
          ))}
        </View>
      </View>
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
          Canteen Hub Orders
        </Text>

        {items.length > 0 ? (
          <View style={{paddingBottom: 80}}>
            <Text
              style={{
                color: BLACK,
                fontFamily: 'Poppins-SemiBold',
                paddingHorizontal: 10,
                fontSize: 15,
                marginVertical: 10,
              }}>
              Orders
            </Text>

            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item.orderNo}
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
              No Orders Found
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
              Go find the food you like
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

export default Order;
