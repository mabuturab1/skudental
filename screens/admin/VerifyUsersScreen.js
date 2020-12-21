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
import { LoadingIndicator, UserVerification } from '../../components';
import { ThemeColors } from '../../constants/Colors';
import { isAndroid } from '../../helpers/Utils';
import { getAllUsers, verifyUser } from '../../store/actions';
const VerifyUserScreen = ({ navigation }) => {
  const currentUserId = useRef(null);
  const dispatch = useDispatch();
  const { allUsers = [], dataLoading, verifyUserLoading } = useSelector(
    ({ admin }) => ({
      allUsers: admin.allUsers,
      dataLoading: admin.loading.getAllUsers,
      verifyUserLoading: admin.loading.verifyUser,
    })
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const verifyUserRole = (user, status) => {
    currentUserId.current = user._id;
    dispatch(verifyUser(user._id, { status }));
  };
  const renderItem = ({ item, index }) => {
    return (
      <UserVerification
        user={item}
        onVerify={verifyUserRole}
        verifyUserLoading={verifyUserLoading && currentUserId.current === item._id}
        disableButtons={verifyUserLoading}
      />
    );
  };
  const refreshData = () => {
    dispatch(getAllUsers());
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      {allUsers.length > 0 ? (
        <FlatList
          data={allUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={dataLoading} onRefresh={refreshData} />
          }
        />
      ) : (
        <View style={styles.noDataWrapper}>
          {dataLoading ? (
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
    </SafeAreaView>
  );
};
export default VerifyUserScreen;
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
