import { test } from 'node:test';
import assert from 'node:assert/strict';

import { calculateLevel, getExpProgress, getStreakMultiplier, GAME_MODES } from '../src/utils/progression.js';
import { challenges, getDailyChallenge } from '../src/utils/challenges.js';
import { REWARDS, GAME_CONFIG } from '../src/utils/constants.js';
import { BLOCKS, getRandomBlock } from '../src/utils/blocks.js';
import { themes } from '../src/utils/themes.js';

test('calculateLevel caps at maxLevel', () => {
  assert.equal(calculateLevel(0), 1);
  assert.equal(calculateLevel(499), 1);
  assert.equal(calculateLevel(500), 2);
  assert.equal(calculateLevel(Number.MAX_SAFE_INTEGER), 50);
});

test('getExpProgress stays within 0-100 percent', () => {
  const p = getExpProgress(750);
  assert.equal(p.level, 2);
  assert.equal(p.needed, 500);
  assert.equal(p.progress, 250);
  assert.ok(p.percentage > 0 && p.percentage <= 100);
});

test('getStreakMultiplier returns highest matching tier', () => {
  assert.equal(getStreakMultiplier(0), 1);
  assert.equal(getStreakMultiplier(3), 1.1);
  assert.equal(getStreakMultiplier(100), 2);
});

test('game modes expose required fields', () => {
  for (const mode of Object.values(GAME_MODES)) {
    assert.ok(mode.id && mode.name && mode.description && mode.icon);
  }
});

test('daily challenge rotates deterministically per day and is valid', () => {
  const c = getDailyChallenge();
  assert.equal(c, getDailyChallenge());
  assert.ok(challenges.includes(c));
  assert.ok(c.target > 0);
});

test('rewards and grid config are sane', () => {
  assert.equal(GAME_CONFIG.GRID_SIZE, 8);
  assert.ok(GAME_CONFIG.AD_FREQUENCY > 0);
  assert.ok(REWARDS.LINE_CLEAR_BASE > 0);
});

test('every block shape is a non-empty rectangular binary matrix with a color', () => {
  for (const [name, block] of Object.entries(BLOCKS)) {
    assert.ok(block.shape.length > 0, name);
    const width = block.shape[0].length;
    for (const row of block.shape) {
      assert.equal(row.length, width, name);
      for (const cell of row) {
        assert.ok(cell === 0 || cell === 1, name);
      }
    }
    assert.match(block.color, /^#[0-9a-f]{6}$/i);
  }
});

test('getRandomBlock always returns a defined block', () => {
  for (let i = 0; i < 50; i++) {
    assert.ok(getRandomBlock().shape);
  }
});

test('all themes define the full palette used by components', () => {
  const requiredKeys = [
    'backgroundColor',
    'filledColor',
    'clearingColor',
    'boardBackground',
    'borderColor',
    'cellBorderColor',
    'blockBorderColor',
  ];
  for (const [name, theme] of Object.entries(themes)) {
    for (const key of requiredKeys) {
      assert.ok(theme[key], `${name}.${key}`);
    }
  }
});
