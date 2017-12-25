import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { fetchTrades } from '../actions'




class Trades extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {
    const { dispatch, params, filter } = this.props;
    dispatch(fetchTrades(params, filter));
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    // console.log(this.props);
    const {
      isFetching,
      params,
      filter,
      trades
    } = this.props

    if (isFetching) {
      return (
        <div className="tc">loading...</div>
      )
    }

    const pairs = ['btc','bch','eth','etc'];

    return (
      <div className="trades">
        <div>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>pair</DropdownToggle>
            <DropdownMenu>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
              {
                pairs.map((pair,idx)=>(
                  <DropdownItem key={idx}>{pair}</DropdownItem>
                ))
              }
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isFetching, params, filter, data: trades } = state.trades
  return {
    isFetching,
    params,
    filter,
    trades
  }
}

export default withRouter(connect(mapStateToProps)(Trades))
