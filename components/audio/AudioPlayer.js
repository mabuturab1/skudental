import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from '../button/RoundedButton';
import { v4 as uuidv4 } from 'uuid';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { useCallback } from 'react';
const AudioPlayer = ({
  audioItem,
  onPlaybackStatusUpdate = () => {},
}) => {
  const [playingSound, setPlayingSound] = useState();
  const [soundPlayStatus, setSoundPlayStatus] = useState(false);
  const [durationMillis, setDurationMillis] = useState(0);

  const onPlaybackStatus = (playbackStatus) => {
    if (playbackStatus.isLoaded) {
      if (playbackStatus.isPlaying) {
        setDurationMillis(playbackStatus.positionMillis);
        onPlaybackStatusUpdate(playbackStatus.positionMillis);
      }

      if (playbackStatus.isBuffering) {
        setDurationMillis(0);
        onPlaybackStatusUpdate(0);
      }
      if (playbackStatus.didJustFinish) {
        setSoundPlayStatus(false);
        setDurationMillis(audioItem.durationMillis);
      }
    }
  };
  useEffect(() => {
    console.log('calling use effect sound play status');
    if (!audioItem && soundPlayStatus) {
      stopSound();
    }
  }, [audioItem, stopSound, soundPlayStatus]);
  const getFormattedTime = (duration) => {
   
    return moment(duration).format('mm:ss');
  };

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioItem.uri },
      {},
      onPlaybackStatus,
      true
    );
    setPlayingSound(sound);
    setSoundPlayStatus(true);

    console.log('Playing Sound');
    await sound.setProgressUpdateIntervalAsync(50);
    await sound.playAsync();
  };
  const stopSound = useCallback(async () => {
    console.log('Loading Sound');
    try {
      await playingSound.stopAsync();
      setSoundPlayStatus(false);
    } catch (error) {
      console.log('error while playing sound', error);
    }
  }, [playingSound]);

  useEffect(() => {
    return playingSound
      ? () => {
          console.log('Unloading Sound');
          playingSound.unloadAsync();
        }
      : undefined;
  }, [playingSound]);

  return (
    <View style={styles.container}>
      <RoundedButton
        icon={
          <FontAwesome
            name={soundPlayStatus ? 'stop' : 'play'}
            size={24}
            color='white'
          />
        }
        onPress={() => (soundPlayStatus ? stopSound() : playSound())}
      />
      {durationMillis && audioItem.durationMillis ? (
        <Text style={styles.durationMillisText}>{`${getFormattedTime(
          durationMillis
        )} / ${getFormattedTime(audioItem.durationMillis)}`}</Text>
      ) : null}
    </View>
  );
};
export default AudioPlayer;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  durationMillisText: {
    color: 'black',
    fontSize: 12,
  },
});
