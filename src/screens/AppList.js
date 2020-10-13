import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AppItem from '../components/AppItem';
import Database from '../database/Database';

export default function AppList({ route, navigation }) {

  const [items, setItems] = useState([]);
  
  useEffect(() => {
    Database.getItems().then(items => setItems(items));
}, [route]);

  return (
    <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>Questionários</Text>
        <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
            { items.map(item => {
                return <AppItem key={item.id} id={item.id} item={item.titulo} navigation={navigation} />
            }) }
        </ScrollView>
    </View>
    );
}


 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Archivo_700Bold',
    marginTop: 50,
    marginBottom: 20
  },
  scrollContainer: {
    flex: 1,
    width: '85%'
  },
  itemsContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
});