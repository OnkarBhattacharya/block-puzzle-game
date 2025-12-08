import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HowToPlayScreen = ({ theme }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={[styles.title, { color: theme.filledColor }]}>How to Play</Text>
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.filledColor }]}>The Goal</Text>
                <Text style={[styles.sectionText, { color: theme.filledColor }]}>The goal of the game is to score as many points as possible by placing blocks on the grid to create full lines, either horizontally or vertically.</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.filledColor }]}>Placing Blocks</Text>
                <Text style={[styles.sectionText, { color: theme.filledColor }]}>Drag and drop the blocks from the bottom of the screen onto the game board. You can't rotate the blocks, so place them wisely!</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.filledColor }]}>Clearing Lines</Text>
                <Text style={[styles.sectionText, { color: theme.filledColor }]}>When you complete a full line of blocks across the grid, the line will be cleared, and you'll earn points. You can clear multiple lines at once for a combo bonus!</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.filledColor }]}>Game Over</Text>
                <Text style={[styles.sectionText, { color: theme.filledColor }]}>The game ends when there are no more possible moves for any of the available blocks. Think ahead to keep the game going as long as possible!</Text>
            </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
      paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default HowToPlayScreen;
