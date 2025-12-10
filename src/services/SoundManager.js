import { Audio } from 'expo-av';
import { Logger } from '../utils/logger';

const sounds = {
  place: require('../assets/sounds/place.mp3'),
  clear: require('../assets/sounds/clear.mp3'),
  game_over: require('../assets/sounds/gameOver.mp3'),
};

let soundObjects = {};

const SoundManager = {
  async loadSounds() {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      for (const key in sounds) {
        const { sound } = await Audio.Sound.createAsync(sounds[key]);
        soundObjects[key] = sound;
      }
      Logger.info('SoundManager', 'Sounds loaded');
    } catch (error) {
      Logger.error('SoundManager', 'Error loading sounds', error);
    }
  },

  async playSound(key) {
    try {
      if (soundObjects[key]) {
        await soundObjects[key].replayAsync();
      }
    } catch (error) {
      Logger.error('SoundManager', `Error playing sound ${key}`, error);
    }
  },
};

export default SoundManager;
