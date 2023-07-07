import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Navegacao from './componentes/Navegacao';
import ContextoCadastro from './componentes/ContextoCadastro';

export default function App() {
  return (
    <NavigationContainer>
      <ContextoCadastro>
        <Navegacao />
      </ContextoCadastro>
    </NavigationContainer>
  );
}