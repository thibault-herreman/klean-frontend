import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

import EventFillInfo from '../PageComponents/EventFillInfo';
import ConnectedMapScreen from '../PageComponents/ConnectedMapScreen';
import Profil from '../PageComponents/Profil';
import CitiesRanking from '../PageComponents/CitiesRanking';
import News from '../PageComponents/News'
import CreateEvent from '../PageComponents/CreateEvent'
import ChatMapStack from '../PageComponents/ChatMapStack';
import ChatProfilStack from '../PageComponents/ChatProfilStack';
import ConnectedEventDetailMapStack from '../PageComponents/ConnectedEventDetailMapStack';
import ConnectedEventDetailProfilStack from '../PageComponents/ConnectedEventDetailProfilStack'

import { colors } from '../lib/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function ConnectedFlow() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Chercher') {
          return <Ionicons name="earth" size={25} color={color} />;

        } else if (route.name === 'Proposer') {
          return <AntDesign name="pluscircle" size={25} color={color} />

        } else if (route.name === 'Profil') {
          return <FontAwesome name="user" size={25} color={color} />;

        } else if (route.name === 'Classement') {
          return <Ionicons name="stats-chart-sharp" size={25} color={color} />

        } else if (route.name === 'Actualité') {
          return <Ionicons name="newspaper-outline" size={25} color={color} />
        }
      },
    })}
      tabBarOptions={{
        activeTintColor: colors.white,
        inactiveTintColor: "#D1D1D1",
        style: {
          backgroundColor: colors.primary,
          height: 64,
          paddingBottom: 10,
          paddingTop: 10
        }
      }}>
      <Tab.Screen name="Chercher" component={ConnectedMapStack} />
      <Tab.Screen name="Classement" component={CitiesRanking} />
      <Tab.Screen name="Proposer" component={CreateEventStack} />
      <Tab.Screen name="Profil" component={ProfilStack} />
      <Tab.Screen name="Actualité" component={News} />
    </Tab.Navigator>
  )
}




/* STACKS FOR EACH MAIN TAB*/

function ConnectedMapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConnectedMapScreen" component={ConnectedMapScreen} />
      <Stack.Screen name="ConnectedEventDetailMapStack" component={ConnectedEventDetailMapStack} />
      <Stack.Screen name="ChatMapStack" component={ChatMapStack} />
    </Stack.Navigator>
  )
}

function CreateEventStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="EventFillInfo" component={EventFillInfo} />
    </Stack.Navigator>
  )
}

function ProfilStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profil" component={Profil} />
      <Stack.Screen name="ConnectedEventDetailProfilStack" component={ConnectedEventDetailProfilStack} />
      <Stack.Screen name="ChatProfilStack" component={ChatProfilStack} />
    </Stack.Navigator>
  )
}