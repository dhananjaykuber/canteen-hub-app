import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {YELLOW, BLACK, WHITE} from '../constants/color';

import {useDispatch} from 'react-redux';
import {setUser} from '../redux/user/userSlice';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '203859185812-0bjdi66csqjab3bsjj9p8t45gq31q4eo.apps.googleusercontent.com',
});

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            picture: user.photoURL,
          }),
        );
      }
    });
  }, []);

  // google auth
  const googleAuth = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const signInWithGoogle = async () => {
    const data = await googleAuth();

    firestore()
      .collection('users')
      .doc(data.additionalUserInfo.profile.email)
      .set({
        name: data.additionalUserInfo.profile.name,
        email: data.additionalUserInfo.profile.email,
        picture: data.additionalUserInfo.profile.picture,
      })
      .then(() =>
        dispatch(
          setUser({
            name: data.additionalUserInfo.profile.name,
            email: data.additionalUserInfo.profile.email,
            picture: data.additionalUserInfo.profile.picture,
          }),
        ),
      );
  };

  return (
    <SafeAreaView style={styles.loginScreen}>
      <View style={styles.form}>
        <Ionicons
          name="fast-food-outline"
          size={60}
          color={YELLOW}
          style={{
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'AutourOne',
            color: BLACK,
            fontSize: 20,
            marginTop: 10,
            textTransform: 'uppercase',
          }}>
          Canteen Hub
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: YELLOW,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={signInWithGoogle}>
          <Ionicons
            name="logo-google"
            size={18}
            color={WHITE}
            style={{
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
              marginLeft: 10,
              marginTop: 4,
              color: WHITE,
              letterSpacing: 0.2,
            }}>
            Sign In With Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  form: {
    marginHorizontal: 20,
  },
});

export default Login;
