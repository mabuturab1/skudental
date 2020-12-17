import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from '../button/RoundedButton';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { useCallback } from 'react';
const AudioPlayer = ({
  audioItem = {},
  onPlaybackStatusUpdate = () => {},
  isSmallAudioPlayerButton = false,
  durationOnRight = false,
  textColor = 'white',
}) => {
  const [playingSound, setPlayingSound] = useState();
  const [soundPlayStatus, setSoundPlayStatus] = useState(false);
  const [durationMillis, setDurationMillis] = useState(0);
  const [fileDuration, setFileDuration] = useState(0);
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
        setDurationMillis(fileDuration);
      }
    }
  };
  useEffect(() => {
    if (!audioItem && soundPlayStatus) {
      stopSound();
    }
  }, [audioItem, stopSound, soundPlayStatus]);
  const getFormattedTime = (duration) => {
    return moment(duration).format('mm:ss');
  };

  const playSound = async () => {
    if (!audioItem.uri) return;
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioItem.uri },
      {},
      onPlaybackStatus,
      true
    );
    var status = await sound.getStatusAsync();
    setFileDuration(status.durationMillis);
    setPlayingSound(sound);
    setSoundPlayStatus(true);

    await sound.setProgressUpdateIntervalAsync(50);
    await sound.playAsync();
  };
  const stopSound = useCallback(async () => {
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
    <View
      style={{
        ...styles.container,
        flexDirection: durationOnRight ? 'row-reverse' : 'row',
      }}
    >
      {durationMillis && fileDuration ? (
        <Text
          style={{ ...styles.durationMillisText, color: textColor }}
        >{`${getFormattedTime(durationMillis)} / ${getFormattedTime(
          fileDuration
        )}`}</Text>
      ) : null}
      <RoundedButton
        icon={
          <FontAwesome
            name={soundPlayStatus ? 'stop' : 'play'}
            size={isSmallAudioPlayerButton ? 12 : 24}
            color='white'
          />
        }
        style={isSmallAudioPlayerButton ? { width: 30, height: 30 } : {}}
        onPress={(event) =>
          soundPlayStatus ? stopSound(event) : playSound(event)
        }
      />
    </View>
  );
};
export default AudioPlayer;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationMillisText: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 10,
  },
});
