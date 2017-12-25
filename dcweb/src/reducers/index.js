import { combineReducers } from 'redux'

import {
  REQUEST_STRADES,
  RECEIVE_STRADES,
  SET_PARAMS,
  SET_FILTER,
} from '../actions'


const trades = (state = {
  isFetching: false,
  params: {
    pair: 'btc_usdt',
    offset: 0,
    limit: 20,
    order_by: 'trade_id',
    order: 'DESC'
  },
  filter: {},
  data: {
    count: 0,
    rows: []
  }
}, action) => {
  const {params, filter, data} = action;
  switch (action.type) {
    case SET_PARAMS:
      return {
        ...state,
        params
      }
    case SET_FILTER:
      return {
        ...state,
        filter
      }
    case REQUEST_STRADES:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_STRADES:
      return {
        ...state,
        data,
        isFetching: false
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  trades,
})

export default rootReducer
