import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors } from '../../constants/Colors';
import LoadingIndicator from '../loader/LoadingIndicator';
const CustomRoundedButton = ({ style, onPress, title, icon, other, loading=false }) => (
 
   <TouchableOpacity
   activeOpacity={0.7}
   style={{ ...styles.customButton, ...style }}
   onPress={onPress}
 >
   {loading ? (
     <LoadingIndicator alignCenter={false} color={'white'} />
   ) : title != null ? (
     <Text style={styles.titleStyle}>{title}</Text>
   ) : (
     icon
   )}
 </TouchableOpacity>
);

export default CustomRoundedButton;
const styles = StyleSheet.create({
  customButton: {
    borderRadius: 10000,
    borderWidth: 1,
    borderColor: ThemeColors.black,
    backgroundColor: ThemeColors.black,
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
