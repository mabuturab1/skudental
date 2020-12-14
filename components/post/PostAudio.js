import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RoundedButton from '../button/RoundedButton';
import AudioPlayer from '../audio/AudioPlayer';
import AudioRecorder from '../audio/AudioRecorder';
import { MaterialIcons } from '@expo/vector-icons';

const Audio = ({ itemIndex, onAudioUpdate = () => {} }) => {
  const [audioItem, setAudioItem] = useState(null);
  const deleteAudioItem = () => {
    setAudioItem(null);
  };
  const updateAudioItem = (audio) => {
    setAudioItem(audio);
    onAudioUpdate(audio);
  };
  return (
    <View style={styles.wrapper}>
      {audioItem && (
        <View style={styles.audioPlayer}>
          <AudioPlayer audioItem={audioItem} />
        </View>
      )}
      <View style={styles.audioRecorder}>
        <AudioRecorder
          onRecordingStart={() => updateAudioItem(null)}
          audioName={`Record ${itemIndex}`}
          onRecordingComplete={(item) => updateAudioItem(item)}
        />
      </View>
      {audioItem && (
        <View style={styles.audioRecorder}>
          <RoundedButton
            icon={<MaterialIcons name={'delete'} size={24} color='white' />}
            onPress={() => deleteAudioItem()}
          />
        </View>
      )}
    </View>
  );
};
export default Audio;
const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
  },
  audioPlayer: { marginHorizontal: 5 },
  audioRecorder: { marginHorizontal: 5 },
});
