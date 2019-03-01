const { CHECK_URL } = require('../constants')
const { logger } = require('../../../../logger')

const states = {
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW'
}
const actions = {
  GET_NEXT_PATH: 'getNextPath'
}

const getStepByPath = (steps, path) => steps.find(step => step.path === path)

const getNextPath = (steps, path) => {
  const step = getStepByPath(steps, path)
  const nextPath = step.next

  if (!nextPath) {
    throw new Error(`No next step defined for ${path}`)
  }

  return nextPath
}

const stateMachine = {
  [states.IN_PROGRESS]: {
    getNextPath
  },
  [states.IN_REVIEW]: {
    getNextPath: () => CHECK_URL
  },

  getState: (req) => {
    const state = states.hasOwnProperty(req.session.state) ? states[req.session.state] : states.IN_PROGRESS
    return stateMachine[state]
  },

  setState: (state, req) => {
    logger.info(`State set to ${state}`, { req })
    req.session.state = state
  },

  dispatch: (action, req, ...args) => {
    const state = stateMachine.getState(req)

    return state[action](...args)
  }
}

module.exports = {
  states,
  stateMachine,
  actions
}
