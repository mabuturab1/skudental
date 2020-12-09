import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { ThemeColors } from '../../constants/Colors';

const Dropdown = ({ data, value, onChange, placeholder, enabled=true }) => {
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Picker
        placeholder={placeholder}
        style={styles.dropdownStyle}
        selectedValue={value}
        mode={'dropdown'}
        enabled={enabled}
        onValueChange={(value) => {
          console.log(value);
          onChange(value);
        }}
        itemStyle={styles.dropdownItemStyle}
      >
        {data?.map((el, index) => (
          <Picker.Item key={index} label={el.label} value={el.value} />
        ))}
      </Picker>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.listItemBorder,
  },

  dropdownStyle: {
    backgroundColor: '#fafafa',
    flex:1,
  },
  dropdownItemStyle: {
    borderWidth: 1,
    flex:1,
    borderColor: ThemeColors.listItemBorder,
  },
});

export default Dropdown;
