import assert from 'node:assert/strict';
import test from 'node:test';

import { trimChar } from '../shared/trim-char';

test('matches the regexes it replaced', () => {
  const alphabet = ['/', '.', '=', 'a', '-'];
  for (let i = 0; i < 5000; i++) {
    const s = Array.from({ length: i % 12 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
    assert.equal(trimChar(s, '/', 'end'), s.replace(/\/+$/, ''), s);
    assert.equal(trimChar(s, '=', 'end'), s.replace(/=+$/g, ''), s);
    assert.equal(trimChar(s, '/'), s.replace(/^\/+|\/+$/g, ''), s);
    assert.equal(trimChar(s, '.'), s.replace(/^\.+/, '').replace(/\.+$/, ''), s);
    assert.equal(trimChar(s, '.', 'start'), s.replace(/^\.+/, ''), s);
  }
});

test('stays linear on long runs that are not at the end', () => {
  // /=+$/ takes seconds on this input in V8; the loop must finish almost instantly.
  const hostile = '='.repeat(1_000_000) + 'x';
  const started = performance.now();
  assert.equal(trimChar(hostile, '=', 'end'), hostile);
  assert.equal(trimChar('/'.repeat(1_000_000) + 'x', '/'), 'x');
  assert.ok(performance.now() - started < 250, `took ${performance.now() - started}ms`);
});
