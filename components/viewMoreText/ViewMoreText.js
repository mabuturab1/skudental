import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ViewMoreText from './ViewMoreTextComponent';
const ViewMoreWrapper = ({ children, numberOfLines = 3, containerStyles }) => {
  const renderViewMore = () => {
    return <Text style={styles.viewMoreLess}>View More</Text>;
  };
  const renderViewLess = () => {
    return <Text style={styles.viewMoreLess}> View Less</Text>;
  };
  return (
    <View style={{ ...styles.containerWrapper, ...containerStyles }}>
      <ViewMoreText
        numberOfLines={numberOfLines}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
      >
        {children}
      </ViewMoreText>
    </View>
  );
};
export default ViewMoreWrapper;
const styles = StyleSheet.create({
  viewMoreLess: {
    fontSize: 13,
    fontFamily: 'RalewaySemiBold',
    marginVertical: 10,
  },
  containerWrapper: {
    paddingHorizontal: 15,
  },
});
