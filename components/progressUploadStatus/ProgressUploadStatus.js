import React, { Fragment } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { isAndroid, isValidValue } from '../../helpers/Utils';
import CircularProgressbar from '../progressbar/CircularProgressbar';
import { ThemeColors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
const ProgressUploadStatus = ({
  isFailed,
  isComplete,
  progress,
  onReUpload,
  returnEmpty = false,
}) => {
  if (returnEmpty) return <Fragment></Fragment>;
  if (isFailed)
    return (
      <TouchableOpacity onPress={onReUpload}>
        <Ionicons
          name={isAndroid() ? 'md-refresh-circle' : 'ios-refresh-circle'}
          color={ThemeColors.primary}
          size={24}
        />
      </TouchableOpacity>
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
