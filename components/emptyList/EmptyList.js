import { Ionicons } from '@expo/vector-icons';
import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import LoadingIndicator from '../loader/LoadingIndicator';
import { ThemeColors } from '../../constants/Colors';
import { isAndroid } from '../../helpers/Utils';
const EmptyList = ({ dataLoading, refreshData }) => {
  return (
    <View style={styles.noDataWrapper}>
      {dataLoading ? (
        <LoadingIndicator color={'black'} />
      ) : (
        <Fragment>
          <Text style={styles.noDataText}>
            No Records found. Try again
          </Text>
          <TouchableOpacity onPress={refreshData}>
            <Ionicons
              name={isAndroid() ? 'md-refresh-circle' : 'ios-refresh-circle'}
              color={ThemeColors.black}
              size={30}
            />
          </TouchableOpacity>
        </Fragment>
      )}
    </View>
  );
};
export default EmptyList;
const styles = StyleSheet.create({
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
