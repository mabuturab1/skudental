import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
const LogoBox = (props) => {
  return (
    <View style={styles.logoBoxWrapper}>
      <Image source={require('../../assets/logo.png')} />
      <View style={styles.logoBoxText}>
        <Image source={require('../../assets/logoText.png')} />
      </View>
    </View>
  );
};
export default LogoBox;
const styles = StyleSheet.create({
  logoBoxWrapper: {
    alignItems: 'center',
  },
  logoBoxText: {
    marginVertical: 30,
  },
});
