import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { CadastroContext } from './ContextoCadastro';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';

export default function Home() {
  const db = SQLite.openDatabase('db.MainDB');

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { alterarProduto, setBotoes } = useContext(CadastroContext);
  const { produtos, setProdutos } = useContext(CadastroContext);

  useEffect(() => {
    createTable();
    getProdutos();
  }, [isFocused]);

  const addProduto = () => {
    resetarProduto();
    navigation.navigate('Formulário');
  };

  const getProdutos = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT codigo, descricao, preco, quantidade FROM produtos',
        [],
        (tx, resultado) => {
          var temp = [];
          if (resultado.rows.length > 0) {
            for (let i = 0; i < resultado.rows.length; i++) {
              temp.push(resultado.rows.item(i));
              setProdutos(temp);
            }
          } else setProdutos([]);
        }
      );
    });
  };

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS produtos (codigo INTEGER PRIMARY KEY, descricao TEXT, preco TEXT, quantidade TEXT)'
      );
    });
  };

  const resetarProduto = () => {
    alterarProduto('', '', '', '', setBotoes(false));
  };

  function preencherForm(codigo, descricao, preco, quantidade) {
    alterarProduto(codigo, descricao, preco, quantidade, setBotoes(true));
    navigation.navigate('Formulário');
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.boxList}
        data={produtos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              preencherForm(
                item.codigo,
                item.descricao,
                item.preco,
                item.quantidade
              )
            }>
            <Text style={styles.itemLista}>
              {'[' + item.codigo + ']' + ' - ' + item.descricao}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.botao} onPress={addProduto}>
        <Text style={styles.textoBotao}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  boxList: {
    paddingTop: 5,
    paddingHorizontal: 60,
  },
  itemLista: {
    borderBottomWidth: 2,
    padding: 7,
    fontSize: 20,
  },
  botao: {
    borderRadius: 100,
    backgroundColor: 'green',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 10,
    alignSelf: 'flex-end',
  },
  textoBotao: {
    fontSize: 40,
    color: '#fff',
  },
});