import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './screens/AuthScreen';
import HomeMain from './screens/Home/HomeMain';
import  AuthContextProvider, { AuthContext }  from './context/ContextApi';
import { useContext, useState } from 'react';

export default function App() {

  const AppNav = ()=>{

    return(
      <>
        <AuthScreen/>
        <HomeMain/>
      </>
    )
  }

  return (
    <AuthContextProvider>
      {AppNav()}
    </AuthContextProvider>
  );
}

