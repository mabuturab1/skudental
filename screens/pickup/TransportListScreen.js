import { Ionicons } from '@expo/vector-icons';
import React, { Fragment, useEffect, useRef } from 'react';
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
  LoadingIndicator,
  RoundedButton,
  TransportDetailItem,
  UserVerification,
} from '../../components';
import { ThemeColors } from '../../constants/Colors';
import { routes } from '../../constants/routes';
import { isAndroid } from '../../helpers/Utils';
import {
  getAllTransportRequests,
  updateTransportRequest,
} from '../../store/actions';
const TransportListScreen = ({ navigation }) => {
  const currentTransportId = useRef(null);
  const dispatch = useDispatch();
  const {
    allTransportRequests = [],
    getAllTransportRequestsLoading,
    updateTransportRequestLoading,
  } = useSelector(({ transport }) => ({
    allTransportRequests: transport.allTransportRequests,
    getAllTransportRequestsLoading: transport.loading.getAllTransportRequests,
    updateTransportRequestLoading: transport.loading.updateTransportRequest,
  }));
  useEffect(() => {
    dispatch(getAllTransportRequests());
  }, [dispatch]);
  const updateTransportStatus = (transportRequest, status) => {
    currentTransportId.current = transportRequest._id;
    dispatch(updateTransportRequest(transportRequest._id, { status }));
  };

  const renderItem = ({ item, index }) => {
    return (
      <TransportDetailItem
        transportRequest={item}
        onUpdateStatus={updateTransportStatus}
        updateTransportRequestLoading={
          updateTransportRequestLoading &&
          currentTransportId.current === item._id
        }
        disableButtons={updateTransportRequestLoading}
      />
    );
  };
  const refreshData = () => {
    dispatch(getAllTransportRequests());
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      {allTransportRequests.length > 0 ? (
        <FlatList
          data={allTransportRequests}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={getAllTransportRequestsLoading}
              onRefresh={refreshData}
            />
          }
        />
      ) : (
        <View style={styles.noDataWrapper}>
          {getAllTransportRequestsLoading ? (
            <LoadingIndicator />
          ) : (
            <Fragment>
              <Text style={styles.noDataText}>
                No Record found. Kindly pull down to refresh data
              </Text>
              <TouchableOpacity onPress={refreshData}>
                <Ionicons
                  name={
                    isAndroid() ? 'md-refresh-circle' : 'ios-refresh-circle'
                  }
                  color={ThemeColors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
      )}
      <View style={styles.addButtonWrapper}>
        <RoundedButton
          icon={
            <Ionicons
              name={isAndroid() ? 'md-add' : 'ios-add'}
              size={40}
              color='white'
            />
          }
          onPress={() => navigation.navigate(routes.CreateTransportRequest)}
        />
      </View>
    </SafeAreaView>
  );
};
export default TransportListScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#e5e5ea',
    position: 'relative',
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
  addButtonWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
});
