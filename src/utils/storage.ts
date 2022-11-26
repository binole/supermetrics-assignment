const storagePrefix = 'supermetrics_assignment_';

export const storage = {
  getItem: (key: string) => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}${key}`) as string);
  },
  setItem: (key: string, value: any) => {
    window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
  },
  clearItem: (key: string) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`);
  },
};