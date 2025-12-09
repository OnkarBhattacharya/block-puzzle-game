import { Audio } from 'expo-av';

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
      console.log('Sounds loaded');
    } catch (error) {
      console.error('Error loading sounds:', error);
    }
  },

  async playSound(key) {
    try {
      if (soundObjects[key]) {
        await soundObjects[key].replayAsync();
      }
    } catch (error) {
      console.error(`Error playing sound ${key}:`, error);
    }
  },
};

export default SoundManager;
