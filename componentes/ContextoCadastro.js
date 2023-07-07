import React, { createContext, useState } from 'react';

export const CadastroContext = createContext({});

import * as SQLite from 'expo-sqlite';

export default function ContextoCadastro({ children }) {
  const db = SQLite.openDatabase('db.MainDB');

  const [produtos, setProdutos] = useState([]);
  const [botoes, setBotoes] = useState(false);

  function alterarProduto(setCodigo, setDescricao, setPreco, setQuantidade) {
    setProdutos({
      codigo: setCodigo.toString(),
      descricao: setDescricao,
      preco: setPreco,
      quantidade: setQuantidade,
    });
  }
  return (
    <CadastroContext.Provider
      value={{
        produtos,
        setProdutos,
        alterarProduto,
        botoes,
        setBotoes,
      }}>
      {children}
    </CadastroContext.Provider>
  );
}
