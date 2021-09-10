import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../paginas/Login';
import ServicosExtras from '../paginas/ServicosExtras';

const Stack = createStackNavigator() ;
Stack (() => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ServicosExtras" component={ServicosExtras} />
    </Stack.Navigator>
));
export default Stack ();