import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ViewMoreTextContent = ({
  children,
  numberOfLines = 3,
  renderViewMore: ViewMore,
  renderViewLess: ViewLess,
}) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= numberOfLines); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
    console.log('number of lines', numberOfLines)
    console.log('text num lines is', e.nativeEvent.lines.length >= numberOfLines);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : numberOfLines}
        style={{ lineHeight: 21 }}
      >
        {children}
      </Text>
      <TouchableOpacity onPress={toggleNumberOfLines}>
        {lengthMore ? textShown ? <ViewLess /> : <ViewMore /> : null}
      </TouchableOpacity>
    </View>
  );
};
export default ViewMoreTextContent;
const styles = StyleSheet.create({
  mainContainer: {},
});
