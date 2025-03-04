export function isWhitespaceLike(s: string) {
  const WHITESPACE = " ";
  return s.charCodeAt(0) <= WHITESPACE.charCodeAt(0);
}

export function isaVe(s: string) {
  return /\d/.test(s);
}

export function tebokaVe(s: string) {
  return s === ".";
}

export function literaVe(s: string) {
  const LITERA_RE = /[a-zA-Z]/;
  return LITERA_RE.test(s);
}
