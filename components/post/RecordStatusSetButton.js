import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../loader/LoadingIndicator';
import { ThemeColors } from '../../constants/Colors';
import { updateRecord } from '../../store/actions';
import BottomModalSheet from '../bottomModal/BottomModal';
const PostStatusSet = ({ record }) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ record }) => record.loading.updateRecord);
  const refBottomModalSheet = useRef();
  const isPublic = record?.access?.isPublic;
  const publicStatusSet = () => {
    if (loading) return;
    dispatch(
      updateRecord(
        record._id,
        { access: { isPublic: !isPublic } },
        (isSuccess) => {
          if (isSuccess) {
            refBottomModalSheet.current.close();
          }
        }
      )
    );
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={(event) => refBottomModalSheet.current.open()}>
        <View style={{ ...styles.iconWrapper }}>
          <Feather
            name={'send'}
            size={24}
            color={ThemeColors.socialFeedIconColor}
          />
        </View>
      </TouchableOpacity>
      <BottomModalSheet refBottomModalSheet={refBottomModalSheet} height={100}>
        <TouchableOpacity activeOpacity={0.8} onPress={publicStatusSet}>
          <View style={styles.publicStatusWrapper}>
            <View style={{ ...styles.iconWrapper }}>
              <MaterialIcons
                name={isPublic ? 'public-off' : 'public'}
                size={24}
                color={'black'}
              />
            </View>
            {!loading ? (
              <Text style={styles.publicStatus}>
                {isPublic
                  ? `Hide your record from public`
                  : 'Share your record with public'}
              </Text>
            ) : (
              <View style={styles.loader}>
                <LoadingIndicator
                  alignCenter={false}
                  color={ThemeColors.mediumBlack}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </BottomModalSheet>
    </View>
  );
};
export default PostStatusSet;
const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 15 },
  iconWrapper: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publicStatus: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'RalewayLight',
    color: 'black',
  },
  publicStatusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  loader: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
});
