import React from 'react';
import { connect } from 'react-redux'

import { createStackNavigator } from '@react-navigation/stack';

import InvitedMapScreen from '../PageComponents/InvitedMapScreen'
import InvitedEventDetail from '../PageComponents/InvitedEventDetail';
import Login from '../PageComponents/Login';
import SignUp from '../PageComponents/SignUp'
import OnBoarding from '../PageComponents/OnBoarding';

const Stack = createStackNavigator();

function InvitedFlow(props) {
    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* création des routes de la nav Stack invité */}
      {/* clé de l'objet du store isFirstVisit à true = Onboarding */}
      {props.tokenObj.IsFirstVisit ? <Stack.Screen name="OnBoarding" component={OnBoarding} /> : null }
      <Stack.Screen name="InvitedMapScreen" component={InvitedMapScreen} />
      <Stack.Screen name="InvitedEventDetail" component={InvitedEventDetail} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

function mapStateToProps(state) {
    return { tokenObj: state.tokenObj }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(InvitedFlow);