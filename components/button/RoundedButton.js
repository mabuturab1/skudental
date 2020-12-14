import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemeColors } from '../../constants/Colors';
const CustomRoundedButton = ({ style, onPress, title, icon, other }) => (
  <Button
    {...other}
    mode='contained'
    style={{ ...styles.customButton, ...style }}
    onPress={onPress}
  >
    {title || icon}
  </Button>
);

export default CustomRoundedButton;
const styles = StyleSheet.create({
  customButton: {
    borderRadius: 10000,
    borderWidth: 1,
    borderColor: ThemeColors.primary,
    backgroundColor: ThemeColors.primary,
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    width: 60,
    height: 60,
    justifyContent:'center',
    alignItems:'center'
  },
});
