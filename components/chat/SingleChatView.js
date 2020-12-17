import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ThemeColors } from '../../constants/Colors';
const SingleChatView = ({ style, item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item._id)}>
    <View style={{ ...styles.chatViewWrapper, ...style }}>
      <Text style={styles.title}>{item.title || 'Title'}</Text>
      <Text style={styles.subtitle}>{item.subtitle || 'Subtitle'}</Text>
      <Text style={styles.createdAt}>{item.createdAt || 'Created At'}</Text>
    </View>
  </TouchableOpacity>
);

export default SingleChatView;
const styles = StyleSheet.create({
  chatViewWrapper: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  subtitle: {
    fontSize: 17,
    color: 'black',
  },
  createdAt: {
    fontSize: 14,
    color: ThemeColors.lightBlack,
  },
});
