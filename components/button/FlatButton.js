import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemeColors } from '../../constants/Colors';
const CustomButton = ({ style, onPress, title, icon }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={{ ...styles.customButton, ...style }}
    onPress={onPress}
  >
    {title != null ? <Text style={styles.titleStyle}>{title}</Text> : icon}
  </TouchableOpacity>
);

export default CustomButton;
const styles = StyleSheet.create({
  customButton: {
    padding: 11,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: ThemeColors.primary,
    backgroundColor: ThemeColors.primary,
    textTransform: 'capitalize',
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'RobotoRegular',
  },
  titleStyle: {
    color: 'white',
    fontFamily: 'RobotoBold',
    fontSize: 16,
    
  },
});
