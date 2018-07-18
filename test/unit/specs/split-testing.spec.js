/* eslint-disable no-unused-expressions, no-unused-vars, no-underscore-dangle */
import * as splitTesting from '@/util/split-testing';
import * as localStorageModule from '@/util/localstorage';

describe('splitTesting', () => {
  const testName = 'test';
  const groups = ['A', 'B'];

  beforeEach(() => {
    localStorage.clear();
  });

  describe('isPossible', () => {
    it('returns true if the localStorage is available', () => {
      localStorageModule.isAvailable = jest.fn(() => true);
      expect(splitTesting.isPossible()).toBeTruthy;
    });

    it('returns false if the localStorage is not available', () => {
      localStorageModule.isAvailable = jest.fn(() => false);
      expect(splitTesting.isPossible()).toBeFalsy;
    });
  });

  describe('getGroupFor', () => {
    it('creates a new test with a prefics if the user does not have a group yet', () => {
      const group = splitTesting.getGroupFor(testName);
      expect(groups).toEqual(expect.arrayContaining([localStorage.getItem(`awesome_website_AB_${testName}`)]));
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });

    it('returns the test group', () => {
      const group = splitTesting.getGroupFor(testName);
      expect(groups).toEqual(expect.arrayContaining([group]));
    });
  });

  describe('isTestingGroupFor', () => {
    it('returns true if the user is in the testing group', () => {
      localStorage.setItem(`myposter_AB_${testName}`, 'A');
      expect(splitTesting.isTestingGroupFor(testName)).toBeTruthy;
    });

    it('returns false if the user is not in the testing group', () => {
      localStorage.setItem(`myposter_AB_${testName}`, 'B');
      expect(splitTesting.isTestingGroupFor(testName)).toBeFalsy;
    });
  });

  describe('isControlGroupFor', () => {
    it('returns true if the user is in the control group', () => {
      localStorage.setItem(`myposter_AB_${testName}`, 'B');
      expect(splitTesting.isTestingGroupFor(testName)).toBeTruthy;
    });

    it('returns false if the user is not in the control group', () => {
      localStorage.setItem(`myposter_AB_${testName}`, 'A');
      expect(splitTesting.isTestingGroupFor(testName)).toBeFalsy;
    });
  });
});
