import React from 'react';
import { HelperText } from 'react-native-paper';
export default ({ errors, touched, name }) => {
  return (
    <HelperText
      type='error'
      visible={errors[name] != null && touched[name] === true}
    >
      {errors[name]}
    </HelperText>
  );
};
