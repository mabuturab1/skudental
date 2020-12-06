import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemeColors } from '../../constants/Colors';
const CustomButton = ({ style, onPress, title }) => (
  <Button
    mode='contained'
    style={{ ...styles.customButton, ...style }}
    onPress={onPress}
  >
    {title}
  </Button>
);

export default CustomButton;
const styles = StyleSheet.create({
  customButton: {
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ThemeColors.primary,
    backgroundColor: ThemeColors.primary,
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
});