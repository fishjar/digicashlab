import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  ButtonToolbar,
  ButtonGroup,
  DropdownButton,
  MenuItem,
  Table,
  Pager,
  Checkbox,
} from 'react-bootstrap';

import { fetchTrades } from '../actions'
import { API_HOST } from '../config'


class Trades extends Component {

  componentDidMount() {
    const { dispatch, params, filter } = this.props;
    dispatch(fetchTrades(params, filter));
  }

  selectPair = (pair) => {
    console.log(pair);
    const { dispatch, params, filter } = this.props;
    const offset = 0;
    dispatch(fetchTrades(Object.assign(params, { pair, offset }), filter));
  }

  selectOrderBy = (order_by) => {
    console.log(order_by);
    const { dispatch, params, filter } = this.props;
    const offset = 0;
    dispatch(fetchTrades(Object.assign(params, { order_by, offset }), filter));
  }

  selectTime = (days) => {
    console.log(days);
    const { dispatch, params, filter } = this.props;
    const offset = 0;
    dispatch(fetchTrades(Object.assign(params, { offset }), Object.assign(filter, { days })));
  }

  selectOrder = (e) => {
    console.log(e.target.checked);
    const { dispatch, params, filter } = this.props;
    const order = e.target.checked ? 'DESC' : 'ASC';
    const offset = 0;
    dispatch(fetchTrades(Object.assign(params, { order, offset }), filter));
  }

  prevPage = (e) => {
    e.preventDefault();
    const { dispatch, params, filter, page } = this.props;
    if (page <= 1) {
      return;
    }
    const offset = (page - 2) * params.limit;
    dispatch(fetchTrades(Object.assign(params, { offset }), filter));
  }

  nextPage = (e) => {
    e.preventDefault();
    const { dispatch, params, filter, page, pageAll } = this.props;
    if (page === pageAll) {
      return;
    }
    const offset = page * params.limit;
    dispatch(fetchTrades(Object.assign(params, { offset }), filter));
  }

  // downloadTrades = () => {
  //   e.preventDefault();
  // }

  render() {
    console.log(this.props);
    const {
      isFetching,
      params,
      filter,
      trades,
      errCode,
      errMsg,
      page,
      pageAll,
    } = this.props;

    // if (isFetching) {
    //   return (
    //     <div className="tc">loading...</div>
    //   )
    // }

    // if (errCode !== 0) {
    //   return (
    //     <div className="tc">[{errCode}]: {errMsg}</div>
    //   )
    // }
    // const API_HOST = 'http://119.28.138.245:9011';
    // const API_HOST = 'http://127.0.0.1:7001';
    const titleLine = <div>
      {isFetching ? <p>loading...</p> : <p>trades <a href={`${API_HOST}/trades_csv`}>download</a></p>}
      {errCode !== 0 ? <p>[{errCode}]: {errMsg}</p> : <p>get {trades.count} items! page: {page}/{pageAll}</p>}
    </div>;

    const dt = 'usdt';
    const pairs = ['btc', 'bch', 'eth', 'etc'];
    // const times = ['1 day', '1 week', '1 month'];
    // const times = [{
    //   title: '1 day',
    //   days: 1
    // },{
    //   title: '1 week',
    //   days: 7
    // },{
    //   title: '1 month',
    //   days: 30
    // }];
    const times = {
      1: '1 day',
      7: '1 week',
      30: '1 month'
    }
    // const orders = ['trade_id', 'rate', 'amount', 'total', 'timestamp'];
    const orders = {
      trade_id: '交易ID',
      rate: '单价',
      amount: '数量',
      total: '总价',
      timestamp: '交易时间',
    }

    return (
      <div className="trades">
        {titleLine}
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <DropdownButton value="2" title={params.pair} id="digicash-dropdown">
                {
                  pairs.map((item, idx) => (
                    <MenuItem key={idx} eventKey={`${item}_${dt}`} onSelect={this.selectPair}>{`${item}_${dt}`}</MenuItem>
                  ))
                }
              </DropdownButton>
              <DropdownButton title={times[filter.days]} id="time-dropdown">
                {
                  Object.keys(times).map(days => (
                    <MenuItem key={days} eventKey={days} onSelect={this.selectTime}>{times[days]}</MenuItem>
                  ))
                }
              </DropdownButton>
            </ButtonGroup>

            <ButtonGroup>
              <DropdownButton title={orders[params.order_by]} id="order-dropdown">
                {
                  Object.keys(orders).map((item, idx) => (
                    <MenuItem key={item} eventKey={item} onSelect={this.selectOrderBy}>{orders[item]}</MenuItem>
                  ))
                }
              </DropdownButton>
            </ButtonGroup>
            <Checkbox checked={params.order === 'DESC'} onChange={this.selectOrder}>倒序</Checkbox>
          </ButtonToolbar>
        </div>
        <div>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>交易ID</th>
                <th>站点</th>
                <th>货币</th>
                <th>类型</th>
                <th>单价</th>
                <th>数量</th>
                <th>总价</th>
                <th>时间</th>
              </tr>
            </thead>
            <tbody>
              {
                trades.rows.map(trade => (
                  <tr key={trade.id}>
                    <td>{trade.trade_id}</td>
                    <td>{trade.site}</td>
                    <td>{trade.pair}</td>
                    <td>{trade.type}</td>
                    <td>{trade.rate}</td>
                    <td>{trade.amount}</td>
                    <td>{trade.total}</td>
                    <td>{trade.date}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div>
          <Pager>
            <Pager.Item disabled={page === 1} previous href="#" onClick={this.prevPage}>&larr; 上一页</Pager.Item>
            <Pager.Item disabled={page === pageAll} next href="#" onClick={this.nextPage}>下一页 &rarr;</Pager.Item>
          </Pager>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isFetching, params, filter, data: trades, errCode, errMsg } = state.trades;
  const page = params.offset / params.limit + 1;
  const pageAll = (trades.count % params.limit === 0) ? (trades.count / params.limit) : (parseInt(trades.count / params.limit, 10) + 1);
  return {
    isFetching,
    params,
    filter,
    trades,
    errCode,
    errMsg,
    page,
    pageAll,
  }
}

export default withRouter(connect(mapStateToProps)(Trades))
