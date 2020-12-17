import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { isAndroid, isValidValue } from '../../helpers/Utils';
import CircularProgressbar from '../progressbar/CircularProgressbar';
import { ThemeColors } from '../../constants/Colors';
const ProgressUploadStatus = ({ isFailed, isComplete, progress }) => {
  if (isFailed)
    return (
      <Ionicons
        name={isAndroid() ? 'md-refresh-circle' : 'ios-refresh-circle'}
        color={ThemeColors.primary}
        size={24}
      />
    );
  if (isValidValue(progress) && !isComplete)
    return <CircularProgressbar progress={progress} />;

  return (
    <Ionicons
      name={isAndroid() ? 'md-checkmark-done' : 'ios-checkmark-done'}
      color={ThemeColors.primary}
      size={24}
    />
  );
};
export default ProgressUploadStatus;
