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
import PopularMenu from '../components/menu/PopularMenu';
import SingleMenu from '../components/menu/SingleMenu';
import {BLACK, GREY, WHITE, YELLOW} from '../constants/color';

import {useSelector} from 'react-redux';

import firestore from '@react-native-firebase/firestore';

const Menus = ({navigation}) => {
  const {totalItems} = useSelector(state => state.cart);

  const [menus, setMenus] = useState();

  const [menuName, setMenuName] = useState('');

  useEffect(() => {
    const getMenus = async () => {
      firestore()
        .collection('menus')
        .onSnapshot(snapshot => {
          let menus = [];
          snapshot.forEach(doc => {
            menus.push({id: doc.id, ...doc.data()});
          });
          setMenus(menus);
        });
    };

    getMenus();
  }, []);

  const popularMenu = ({item}) => {
    return <>{item.popular === true && <PopularMenu item={item} />}</>;
  };

  const renderPopularMenus = () => {
    return (
      <View>
        <Text
          style={{
            color: BLACK,
            fontFamily: 'Poppins-SemiBold',
            paddingHorizontal: 10,
            fontSize: 15,
            marginVertical: 10,
          }}>
          Popular Menus
        </Text>
        <FlatList
          data={menus}
          renderItem={popularMenu}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />

        <Text
          style={{
            color: BLACK,
            fontFamily: 'Poppins-SemiBold',
            paddingHorizontal: 10,
            fontSize: 15,
            marginVertical: 10,
          }}>
          All Menus
        </Text>

        <View
          style={{
            position: 'relative',
            marginHorizontal: 10,
            borderColor: '#D3D3D3',
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 7,
            marginBottom: 10,
          }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={GREY}
            style={{color: GREY, fontFamily: 'Poppins-Regular'}}
            value={menuName}
            onChangeText={text => setMenuName(text)}
          />
          <TouchableOpacity style={{position: 'absolute', right: 10, top: 12}}>
            <Ionicons name="search-outline" size={20} color={GREY} />
          </TouchableOpacity>
        </View>
      </View>
    );
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
        ListHeaderComponent={<View>{renderPopularMenus()}</View>}
        ListFooterComponent={<View style={{marginBottom: 20}}></View>}
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

export default Menus;
