import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';

import InvitedFlow from './InvitedFlow';
import ConnectedFlow from './ConnectedFlow';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PROXY from "../proxy";

function Nav(props) {

  useEffect(() => {

    // Chargement dans le store des cleanwalks de l'utilisateur
    const loadCws = async (token) => {
      let rawResponse = await fetch(`${PROXY}/load-cw-forstore/${token}`);
      let response = await rawResponse.json();
      props.loadCwsStore({ infosCWparticipate: response.infosCWparticipate, infosCWorganize: response.infosCWorganize });
    }

    // chargement de l'item 'token' du localStorage si value et enregistrement ds le store
    //AsyncStorage.removeItem("token"); //-> suppression de l'item 'token' au besoin
    AsyncStorage.getItem('token', (err, value) => {
      if (value) {
        const valueParse = JSON.parse(value);
        props.login(valueParse.token);

        loadCws(valueParse.token);

      }
    });
    
  }, []);
  
  return (
    <NavigationContainer>
      {/* si token invité InvitedFlow, si non ConnectedFlow */}
      {props.tokenObj.token === "XeDLDMr3U4HSJSl74HJpKD" ? <InvitedFlow /> : <ConnectedFlow /> }
    </NavigationContainer>
  )
}


function mapStateToProps(state) {
  return { tokenObj: state.tokenObj }
}

function mapDispatchToProps(dispatch) {
  return {
    login: function (token) {
      dispatch({ type: "login", token });
    },
    loadCwsStore: function (cwsStore) {
      dispatch({ type: "loadCwsStore", cwsStore });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);