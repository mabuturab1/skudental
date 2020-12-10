import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
export const FormWrapper = ({ children, style }) => (
  <View style={{ ...styles.wrapper, ...style }}>{children}</View>
);
export const FormInputWrapper = ({ children, style }) => (
  <View style={{ ...styles.singleFormFieldWrapper, ...style }}>{children}</View>
);

export const FormTextInput = (props) => (
  <TextInput {...props}  style={{ ...styles.textInput, ...props.style }} />
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
  singleFormFieldWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },

  textInput: {
    width: '100%',
    marginBottom: 10,
    borderBottomColor: ThemeColors.listItemBorder,
    borderBottomWidth: 1,
  },
});
