export const storage = {
  get: (key) => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  },
  push: (key, item) => {
    if (typeof window === 'undefined') return;
    const existing = storage.get(key);
    localStorage.setItem(key, JSON.stringify([...existing, item]));
  },
  set: (key, val) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(val));
  },
  clear: (key) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
};
