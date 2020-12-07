import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors } from '../../constants/Colors';
const LabDocketScreen = (props) => {
  const data = [
    { key: 'Prosthetics Docket ', link: '#' },
    { key: 'Crown&Bridge Docket', link: '#' },
  ];
  const onClickItem = (key) => {};
  const renderSingleListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onClickItem(item.key)}
    >
      <Text style={styles.listItemText} key={item.key}>
        {item.key}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.wrapper}>
      <FlatList data={data} renderItem={renderSingleListItem} />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  listItem: {
    width: '100%',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: ThemeColors.listItemBorder,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
export default LabDocketScreen;
