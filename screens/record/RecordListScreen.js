import { Ionicons } from '@expo/vector-icons';
import React, { Fragment, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  EmptyList,
  LoadingIndicator,
  RecordDetailItem,
} from '../../components';
import { ThemeColors } from '../../constants/Colors';
import { isAndroid } from '../../helpers/Utils';
import { clearUploadedRecord, getAllRecords } from '../../store/record/actions';
const RecordListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    uploadingDataArr = [],
    serverRecordsArr = [],
    dataLoading,
  } = useSelector(({ record }) => ({
    uploadingDataArr: record.uploadingDataArr,
    serverRecordsArr: record.serverRecordsArr,
    dataLoading: record.loading.getAllRecords,
  }));
  useEffect(() => {
    dispatch(clearUploadedRecord());
    dispatch(getAllRecords());
  }, [dispatch]);
  const renderItem = ({ item, index }) => {
    return (
      <RecordDetailItem
        navigation={navigation}
        currentRecordIndex={index}
        record={item}
        isServerRecord={true}
        key={index}
      />
    );
  };
  const refreshData = () => {
    dispatch(getAllRecords());
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      {serverRecordsArr.length > 0 ? (
        <FlatList
          data={serverRecordsArr}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={dataLoading} onRefresh={refreshData} />
          }
        />
      ) : (
        <EmptyList dataLoading={dataLoading} refreshData={refreshData} />
      )}
    </SafeAreaView>
  );
};
export default RecordListScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#e5e5ea',
  },
  noDataWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noDataText: {
    textAlign: 'center',
  },
  carouselWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
