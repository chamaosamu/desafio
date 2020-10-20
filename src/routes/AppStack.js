import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from './AppTab';
import AppForm from '../screens/AppForm';
import AppList from '../screens/AppList';
import AppAnswer from '../screens/AppAnswer';
import AppInspect from '../screens/AppInspect';


const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return(
        <NavigationContainer>
            <Navigator initialRouteName="AppTab" screenOptions={{ headerShown: false }}>
                <Screen name="AppAnswer" component={AppAnswer}/>
                <Screen name="AppList" component={AppList}/>
                <Screen name="AppForm" component={AppForm}/>
                <Screen name="AppInspect" component={AppInspect}/>
                <Screen name="AppTab" component={AppTab} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;


