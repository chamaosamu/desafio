import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import React from 'react';
 
import AppTab from './src/routes/AppTab.js';
 
export default function App() {
  let[fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
  });

  if(!fontsLoaded){
    return <AppLoading/>;
  } else{

  return (
    <>
      <AppTab />
      <StatusBar style="light" />
    </>
  );
}
}