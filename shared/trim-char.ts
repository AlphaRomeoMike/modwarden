/**
 * Strip a repeated character from the start and/or end of a string in linear time.
 * Regexes like /\/+$/ take quadratic time in V8 on a long run of that character,
 * and request paths, hosts and passkey fields can supply such runs.
 */
export function trimChar(value: string, char: string, side: 'start' | 'end' | 'both' = 'both'): string {
  let start = 0;
  let end = value.length;
  if (side !== 'end') while (start < end && value[start] === char) start++;
  if (side !== 'start') while (end > start && value[end - 1] === char) end--;
  return value.slice(start, end);
}
