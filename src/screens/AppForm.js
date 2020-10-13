import React, { useState, useEffect, Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

import DatePicker from 'react-native-datepicker';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage';

import Database from '../database/Database';


export default function AppForm({ route, navigation}) {
  const id = route.params ? route.params.id : undefined;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [titulo, setTitulo] = useState(null); 
  const [usuario, setUsuario] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [dateAtualizacao, setAtualizacao] = useState(new Date())

  useEffect(() => {
  
    if(!route.params) return;
    setTitulo(route.params.titulo);
    setUsuario(route.params.usuario);
    setDescricao(route.params.descricao);
    setAtualizacao(route.params.dateAtualizacao)

  }, [route])
  

function handleTitleChange(titulo){ setTitulo(titulo); } 
function handleUserChange(usuario){ setUsuario(usuario); }
function handleDescriptionChange(descricao){ setDescricao(descricao); }
function handleDateAtualizacaoChange(dateAtualizacao){setAtualizacao(dateAtualizacao); }

async function handleButtonPress(){ 
  const listItem = {titulo, usuario, descricao, dateAtualizacao};
  Database.saveItem(listItem, id)
      .then(response => navigation.navigate("AppList", listItem));
      navigation.reset({
        routes: [{name: 'AppList'}]
    });
}
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

    })();
  }, []);

  let text = 'Obtendo..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    
  }

    return (
      
      <View style={styles.container}>
        <Text style={styles.title}>Adicionar questionário</Text>
        <View style={styles.inputContainer}> 
          <TextInput 
            style={styles.input} 
            onChangeText={handleTitleChange} 
            placeholder="Título"
            clearButtonMode="always"
            value={titulo} /> 
          <TextInput 
            style={styles.input}  
            onChangeText={handleUserChange} 
            placeholder="Usuário" 
            clearButtonMode="always" 
            value={usuario}/>
            
            <Text
            style={styles.textDate}>
              Data da última atualização:
            </Text>

            <DatePicker
              format="DD/MM/YYYY"
              style={styles.dateComponent}
              date={dateAtualizacao}
              onDateChange={handleDateAtualizacaoChange}
              value={dateAtualizacao}
            />
            
            <Text
            style={styles.texQuest}>
                Responda o questionário!
            </Text>

            <TextInput 
            style={styles.inputDesc} 
            onChangeText={handleDescriptionChange} 
            placeholder="Descrição"
            multiline
            numberOfLines={3}
            clearButtonMode="always" 
            value={descricao} /> 

            <Text style={styles.inputLoc}>Localização atual: </Text>
            <Text style={styles.inputCoord}> {text} </Text>
      
  
     
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
            <AntDesign name="save" size={16} color="white" />
            <Text style={styles.buttonText}>Salvar</Text> 
          </TouchableOpacity> 
        </View>
        <StatusBar style="light" />
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#454545',
      alignItems: 'center',
    },
    texQuest:{
      color: '#49104A',
      fontSize: 22,
      marginTop: 20,
      textAlign: "center",
      fontFamily: 'Archivo_700Bold'
    },
    title: {
      color: '#fff',
      fontSize: 25,
      fontFamily: 'Archivo_700Bold',
      marginTop: 50
    },
    inputContainer: {
      flex: 1,
      marginTop: 30,
      width: '90%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'stretch',
      backgroundColor: '#fff'
    },
    textDate:{
      color: '#676767',
      fontSize: 14,
      marginTop: 10,
      fontFamily: 'Archivo_400Regular',
      borderRadius: 10,
      paddingHorizontal: 24,
    },
    input: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      fontFamily: 'Archivo_400Regular',
      alignItems: 'stretch'
    },

    inputDesc: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'stretch',
      fontFamily: 'Archivo_400Regular'
    },

    inputLoc:{
      color: '#676767',
      fontSize: 20,
      marginTop: 20,
      fontFamily: 'Archivo_400Regular',
      borderRadius: 10,
      paddingHorizontal: 24,
    },

    inputCoord:{
      color: '#676767',
      fontSize: 13,
      marginTop: 10,
      fontFamily: 'Archivo_400Regular',
      borderRadius: 10,
      paddingHorizontal: 24,
    },
    
    button: {
      marginTop: 10,
      height: 60,
      backgroundColor: '#B819FF',
      borderRadius: 10,
      paddingHorizontal: 24,
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 20,
      shadowOpacity: 20,
      shadowColor: '#ccc',
    },
    buttonText: {
      color: '#fff',
      fontFamily: 'Archivo_400Regular'
    },

    dateComponent: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: 280,
        paddingHorizontal: 24,
    }
  })