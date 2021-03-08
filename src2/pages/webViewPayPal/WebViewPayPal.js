import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Dimensions, Text, View,TextInput, FlatList, Picker,Modal, Alert, ScrollView, TouchableHighlight} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import HeaderI from '~/components/headerInsersi/headerInsersi.js';
import TextInputs from '~/components/headerInsersi/textImputs.js';
import Checks from '~/components/headerInsersi/categoria.js';
import Imagenes1 from '~/components/headerInsersi/imagenes.js';
import Imagenes2 from '~/components/headerInsersi/imagenes2.js';
import Social from '~/components/headerInsersi/social.js';
import Enviar from '~/components/headerInsersi/enviar.js';
import Sfetch from "../../services/fetchManager.js";
import Prueba from '~/components/headerInsersi/prueba.js';
import Prueba2 from '~/components/headerInsersi/prueba2.js';
import base64 from 'react-native-base64'
import { WebView } from 'react-native-webview';
const scom = require("../../services/url.js");

export default class InserimentoAttivita extends Component {

  constructor(props) {
      super(props);
      this.state = {
        payed:false
      }
      this.ancho = Dimensions.get('window').width;
  }

  pagar(ambiente){
    if(ambiente == "sandbox"){
      var autenticationURL = ""
      var payURL = "";
    }

    else{


    }
  }

  _onNavigationStateChange(webViewState){
    console.log(webViewState.url)

    if(webViewState.url.indexOf("http://51.178.16.150/exitoso")== 0){
      token = webViewState.url.split("=");
      token = token[1];
      console.log(token)
      var a = new Date();
      Alert.alert("le paiement a réussi");
      try{
      this.props.saveText(true,"pagado");
      this.props.saveText(a,"fechaPago");
      }
      catch(e){

        
      }
      this.props.enviar()
      this.props.changeModalPaypal()
      this.state.payed= true;
      this.forceUpdate()


    }

    if(webViewState.url.indexOf("http://51.178.16.150/maloso")==0){

      Alert.alert("le paiement a échoué")
      this.props.saveText(false,"pagado");
      this.state.payed= false;
      this.forceUpdate()
      this.props.changeModalPaypal()
    }
  }

  handleTextInput(value, name){
    this.state[name]= value;
    this.forceUpdate()
    console.log(this.state)
  }

  getVariable(name){
    superObj={};
    for(item in this.props.variables){

      if(item == name){
        superObj = this.props.variables[item]
      }


    }

    return superObj
  }



  render() {

    pay = ()=>{
      return(
        <WebView
          source={{ uri: this.props.urlAprove }}
          style={{ marginTop: 20 , width:"100%", height:"100%"}}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          javaScriptEnabled = {true}
          domStorageEnabled = {true}
          injectedJavaScript = {this.state.cookie}
          startInLoadingState={false}
        />
      )
    }

    payed = ()=>{
      return (
        <View style={{flex:1}}>

        </View>
      )
    }
    console.log(this.props.urlAprove)
    return (

      <WebView
        source={{ uri: this.state.payed == false ? this.props.urlAprove : "https://www.google.com/" }}
        style={{ marginTop: 20 , width:this.ancho, height:"100%"}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled = {true}
        domStorageEnabled = {true}
        injectedJavaScript = {this.state.cookie}
        startInLoadingState={false}
      />
    );
  }
}
