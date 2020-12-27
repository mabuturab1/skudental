import React from 'react';
import { HelperText } from 'react-native-paper';
const ErrorText = ({ errors, touched, name }) => {
  return (
    <HelperText
      type='error'
      style={{ fontFamily: 'RalewayRegular' }}
      visible={errors[name] != null && touched[name] === true}
    >
      {errors[name]}
    </HelperText>
  );
};
export default ErrorText;
