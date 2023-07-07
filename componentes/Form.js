import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { CadastroContext } from './ContextoCadastro';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

export default function Form() {
  const db = SQLite.openDatabase('db.MainDB');
  const navigation = useNavigation();
  const { produtos, botoes } = useContext(CadastroContext);

  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    setCodigo(produtos.codigo);
    setDescricao(produtos.descricao);
    setPreco(produtos.preco);
    setQuantidade(produtos.quantidade);
  }, []);

  const adicionarProduto = async () => {
       if(codigo != '' && descricao != '' && preco != '' && quantidade  != ''){
        await db.transaction(async (tx) => {
          await tx.executeSql(
            'INSERT INTO produtos (codigo, descricao, preco, quantidade) VALUES (?, ?, ?, ?)',
            [codigo, descricao, preco, quantidade],
            (tx, resultado) => {
              if (resultado.rowsAffected > 0) {
                console.log('Dados gravados com sucesso!! :)');
              } else {
                console.log('Falha na gravação dos dados :(');
              }
            }
          );
          
      });
      navigation.navigate('Home');
      }else{
          alert('Favor preencher todos os campos.')
     }
  };

  const editarProduto = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE produtos SET descricao=?, preco=?, quantidade=? WHERE codigo=?',
        [descricao, preco, quantidade, codigo],
        (tx, resultado) => {
          if (resultado.rowsAffected > 0) {
            console.log('Produto alterado com sucesso!');
          } else {
            console.log('Ocorreu um erro!');
          }
        }
      );
    });
    navigation.navigate('Home');
  };

  const deletarProduto = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM produtos WHERE codigo =?',
        [codigo],
        (tx, resultado) => {
          if (resultado.rowsAffected > 0) {
            console.log('Produto deletado!');
          } else {
            console.log('Ocorreu um erro!');
          }
        }
      );
    });
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled={true}>
      <ScrollView style={{ width: '100%' }}>
        <TextInput
          style={styles.entrada}
          editable={!botoes ? (true) : false}
          placeholderTextColor="#FFF"
          placeholder="Código"
          value={codigo}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setCodigo(valor);
          }}
        />
        

        <TextInput
          style={styles.entrada}
          placeholderTextColor="#FFF"
          placeholder="Descrição"
          value={descricao}
          onChangeText={(valor) => {
            setDescricao(valor);
          }}
        />

        <TextInput
          style={styles.entrada}
          placeholderTextColor="#FFF"
          placeholder="Preço"
          value={preco}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setPreco(valor);
          }}
        />

        <TextInput
          style={styles.entrada}
          placeholderTextColor="#FFF"
          placeholder="Quantidade"
          value={quantidade}
          keyboardType="numeric"
          onChangeText={(valor) => {
            setQuantidade(valor);
          }}
        />
        {!botoes ? (
          <TouchableOpacity style={styles.botao} onPress={adicionarProduto}>
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>
        ) : null}
        {botoes ? (
          <TouchableOpacity style={styles.botao} onPress={editarProduto}>
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>
        ) : null}
        {botoes ? (
          <TouchableOpacity style={styles.botao} onPress={deletarProduto}>
            <Text style={styles.textoBotao}>Apagar</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '90%',
    justifyContent: 'center',
    alignItens: 'center',
    backgroundColor: '#1D1E18',
    padding: 8,
  }, entrada: {
    width: '90%',
    alignSelf: 'center',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#6B8F71',
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
  }, botao: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#6B8F71',
    marginBottom: 10,
    padding: 10,
  }, textoBotao: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});