import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
import { isAndroid } from '../../helpers/Utils';
const CustomHeaderButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={props.iconSize || 24}
    color={props.color || 'black'}
  />
);
export default CustomHeaderButton;
