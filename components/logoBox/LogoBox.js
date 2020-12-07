import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
const LogoBox = (props) => {
  return (
    <View style={styles.logoBoxWrapper}>
      <Image style={styles.logo} source={require('../../assets/sklogo.png')} />
      {/* <View style={styles.logoBoxText}>
        <Image source={require('../../assets/logoText.png')} />
      </View> */}
    </View>
  );
};
export default LogoBox;
const styles = StyleSheet.create({
  logoBoxWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoBoxText: {
    marginVertical: 30,
  },
  logo: {
    width:100,
    height:100,
    resizeMode:'contain'
  },
});
