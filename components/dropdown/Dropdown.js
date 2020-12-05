import { Provider, TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import DropDown from 'react-native-paper-dropdown';

const Dropdown = ({ data, value, onChange }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState();

  const genderList = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Others', value: 'others' },
  ];

  return (
    <Provider>
      <SafeAreaView style={styles.containerStyle}>
        <DropDown
          label={'Gender'}
          mode={'outlined'}
          value={value}
          setValue={onChange}
          list={data}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          inputProps={{
            right: <TextInput.Icon name={'menu-down'} />,
          }}
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
});

export default Dropdown;
