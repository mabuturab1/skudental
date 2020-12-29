import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import BottomModalSheet from 'react-native-raw-bottom-sheet';

export const BottomModal = ({ refBottomModalSheet, children, height }) => {
  return (
    <BottomModalSheet
      ref={refBottomModalSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height || 300}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}
    >
      {children}
    </BottomModalSheet>
  );
};
export default BottomModal;
