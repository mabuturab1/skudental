import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RoundedButton from '../button/RoundedButton';
import { Audio } from 'expo-av';
import { Feather, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { useCallback } from 'react';
import { ThemeColors } from '../../constants/Colors';
const AudioPlayer = ({
  audioItem = {},
  onPlaybackStatusUpdate = () => {},
  isSmallAudioPlayerButton = false,
  durationOnRight = false,
  textColor = 'white',
  onlyIcon = false,
  color = 'white',
  updateRecordingPlayStatus = () => {},
}) => {
  const [playingSound, setPlayingSound] = useState();
  const [soundPlayStatus, setSoundPlayStatus] = useState(false);
  const [durationMillis, setDurationMillis] = useState(0);
  const [fileDuration, setFileDuration] = useState(0);
  const currentPlayingItem = useRef(audioItem);
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
        setDurationMillis(0);
        updatePlayStatus(false);
      }
    }
  };
  const updatePlayStatus = (status) => {
    setSoundPlayStatus(status);
    updateRecordingPlayStatus(status);
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
    try {
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
      updatePlayStatus(true);

      await sound.setProgressUpdateIntervalAsync(50);
      await sound.playAsync();
      currentPlayingItem.current = audioItem;
    } catch (error) {
      console.log('error while playing audio', error);
    }
  };
  const stopSound = useCallback(async () => {
    try {
      await playingSound.stopAsync();
      updatePlayStatus(false);
    } catch (error) {
      console.log('error while playing sound', error);
    }
  }, [playingSound]);

  useEffect(() => {
    return playingSound
      ? () => {
          try {
            playingSound.unloadAsync();
          } catch (error) {}
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
      {onlyIcon ? (
        <TouchableOpacity
          onPress={(event) =>
            soundPlayStatus ? stopSound(event) : playSound(event)
          }
        >
          <View style={{ ...styles.iconWrapper }}>
            <Feather
              name={soundPlayStatus ? 'stop-circle' : 'play'}
              size={isSmallAudioPlayerButton ? 12 : 24}
              color={color}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <RoundedButton
          icon={
            <FontAwesome
              name={soundPlayStatus ? 'stop' : 'play'}
              size={isSmallAudioPlayerButton ? 12 : 24}
              color={color}
            />
          }
          style={isSmallAudioPlayerButton ? { width: 30, height: 30 } : {}}
          onPress={(event) =>
            soundPlayStatus ? stopSound(event) : playSound(event)
          }
        />
      )}
    </View>
  );
};
export default AudioPlayer;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  durationMillisText: {
    color: 'white',
    fontSize: 12,
    marginHorizontal: 10,
  },
  iconWrapper: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
