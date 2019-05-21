/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Component} from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import {Platform,} from 'react-native';
// import { InputAutoSuggest } from 'react-native-autocomplete-search';
// import axios from 'axios'
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import all the components we are going to use.
import Autocomplete from 'react-native-autocomplete-input';
//import Autocomplete component
 import axios from 'axios'
const API = 'https://swapi.co/api';


export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      bairro:[],films:[],query:''
    }

    // this.buscaDeEstado = this.buscaDeEstado.bind(this)
  }
  componentDidMount() {
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
    fetch(`${API}/films/`)
      .then(res => res.json())
      .then(json => {
        const { results: films } = json;
        this.setState({ films });
        //setting the data in the films state
      });
  }
  findFilm(query) {
    //method called everytime when we change the value of the input
    if (query === '') {
      //if the query is null then return blank
      return [];
    }
 
    const { films } = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input
    return films.filter(film => film.title.search(regex) >= 0);
    
  }
  // buscaDeEstado(nome){
   
  //   let url = 'https://planob.classeloc.com.br/planob/bairro/busca?idMunicipio=879&search='+nome
  //   let params = {
  //     "idMunicipio":879,
  //     "search": nome
  //   }
  //   axios.get(url)
  //   .then(response => {
  //     console.warn(response)
  //     this.setState({
  //       bairro:response.data
  //     });
  //   })


  // }
  render() {
    const { query } = this.state;
    const films = this.findFilm(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    return (
      <View style={styles.container}>
          <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={films.length === 1 && comp(query, films[0].title) ? [] : films}
          //default value if you want to set something in input
          defaultValue={query}
          /*onchange of the text changing the state of the query which will trigger
          the findFilm method to show the suggestions*/
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter the film title"
          renderItem={({ title, release_date }) => (
            //you can change the view you want to show in suggestion from here
            <TouchableOpacity onPress={() => this.setState({ query: title })}>
              <Text style={styles.itemText}>
                {title} ({release_date})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            <Text style={styles.infoText}>{this.state.query}</Text>
          ) : (
            <Text style={styles.infoText}>Enter The Film Title</Text>
          )}
        </View>
      </View>
    );
  }
}


//  <Text style={styles.welcome}>Welcome to React Native!</Text>
//  <Text style={styles.instructions}>To get started, edit App.js</Text>
//  <Text style={styles.instructions}>{instructions}</Text>
// <InputAutoSuggest
// style={{ width:30 }}
// // itemFormat={{id: 'id', name: 'nome'}}
// // staticData={
// //   [
// //     {id:'1', nome:'Paris'},
// //     {id:'2', nome: 'Pattanduru'},
// //     {id:'3', nome: 'Para'},
// //     {id:'4', nome:'London'},
// //     {id:'5', nome:'New York'},
// //     {id:'6', nome:'Berlin'}
// //   ]
// // }
// apiEndpointSuggestData={ (nome) => this.buscaDeEstado(nome)}
// onDataSelectedChange={(data) => console.warn(data)}/>      
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});