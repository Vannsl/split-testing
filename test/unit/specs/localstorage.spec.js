/* eslint-disable no-unused-expressions, no-unused-vars, no-underscore-dangle */
import * as localStorageModule from '@/util/localstorage';

describe('localStorage', () => {
  const key = 'foo';
  const value = 'bar';

  beforeEach(() => {
    localStorage.clear();
  });

  describe('set', () => {
    it('should save to localStorage', () => {
      localStorageModule.set(key, value);
      expect(localStorage.setItem).toHaveBeenLastCalledWith(key, value);
      expect(localStorage.__STORE__[key]).toBe(value);
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });
  });

  describe('get', () => {
    it('returns the value for a specific key in the localStorage', () => {
      localStorageModule.set(key, value);
      const localStorageValue = localStorageModule.get(key);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(key);
      expect(localStorageValue).toBe(value);
    });

    it('returns null if there is no key in the localStorage', () => {
      const localStorageValue = localStorageModule.get(key);
      expect(localStorage.getItem).toHaveBeenLastCalledWith(key);
      expect(localStorageValue).toBe(null);
    });

    it('returns null if it was called without a key', () => {
      const localStorageValue = localStorageModule.get();
      expect(localStorage.getItem).not.toHaveBeenLastCalledWith();
      expect(localStorageValue).toBe(null);
    });
  });

  describe('remove', () => {
    it('removes a key from the localStorage', () => {
      localStorageModule.set(key, value);
      localStorageModule.remove(key);
      expect(localStorage.removeItem).toHaveBeenLastCalledWith(key);
      expect(localStorage.__STORE__[key]).toBe(undefined);
      expect(Object.keys(localStorage.__STORE__).length).toBe(0);
    });
  });

  describe('setInSession', () => {
    it('should save to sessionStorage', () => {
      localStorageModule.setInSession(key, value);
      expect(sessionStorage.setItem).toHaveBeenLastCalledWith(key, value);
      expect(sessionStorage.__STORE__[key]).toBe(value);
      expect(Object.keys(sessionStorage.__STORE__).length).toBe(1);
    });
  });

  describe('getFromSession', () => {
    it('returns the value for a specific key in the sessionStorage', () => {
      localStorageModule.setInSession(key, value);
      const sessionStorageValue = localStorageModule.getFromSession(key);
      expect(sessionStorage.getItem).toHaveBeenLastCalledWith(key);
      expect(sessionStorageValue).toBe(value);
    });

    it('returns null if there is no key in the sessionStorage', () => {
      const sessionStorageValue = localStorageModule.get(key);
      expect(sessionStorage.getItem).toHaveBeenLastCalledWith(key);
      expect(sessionStorageValue).toBe(null);
    });

    it('returns null if it was called without a key', () => {
      const sessionStorageValue = localStorageModule.get();
      expect(sessionStorage.getItem).not.toHaveBeenLastCalledWith();
      expect(sessionStorageValue).toBe(null);
    });
  });

  describe('removeFromStorage', () => {
    it('removes a key from the sessionStorage', () => {
      localStorageModule.setInSession(key, value);
      localStorageModule.removeFromSession(key);
      expect(sessionStorage.removeItem).toHaveBeenLastCalledWith(key);
      expect(sessionStorage.__STORE__[key]).toBe(undefined);
      expect(Object.keys(sessionStorage.__STORE__).length).toBe(0);
    });
  });
});
