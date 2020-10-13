import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 

import AppList from '../screens/AppList';
import AppForm from '../screens/AppForm';
 
const {Navigator, Screen} = createBottomTabNavigator();
 
function AppTab(){
    return (
        <NavigationContainer>
            <Navigator
                tabBarOptions={{
                    style: {
                        elevation: 0,
                        shadowOpacity: 0,
                        height: 64,
                    },
                    tabStyle: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    labelStyle: {
                        fontSize: 14,
                        fontFamily: 'Archivo_700Bold',
                        marginLeft: 16
                    },
                    inactiveBackgroundColor: '#8D30E6',
                    activeBackgroundColor: '#A78DFE',
                    inactiveTintColor: '#fff',
                    activeTintColor: '#fff'
                }}
            >
                <Screen name="AppList" component={AppList} options={{
                    tabBarLabel: "Questionários"
                    }}
                />
                
                <Screen name="AppForm" component={AppForm} options={{
                    tabBarLabel: "Adicionar"
                    }}
                />

            </Navigator>
        </NavigationContainer>
    );
}
 
export default AppTab;