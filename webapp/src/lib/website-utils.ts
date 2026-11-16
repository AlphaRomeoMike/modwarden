import type { Cipher } from './types';

export function firstCipherUri(cipher: Cipher): string {
  const uris = cipher.login?.uris || [];
  for (const uri of uris) {
    const raw = uri.decUri || uri.uri || '';
    if (raw.trim()) return raw.trim();
  }
  return '';
}

export function hostFromUri(uri: string): string {
  if (!uri.trim()) return '';
  try {
    const normalized = /^https?:\/\//i.test(uri) ? uri : `https://${uri}`;
    return new URL(normalized).hostname || '';
  } catch {
    return '';
  }
}

/** Website hosts from every link on the item, in order, so the icon can fall back to a later link's favicon. */
export function cipherWebsiteHosts(cipher: Cipher): string[] {
  const hosts: string[] = [];
  for (const uri of cipher.login?.uris || []) {
    const raw = (uri.decUri || uri.uri || '').trim();
    // App links (androidapp://, iosapp://) have no website favicon.
    if (!raw || (/^[a-z][a-z\d+.-]*:\/\//i.test(raw) && !/^https?:\/\//i.test(raw))) continue;
    const host = hostFromUri(raw);
    if (host && !hosts.includes(host)) hosts.push(host);
  }
  return hosts;
}

export function websiteIconUrl(host: string): string {
  return `/icons/${encodeURIComponent(host)}/icon.png?fallback=404`;
}
