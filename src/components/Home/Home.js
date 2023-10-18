import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ComponentWrappers from '../../ComponentWrappers';
import {
  AddDetails,
  AddTimeTable,
  Header,
  Navbar,
  SavedTimeTables,
  Welcome,
} from '../../components/';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navbar />
        <Route exact path={`${process.env.PUBLIC_URL}/addnew`} component={AddTimeTable} />
        <Route exact path={`${process.env.PUBLIC_URL}/addnew/:key`} component={AddTimeTable} />
        <Route exact path={`${process.env.PUBLIC_URL}/saved`} component={SavedTimeTables} />
        <Route exact path={`${process.env.PUBLIC_URL}/teachers`} component={AddDetails} />
        <Route exact path={`${process.env.PUBLIC_URL}/subjects`} component={AddDetails} />
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Welcome} />
      </div>
    );
  }
}

export default ComponentWrappers(Home);
