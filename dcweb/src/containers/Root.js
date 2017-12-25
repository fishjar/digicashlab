import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'

import Trades from './Trades';
import NoMatch from '../components/NoMatch'

const Root = ({ store }) => (
  <Provider store={store}>
    <Switch>
      <Route path="/trades" component={Trades} />
      <Route component={NoMatch} />
    </Switch>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
