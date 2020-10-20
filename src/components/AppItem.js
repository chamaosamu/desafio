import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons'; 

import Database from '../database/Database';

 
export default function AppItem(props){

    async function handleEditPress(){ 
        const item = await Database.getItem(props.id);
        props.navigation.navigate("AppInspect", item);
    }

    async function handleAnswerPress(){ 
        const item = await Database.getItem(props.id);
        props.navigation.navigate("AppAnswer", item);
    }

    function handleDeletePress(){ 
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja excluir este item?",
            [
                {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
                },
                { text: "Sim", onPress: () => {
                        Database.deleteItem(props.id)
                            .then(response => props.navigation.navigate("AppList", {id: props.id}));
                    }
                }
            ],
            { cancelable: false }
            );
    }

    return (
        <View style={styles.container}>
          <Text style={styles.textItem}>{props.item}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress} > 
            <Feather name="trash" size={16} color="white" />
            </TouchableOpacity> 
            <TouchableOpacity style={styles.inspectButton} onPress={handleEditPress}> 
            <Feather name="eye" size={16} color="white" />            
            </TouchableOpacity> 
            <TouchableOpacity style={styles.editButton} onPress={handleAnswerPress}> 
                <Text style={styles.buttonText}>Responder</Text> 
            </TouchableOpacity> 
          </View>
        </View>
      );
}



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 20,
      width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: '#4B0082',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    inspectButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: '#A020F0',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Archivo_400Regular'
    },
    textItem: {
        fontSize: 25,
        alignContent: 'flex-end',
        fontSize: 25,
        fontFamily: 'Archivo_400Regular',
    },
  });