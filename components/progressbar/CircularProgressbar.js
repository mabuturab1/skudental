import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const CircularProgressbar =({progress=0})=>{
    return (<AnimatedCircularProgress
        size={17}
        width={3}
        fill={progress}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875" />)
}
export default CircularProgressbar;