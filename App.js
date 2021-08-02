import React from 'react';

import { useFonts, Lato_100Thin, Lato_100Thin_Italic, Lato_300Light, Lato_300Light_Italic, Lato_400Regular, Lato_400Regular_Italic, Lato_700Bold, Lato_700Bold_Italic, Lato_900Black, Lato_900Black_Italic  } from '@expo-google-fonts/lato';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import tokenObj from './Reducers/token.reducer'
import cleanwalkId from './Reducers/idCW.reducer'
import cityInfo from './Reducers/createCleanwalk'
import Nav from './NavComponents/Nav'

const store = createStore(combineReducers({ tokenObj, cleanwalkId, cityInfo }));

export default function App() {

  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic 
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <Nav/>
    </Provider>
  );
}