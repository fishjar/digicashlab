import fetch from 'isomorphic-fetch'

import { API_HOST } from '../config'

export const REQUEST_STRADES = 'REQUEST_STRADES'
export const RECEIVE_STRADES = 'RECEIVE_STRADES'
export const FAILURE_STRADES = 'FAILURE_STRADES'
export const SET_PARAMS = 'SET_PARAMS'
export const SET_FILTER = 'SET_FILTER'

export const setParams = (params) => ({
  type: SET_PARAMS,
  params,
})

export const setFilter = (filter) => ({
  type: SET_FILTER,
  filter,
})

export const requestTrades = (params, filter) => ({
  type: REQUEST_STRADES,
  params,
  filter,
})

export const receiveTrades = (params, filter, data) => ({
  type: RECEIVE_STRADES,
  params,
  filter,
  data,
})
export const failureTrades = (errCode, errMsg) => ({
  type: FAILURE_STRADES,
  errCode,
  errMsg,
})

export const fetchTrades = (params, filter) => async dispatch => {
  dispatch(requestTrades(params, filter));
  const { days } = filter;
  const t = Date.now() - 3600 * 1000 * 24 * days;
  // params.filter = encodeURIComponent(JSON.stringify({
  //   timestamp: {
  //     $gt: t
  //   },
  // }));
  const kvs = Object.assign({}, params, {
    filter: encodeURIComponent(JSON.stringify({
      timestamp: {
        $gt: t
      },
    }))
  })
  const url = new URL(`${API_HOST}/trades`);
  Object.keys(kvs).forEach(key => url.searchParams.append(key, kvs[key]));

  return fetch(url, {
    mode: 'cors',
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(json => {
      console.log(json)
      return dispatch(receiveTrades(params, filter, json))
    }).catch(err => {
      console.log(err);
      return dispatch(failureTrades(1, `${err}`))
    })
}
