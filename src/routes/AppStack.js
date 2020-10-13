import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AppTab from '../routes/AppTab';

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
    return(
        <NavigationContainer>
            <Navigator initialRouteName="AppTab"screenOptions={{ headerShown: false }}>
                <Screen name="AppTab" component={AppTab} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;
