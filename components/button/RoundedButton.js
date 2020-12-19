import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors } from '../../constants/Colors';
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
