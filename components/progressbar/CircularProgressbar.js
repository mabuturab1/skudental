import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const CircularProgressbar = ({ progress = 0 }) => {
  return (
    <AnimatedCircularProgress
      size={17}
      width={3}
      fill={progress}
      tintColor='#3d5875'
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor='#ffffff'
    />
  );
};
export default CircularProgressbar;
