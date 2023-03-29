import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BLACK, GREY, WHITE, YELLOW} from '../constants/color';

import {useSelector} from 'react-redux';

const Profile = ({navigation}) => {
  const {user} = useSelector(state => state.user);

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

      <ScrollView
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
          Canteen Hub Profile
        </Text>

        <Text
          style={{
            color: BLACK,
            fontFamily: 'Poppins-SemiBold',
            paddingHorizontal: 10,
            fontSize: 15,
            marginVertical: 10,
          }}>
          Hello {user.name}
        </Text>

        <Image
          source={{
            uri: user.picture,
          }}
          style={styles.profilePicture}
        />

        <View style={styles.form}>
          <View style={styles.inputField}>
            <Ionicons
              name="person-circle-outline"
              size={20}
              color={GREY}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Name"
              style={styles.input}
              placeholderTextColor={GREY}
            />
          </View>
          <View style={styles.inputField}>
            <Ionicons
              name="call-outline"
              size={20}
              color={GREY}
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Phone"
              style={styles.input}
              placeholderTextColor={GREY}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: YELLOW,
              paddingVertical: 12,
              borderRadius: 7,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
              Save Details
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartScreen: {
    flex: 1,
    backgroundColor: YELLOW,
  },
  form: {
    marginHorizontal: 10,
  },
  inputField: {
    display: 'flex',
    position: 'relative',
    borderBottomColor: GREY,
    borderBottomWidth: 1,
    marginTop: 20,
  },
  input: {
    color: GREY,
    fontFamily: 'Poppins-Medium',
    marginLeft: 30,
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Profile;
