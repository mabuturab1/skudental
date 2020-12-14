import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import RoundedButton from '../button/RoundedButton';
import { v4 as uuidv4 } from 'uuid';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
const AudioRecorder = ({
  audioName,
  onRecordingComplete = () => {},
  onRecordingStart = () => {},
}) => {
  const [recording, setRecording] = useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync(getAudioModeConfigs(true));
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      onRecordingStart(true);
      setRecording(recording);
      console.log('Recording started');
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
    console.log('Stopping recording..');
    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync(getAudioModeConfigs(false));
      const uri = recording.getURI();
      const status = await recording.getStatusAsync();
      const audioItem = {
        id: uuidv4(),
        recordDate: moment().format(),
        title: audioName || 'Recorded audio',
        uri,
        durationMillis: status.durationMillis,
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
      <RoundedButton
        style={styles.microphoneButton}
        icon={
          <FontAwesome
            name={recording ? 'microphone-slash' : 'microphone'}
            size={24}
            color='white'
          />
        }
        onPress={() => (recording ? stopRecording() : startRecording())}
      />
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
});
