import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Routes from "./routes";

import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { addListener } from '../store/configureStore';

export const AppNavigator = StackNavigator(Routes);

class AppNavigation extends Component {
  constructor(props){
    super(props);
   
  }

  render(){
    return (
      <AppNavigator navigation={addNavigationHelpers({dispatch: this.props.dispatch, state: this.props.nav, addListener })} />
    )
  }

}

const mapStateToProps = state => ({ nav: state.nav });

export default connect(mapStateToProps)(AppNavigation);