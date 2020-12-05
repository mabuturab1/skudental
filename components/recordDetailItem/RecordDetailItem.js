import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
const RecordDetailItem = () => {
  return (
    <Card style={styles.cardWrapper}>
      <Card.Content>
        <Paragraph>Card Content</Paragraph>
      </Card.Content>
    </Card>
  );
};
const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
  },
});
export default RecordDetailItem;
