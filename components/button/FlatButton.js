import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { ThemeColors } from '../../constants/Colors';
import LoadingIndicator from '../loader/LoadingIndicator';
const CustomButton = ({ style, onPress, title, icon, loading, textStyle={} }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={{ ...styles.customButton, ...style }}
    onPress={onPress}
  >
    {loading ? (
      <LoadingIndicator alignCenter={false} color={'white'} />
    ) : title != null ? (
      <Text style={{...styles.titleStyle, ...textStyle}}>{title}</Text>
    ) : (
      icon
    )}
  </TouchableOpacity>
);

export default CustomButton;
const styles = StyleSheet.create({
  customButton: {
    height: 42,
    paddingHorizontal:10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ThemeColors.primary,
    backgroundColor: ThemeColors.primary,
    textTransform: 'capitalize',
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'RalewayRegular',
  },
  titleStyle: {
    color: 'white',
    fontFamily: 'RalewayBold',
    fontSize: 16,
  },
});
