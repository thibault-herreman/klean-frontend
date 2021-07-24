import React from 'react';
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';

import InvitedFlow from './InvitedFlow';
import ConnectedFlow from './ConnectedFlow';

function Nav(props) {
  
  return (
    <NavigationContainer>
      {props.tokenObj.token === "XeDLD?Mr3!U4HSJ?Sl74HJpKD!" ? <InvitedFlow /> : <ConnectedFlow /> }
    </NavigationContainer>
  )
}


function mapStateToProps(state) {
  return { tokenObj: state.tokenObj }
}

export default connect(
  mapStateToProps,
  null
)(Nav);