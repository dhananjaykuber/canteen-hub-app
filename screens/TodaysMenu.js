import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SingleMenu from '../components/menu/SingleMenu';
import {BLACK, GREY, WHITE, YELLOW} from '../constants/color';
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {addItem} from '../redux/cart/cartSlice';

const TodaysMenu = ({navigation}) => {
  const {totalItems} = useSelector(state => state.cart);

  const [menus, setMenus] = useState();

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getMenus = async () => {
      firestore()
        .collection('todaysmenus')
        .onSnapshot(snapshot => {
          let menus = [];
          snapshot.forEach(doc => {
            if (doc.id !== 'price') {
              menus.push({id: doc.id, ...doc.data()});
            }
          });
          setMenus(menus);
        });
    };

    const getPrice = () => {
      firestore()
        .collection('todaysmenus')
        .doc('price')
        .onSnapshot(documentSnapshot => {
          setPrice(documentSnapshot.data().price);
        });
    };

    getMenus();
    getPrice();
  }, []);

  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(
      addItem({
        id: '0123456789',
        image:
          'https://firebasestorage.googleapis.com/v0/b/canteenhub-ef590.appspot.com/o/thali.jpeg?alt=media&token=dd1001fc-97f4-46bb-9514-b10a9d2ac282',
        name: 'Thali',
        price: price,
        total: 1,
      }),
    );

    Snackbar.show({
      text: `Added to cart!`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: YELLOW,
      duration: 2000,
      fontFamily: 'Poppins-Medium',
      textColor: WHITE,
    });
  };

  const renderAllMenus = ({item}) => {
    return <SingleMenu item={item} />;
  };

  return (
    <SafeAreaView style={styles.menusScreen}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingVertical: 15,
          backgroundColor: '#FFFFFF',
        }}>
        <Text
          style={{
            color: BLACK,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 18,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
          Canteen Hub
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{position: 'relative', marginRight: 20}}
            onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart-outline" size={25} color={YELLOW} />
            <Text
              style={{
                backgroundColor: YELLOW,
                color: BLACK,
                position: 'absolute',
                right: -5,
                top: -8,
                borderRadius: 50,
                paddingHorizontal: 6,
              }}>
              {totalItems}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="menu-outline"
              size={25}
              color={BLACK}
              onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={menus}
        renderItem={renderAllMenus}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={<View style={{marginBottom: 20}}></View>}
        ListFooterComponent={
          <View style={{paddingHorizontal: 15, paddingBottom: 30}}>
            <TouchableOpacity
              style={{
                backgroundColor: YELLOW,
                paddingVertical: 12,
                borderRadius: 80,
                marginTop: 20,
                paddingHorizontal: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={addItemToCart}>
              <Ionicons
                name="cart-outline"
                size={20}
                color={WHITE}
                style={{top: -2}}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  color: WHITE,
                  marginLeft: 10,
                }}>
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menusScreen: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default TodaysMenu;
