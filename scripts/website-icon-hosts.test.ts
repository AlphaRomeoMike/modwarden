import assert from 'node:assert/strict';
import test from 'node:test';

import { cipherWebsiteHosts } from '../webapp/src/lib/website-utils';
import type { Cipher } from '../webapp/src/lib/types';

const cipherWithUris = (...uris: string[]) => ({ login: { uris: uris.map((uri) => ({ decUri: uri })) } }) as unknown as Cipher;

test('collects website hosts from every link in order, without duplicates', () => {
  assert.deepEqual(
    cipherWebsiteHosts(cipherWithUris('https://accounts.example.com/login', 'github.com', 'https://accounts.example.com/other', 'http://intranet.local:8080/x')),
    ['accounts.example.com', 'github.com', 'intranet.local']
  );
});

test('skips app links and blanks so a later website link can supply the favicon', () => {
  assert.deepEqual(cipherWebsiteHosts(cipherWithUris('androidapp://com.spotify.music', '  ', 'https://open.spotify.com')), ['open.spotify.com']);
});

test('keeps host:port links that have no scheme', () => {
  assert.deepEqual(cipherWebsiteHosts(cipherWithUris('example.com:8443/admin')), ['example.com']);
});

test('items without links have no hosts', () => {
  assert.deepEqual(cipherWebsiteHosts({} as Cipher), []);
});
