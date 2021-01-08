import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import RoundedButton from '../button/RoundedButton';
import { v4 as uuidv4 } from 'uuid';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { isAndroid } from '../../helpers/Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
const AudioRecorder = ({
  audioName,
  onRecordingComplete = () => {},
  onRecordingStart = () => {},
  onlyIcon = false,
}) => {
  const [recording, setRecording] = useState();

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync(getAudioModeConfigs(true));

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      onRecordingStart(true);
      setRecording(recording);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  const getAudioModeConfigs = (allowsRecordingIOS) => ({
    allowsRecordingIOS,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  });

  useEffect(() => {
    return () => {
      //   if (recording) recording.stopAndUnloadAsync();
    };
  }, [recording]);
  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(getAudioModeConfigs(false));
      const uri = recording.getURI();
      const status = await recording.getStatusAsync();
      const audioItem = {
        id: uuidv4(),
        recordDate: moment().format(),
        name: uri?.split('/')?.pop()
          ? Date.now().toString() + uri?.split('/').pop()
          : Date.now().toString() + isAndroid()
          ? '.m4a'
          : '.caf',
        uri,
        durationMillis: status.durationMillis,
        type: 'audio/mp4',
      };
      onRecordingComplete(audioItem);
      setRecording(undefined);
    } catch (error) {
      console.log('error in recording', error);
      setRecording(null);
    }
  }

  return (
    <View style={styles.container}>
      {onlyIcon ? (
        <TouchableOpacity
          onPress={(event) =>
            recording ? stopRecording(event) : startRecording(event)
          }
        >
          <View style={styles.iconWrapper}>
            <FontAwesome
              name={recording ? 'microphone-slash' : 'microphone'}
              size={24}
              color='white'
            />
          </View>
        </TouchableOpacity>
      ) : (
        <RoundedButton
          style={styles.microphoneButton}
          icon={
            <FontAwesome
              name={recording ? 'microphone-slash' : 'microphone'}
              size={24}
              color='white'
            />
          }
          onPress={(event) =>
            recording ? stopRecording(event) : startRecording(event)
          }
        />
      )}
    </View>
  );
};
export default AudioRecorder;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  durationMillisText: {
    color: 'black',
    fontSize: 12,
  },
  microphoneButton: {
    backgroundColor: '#f1453d',
    borderColor: '#f1453d',
  },
  iconWrapper: { padding: 15, justifyContent: 'center', alignItems: 'center' },
});
