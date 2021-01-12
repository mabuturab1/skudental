import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
const SingleChatView = ({ style, item, onPress }) => {
  const getOtherMember = () => {
    const userId = useSelector(({ auth }) => auth?.user?._id);
    if (!item?.members?.length) return {};
    if (item?.members?.length === 1) return item.members[0];
    return item.members.find((el) => el?._id !== userId) || {};
  };
  const getImageUrl = () => {
    const member=getOtherMember();
    return member?.profileImageUrl;
  };
  const getName = () => {
    const member=getOtherMember();
    return member?.name;
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item._id)}>
      <View style={{ ...styles.chatViewWrapper, ...style }}>
        <View style={styles.infoContainer}>
          <Image
            source={
              getImageUrl()
                ? { uri: getImageUrl() }
                : require('../../assets/defaultImage.png')
            }
            style={styles.avatarImage}
          />
          <View style={styles.usernameContainer}>
            <Text> {getName()} </Text>
            {item?.createdAt ? (
              <Text style={styles.createdAt}> {item?.createdAt} </Text>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleChatView;
const styles = StyleSheet.create({
  chatViewWrapper: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  infoContainer: { flexDirection: 'row', height: 50, alignSelf: 'stretch' },
  avatarImage: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  usernameContainer: { justifyContent: 'center', flexDirection: 'column' },
  createdAt: { fontSize: 10 },
});
