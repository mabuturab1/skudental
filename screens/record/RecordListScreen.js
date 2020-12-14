import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RecordDetailItem } from '../../components';
import { clearUploadedRecord, getAllRecords } from '../../store/record/actions';
const RecordListScreen = (props) => {
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
  console.log('server records are', serverRecordsArr)
  useEffect(() => {
    dispatch(clearUploadedRecord());
    console.log('dispatching get all records');
    dispatch(getAllRecords());
  }, [dispatch]);
  const renderItem = ({ item, index }) => {
    return (
      <RecordDetailItem
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
        <View style={styles.noDataWrapper}>
          <Text style={styles.noDataText}>
            No Record found. Kindly pull down  to refresh data
          </Text>
        </View>
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
