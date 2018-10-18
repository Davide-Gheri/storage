export function tryParse(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

export function decode(s) {
  return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}
