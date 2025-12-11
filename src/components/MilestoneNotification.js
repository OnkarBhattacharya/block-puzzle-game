import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function MilestoneNotification({ milestone, theme, onComplete }) {
  const [scaleAnim] = useState(new Animated.Value(0));
  const [opacityAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete && onComplete();
    });
  }, [scaleAnim, opacityAnim, onComplete]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={[styles.content, { backgroundColor: theme.filledColor, borderColor: theme.clearingColor }]}>
        <Text style={[styles.title, { color: theme.backgroundColor }]}>🎉 Milestone!</Text>
        <Text style={[styles.message, { color: theme.backgroundColor }]}>
          {milestone.message}
        </Text>
        {milestone.reward && (
          <Text style={[styles.reward, { color: theme.clearingColor }]}>
            +{milestone.reward} Points
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    right: '10%',
    zIndex: 1000,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  reward: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
