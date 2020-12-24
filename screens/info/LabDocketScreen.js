import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeColors } from '../../constants/Colors';
import { routes } from '../../constants/routes';
const LabDocketScreen = ({ navigation }) => {
  const data = [
    {
      key: 'Prosthetics Docket ',
      link:
        'https://cbc22721-3273-4333-be80-8bc5edc84b2b.filesusr.com/ugd/5d8588_94ff5fb368ee4c03aad6f6f8abb26cf2.pdf',
    },
    {
      key: 'Crown&Bridge Docket',
      link:
        'https://cbc22721-3273-4333-be80-8bc5edc84b2b.filesusr.com/ugd/5d8588_0c123d27109a4b808db1a6477e46666f.pdf',
    },
  ];
  const onClickItem = (link) => {
    navigation.navigate(routes.WebviewLink, { link });
  };
  const renderSingleListItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onClickItem(item.link)}
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
