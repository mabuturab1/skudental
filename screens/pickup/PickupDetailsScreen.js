import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const PickupDetailsScreen = (props) => {
  const data = [{ key: 'content1', content: 'content' }];

  return (
    <View style={styles.wrapper}>
      <RecordDetailItem item={data[0]} />;
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
    padding: 10,
  },
});
export default PickupDetailsScreen;
