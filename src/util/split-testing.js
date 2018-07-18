import * as LocalStorage from './localstorage';

const PREFIX = 'awesome_website_AB_';

const TESTING_GROUP = 'A';
const CONTROL_GROUP = 'B';

const CURRENT_TESTS = {
};

const isPossible = () => LocalStorage.isStorageAvailable('localStorage');

const createGroup = (name, weights) => {
  const group = Math.random() >= weights ? TESTING_GROUP : CONTROL_GROUP;
  LocalStorage.set(`${PREFIX}${name}`, group);
  return group;
};

const getGroupFor = (name, weights = 0.5) => {
  let testGroup = LocalStorage.get(`${PREFIX}${name}`);

  // if the user was not involved in the test yet
  // we create it for him and return the group immediately
  if (!testGroup) {
    testGroup = createGroup(name, weights);
  }

  return testGroup;
};

const isTestingGroupFor = name => LocalStorage.get(`${PREFIX}${name}`) === TESTING_GROUP;

const isControlGroupFor = name => LocalStorage.get(`${PREFIX}${name}`) === CONTROL_GROUP;

export {
  CURRENT_TESTS,
  getGroupFor,
  isPossible,
  isControlGroupFor,
  isTestingGroupFor,
};
