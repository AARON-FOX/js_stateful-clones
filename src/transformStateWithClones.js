'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    } else if (action.type === 'removeProperties') {
      const keys = action.keysToRemove;

      for (const key of keys) {
        delete nextState[key];
      }
    } else if (action.type === 'clear') {
      nextState = {};
    }

    currentState = nextState;
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
