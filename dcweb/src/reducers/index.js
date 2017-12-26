import { combineReducers } from 'redux'

import {
  REQUEST_STRADES,
  RECEIVE_STRADES,
  FAILURE_STRADES,
  SET_PARAMS,
  SET_FILTER,
} from '../actions'


const trades = (state = {
  isFetching: false,
  errCode: 0,
  errMsg: "ok",
  params: {
    pair: 'btc_usdt',
    offset: 0,
    limit: 10,
    order_by: 'trade_id',
    order: 'DESC'
  },
  filter: {
    days: 1,
  },
  data: {
    count: 0,
    rows: []
  }
}, action) => {
  const {params, filter, data, errCode, errMsg} = action;
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
    case FAILURE_STRADES:
      return {
        ...state,
        errCode,
        errMsg,
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
