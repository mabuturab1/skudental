import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import RoundedButton from '../button/RoundedButton';
import AudioPlayer from '../audio/AudioPlayer';
import AudioRecorder from '../audio/AudioRecorder';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeColors } from '../../constants/Colors';

const PostAudio = ({
  itemIndex,
  onAudioUpdate = () => {},
  initAudioItem = null,
  isEditAllowed = true,
  onlyIcon = true,
  tempId = null,
}) => {
  console.log('init audio item is', initAudioItem);
  const [audioItem, setAudioItem] = useState(initAudioItem);
  const deleteAudioItem = () => {
    setAudioItem(null);
    onAudioUpdate(null);
  };
  useEffect(() => {
    setAudioItem(initAudioItem);
  }, [tempId]);
  const [isRecordingPlaying, setIsRecordingPlaying] = useState(false);
  const updateAudioItem = (audio) => {
    setAudioItem(audio);
    onAudioUpdate(audio);
  };
  return (
    <View style={styles.wrapper}>
      {audioItem && (
        <View style={styles.audioButton}>
          <AudioPlayer
            audioItem={audioItem}
            onlyIcon={onlyIcon}
            updateRecordingPlayStatus={(status) =>
              setIsRecordingPlaying(status)
            }
          />
        </View>
      )}
      {isEditAllowed && (
        <View style={styles.audioButton}>
          <AudioRecorder
            onRecordingStart={() => updateAudioItem(null)}
            audioName={`Record ${itemIndex}`}
            onlyIcon={onlyIcon}
            onRecordingComplete={(item) => updateAudioItem(item)}
          />
        </View>
      )}
      {audioItem && isEditAllowed && !isRecordingPlaying && (
        <View style={styles.audioButton}>
          {onlyIcon ? (
            <TouchableOpacity onPress={() => deleteAudioItem()}>
              <View style={styles.iconWrapper}>
                <MaterialIcons name={'delete'} size={24} color='white' />
              </View>
            </TouchableOpacity>
          ) : (
            <RoundedButton
              icon={<MaterialIcons name={'delete'} size={24} color='white' />}
              onPress={() => deleteAudioItem()}
            />
          )}
        </View>
      )}
    </View>
  );
};
export default PostAudio;
const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  audioButton: { marginHorizontal: 0 },
  iconWrapper: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
