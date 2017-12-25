import fetch from 'isomorphic-fetch'

export const REQUEST_STRADES = 'REQUEST_STRADES'
export const RECEIVE_STRADES = 'RECEIVE_STRADES'
export const SET_PARAMS = 'SET_PARAMS'
export const SET_FILTER = 'SET_FILTER'

const API_HOST = 'http://localhost:7001';

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

export const fetchTrades = (params,filter) => async dispatch => {
  dispatch(requestTrades(params, filter));

  params.filter = encodeURIComponent(JSON.stringify(filter));
  const url = new URL(`${API_HOST}/trades`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  return fetch(url,{
    mode: 'cors',
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      return dispatch(receiveTrades(params, filter, json))
    })
}
