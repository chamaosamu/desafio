import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import * as Location from 'expo-location';
import Database from '../database/Database';


export default function AppInspect({ route, navigation}) {
  const id = route.params ? route.params.id : undefined;
  const [location, setLocationLat] = useState(null);
  const [location1, setLocationLong] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [titulo, setTitulo] = useState(null); 
  const [usuario, setUsuario] = useState(null);
  const [dateAtualizacao, setAtualizacao] = useState(null)
  const [dateQuest, setDateQuest] = useState(null);

function handleTitleChange(titulo){ setTitulo(titulo); } 
function handleUserChange(usuario){ setUsuario(usuario); }
function handleDescriptionChange(descricao){ setDescricao(descricao); }
function handleDateAtualizacaoChange(dateAtualizacao){setAtualizacao(dateAtualizacao); }
function handleDateQuestChange(dateQuest){setDateQuest(dateQuest);}
function handleLatChange(location){setLocationLat(location);}
function handleLongChange(location1){setLocationLong(location1);}

  useEffect(() => {
  
    if(!route.params) return;
    setTitulo(route.params.titulo);
    setUsuario(route.params.usuario);
    setDescricao(route.params.descricao);
    setAtualizacao(route.params.dateAtualizacao);
    setDateQuest(route.params.dateQuest);
    setLocationLat(route.params.location);
    setLocationLong(route.params.location1);

  }, [route])



const [items, setItems] = useState([]);
  
  useEffect(() => {
    Database.getItems().then(items => setItems(items));
}, [route]);

async function handleButtonPress(){ 
  const listItem = {usuario, titulo, descricao, dateAtualizacao, dateQuest, location, location1};
  Database.saveItem(listItem, id)
      .then(response => navigation.navigate("AppTab", listItem));
      navigation.reset({
        routes: [{name: 'AppTab'}]
    });
}
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      
      let location = await Location.getCurrentPositionAsync({});
      let location1 = await Location.getCurrentPositionAsync({});
      setLocationLat(location.coords.latitude);
      setLocationLong(location.coords.longitude);
      

    })();
  }, []);

  let text = 'Obtendo..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location, location1);
    
  }

    return (
      
      <View style={styles.container}>
        <Text style={styles.title}>Respostas do questionário</Text>
        <ScrollView style={styles.inputContainer}> 
            <Text
            style={styles.textDate}>
              Título:
            </Text>
        <TextInput 
            style={styles.input} 
            onChangeText={handleTitleChange}
            TextInput editable={false} 
            selectTextOnFocus={false} 
            placeholder="Título"
            clearButtonMode="always"
            value={titulo} /> 
            <Text
            style={styles.textDate}>
              Usuário:
            </Text>
          <TextInput 
            style={styles.input}  
            onChangeText={handleUserChange}
            TextInput editable={false} 
            selectTextOnFocus={false} 
            placeholder="Usuário" 
            clearButtonMode="always" 
            value={usuario}/>
            
            <Text
            style={styles.textDate}>
              Data de criação:
            </Text>

            <TextInput 
            style={styles.input}  
            onChangeText={handleDateAtualizacaoChange}
            TextInput editable={false} 
            selectTextOnFocus={false} 
            placeholder="Data" 
            clearButtonMode="always" 
            value={dateAtualizacao}
            />
            
            <Text
            style={styles.texQuest}>
                Questionário
            </Text>
            
            <Text
            style={styles.textQuestion}>
                O que está ocorrendo na sua área?
            </Text>

            <TextInput 
            style={styles.inputDesc} 
            onChangeText={handleDescriptionChange} 
            placeholder="Resposta"
            multiline
            numberOfLines={3}
            clearButtonMode="always" 
            value={descricao} 
            TextInput editable={false} 
            selectTextOnFocus={false}/> 

            <Text
            style={styles.textQuestion}>
                Data de resposta do questionário:
            </Text>

            <TextInput 
            style={styles.inputDesc} 
            onChangeText={handleDateQuestChange} 
            placeholder="Resposta"
            clearButtonMode="always" 
            value={dateQuest} 
            TextInput editable={false} 
            selectTextOnFocus={false}/> 
          

            <Text style={styles.textQuestion}>Localização atual: </Text>
            <Text 
            style={styles.textQuestion}
            onChangeText={handleLatChange} 
            value={location} 
            TextInput editable={false} 
            selectTextOnFocus={false}>
                Latitude: {location}
            </Text>
            <Text 
            style={styles.textQuestion} 
            onChangeText={handleLongChange} 
            value={location1} 
            TextInput editable={false} 
            selectTextOnFocus={false}>
                Longitude: {location1}
            </Text>

         
        </ScrollView>
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

    textQuestion:{
      color: '#49104A',
      fontSize: 16,
      marginTop: 20,
      textAlign: "left",
      paddingHorizontal: 24,
      fontFamily: 'Archivo_400Regular'
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
    text: {
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
      marginTop: 20,
      height: 70,
      backgroundColor: '#B819FF',
      borderRadius: 10,
      paddingHorizontal: 18,
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