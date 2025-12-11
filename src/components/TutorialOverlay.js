import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';

const TUTORIAL_STEPS = [
  {
    title: 'Welcome to GridLock!',
    description: 'A fun block puzzle game where strategy meets quick thinking.',
    icon: '🎮',
  },
  {
    title: 'Drag & Drop Blocks',
    description: 'Drag blocks from the preview area onto the 8×8 grid to place them.',
    icon: '👆',
  },
  {
    title: 'Complete Lines',
    description: 'Fill an entire row or column to clear it and earn bonus points!',
    icon: '✨',
  },
  {
    title: 'Combo Multiplier',
    description: 'Clear multiple lines in a row to build your combo multiplier and earn more points.',
    icon: '⚡',
  },
  {
    title: 'Game Modes',
    description: 'Challenge yourself with Time Attack (60s race), Survival, or Limited Moves modes.',
    icon: '🎯',
  },
  {
    title: 'Level Up',
    description: 'Earn experience from each game. Level up to unlock achievements and earn rewards!',
    icon: '⬆️',
  },
  {
    title: 'Daily Streak',
    description: 'Play every day to build your streak and earn bonus experience multipliers.',
    icon: '🔥',
  },
  {
    title: 'Power-ups',
    description: 'Use Bomb to clear 3×3 areas, or Shuffle to get new blocks. Use wisely!',
    icon: '💣',
  },
  {
    title: 'Ready to Play?',
    description: 'You\'re all set! Tap "Start Playing" to begin your GridLock journey.',
    icon: '🚀',
  },
];

export default function TutorialOverlay({ visible, onComplete, theme }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = TUTORIAL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleSkip}
    >
      <View style={[styles.overlay, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
        <View style={[styles.container, { backgroundColor: theme.boardBackground }]}>
          <Text style={[styles.stepCounter, { color: theme.borderColor }]}>
            Step {currentStep + 1} of {TUTORIAL_STEPS.length}
          </Text>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: theme.filledColor,
                  width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%`,
                },
              ]}
            />
          </View>

          <Text style={[styles.icon, { color: theme.filledColor }]}>
            {step.icon}
          </Text>

          <Text style={[styles.title, { color: theme.filledColor }]}>
            {step.title}
          </Text>

          <Text style={[styles.description, { color: theme.borderColor }]}>
            {step.description}
          </Text>

          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.borderColor }]}
                onPress={handlePrevious}
              >
                <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>
                  ← Back
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.filledColor }]}
              onPress={handleNext}
            >
              <Text style={[styles.buttonText, { color: theme.backgroundColor }]}>
                {currentStep === TUTORIAL_STEPS.length - 1 ? 'Start Playing' : 'Next →'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: theme.borderColor }]}>
              Skip Tutorial
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    borderRadius: 16,
    padding: 24,
    maxWidth: 400,
    width: '100%',
  },
  stepCounter: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  icon: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 8,
  },
  skipText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
});
