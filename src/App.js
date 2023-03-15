import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import InlineCartPage from './InlineCartPage/InlineCartPage';

export default function App() {
  return (
    <div>
      <Router>
        <Route exact path="/stores/:storeId/orders/:orderId" render={props => <InlineCartPage {...props} />} />
      </Router>
    </div>
  );
}
