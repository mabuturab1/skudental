import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RecordDetailItem } from '../../components';
const PickupListScreen = (props) => {
  const data = [
    { key: 'content1', content: 'content' },
    { key: 'content2', content: 'content' },
    { key: 'content3', content: 'content' },
    { key: 'content4', content: 'content' },
  ];
  const onClickItem = (item) => {};
  const renderSingleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onClickItem(item.key)}
    >
      <RecordDetailItem item={item} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <FlatList data={data} renderItem={renderSingleItem} />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    width: '100%',
    padding: 10,
  },
});
export default PickupListScreen;
