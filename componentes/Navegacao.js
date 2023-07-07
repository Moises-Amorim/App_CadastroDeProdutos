import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Form from './Form';

const Stack = createNativeStackNavigator();

function Navegacao() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Formulário" component={Form} />
    </Stack.Navigator>
  );
}

export default Navegacao;