import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, TouchableOpacity} from 'react-native';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';


import SignIn from '~/pages/register/register.js';

import Home from '~/pages/home/home.js';
import Categoria from '~/pages/categoria/categoria.js';

import Menu from '~/pages/menu/menu.js';

import Attivita from '~/pages/attivita/attivita.js';

import MLogin from '~/pages/menuLogin/menuLogin.js';

import InserimentoAttivita from '~/pages/inserimentoAttivita/inserimentoAttivita.js';

import Establecimiento from '~/components/establecimiento/establecimiento.js';

import Recomendaciones from "~/pages/recomendaciones/recomendaciones.js";

/*
import createNavigator from '~/routes';
import { setNavigator } from './services/navigation';
*/
export default class App extends Component {
  /*
  static propTypes = {
    auth: PropTypes.shape({
      authChecked: PropTypes.bool,
      loggedUser: PropTypes.oneOfType([null, PropTypes.object]),
    }).isRequired,
  };

  registerService = (ref) => {
    setNavigator(ref);''
  };
*/
  constructor(props){

    super(props);


    this.state={

      variables:{
        tokenLogin:{
          value:"",
          action:(value, obj)=>{

              obj.value = value;
              this.forceUpdate();

          }
        },
        user:{
          value:{},
          action:(value, obj)=>{

              obj.value = value;
              this.forceUpdate();

          }
        },

      }

    }
    this.enviar = this.enviar.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.verificarDatosGuardados= this.verificarDatosGuardados.bind(this);
    this.verificarDatosGuardados()

  }

  async verificarDatosGuardados(){
    correo = await AsyncStorage.getItem('email');
    contracena = await AsyncStorage.getItem('password');


    if((correo!=null)&&(contracena!=null)){
      this.enviar(correo,contracena);
    }
  }


  componentDidUpdate(){

  }

  async enviar(correo,contracena){
  //  console.log(this.querystring(this.state))

    //console.log(url());

    baseUrl = "http://localhost:3333";
    baseUrl+="/session";
    a = new Sfetch(baseUrl);

    try{
      b = await a.postJson({email:correo, password:contracena});
      this.handleResponse(b);

    }
    catch(error){
      console.log(error);
    }




  }

  handleResponse(response){

    if(response.token){

      user = this.state.variables.user;
      token = this.state.variables.tokenLogin;

      user.action(response.user, user);
      token.action(response.token, token);

    }

    else{

    }

  }

  getVariable(name){
    superObj={};
    for(item in this.props.variables){

      if(item == nombre){
        superObj = this.props.variables[item]
      }
      else{
        superObj=null;
      }

    }

    return superObj
  }





   HomeScreen() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      );
    }

  render() {



    const Stack = createStackNavigator();
    return(
      <NavigationContainer>
        <Stack.Navigator

        >
        <Stack.Screen name="MLogin" >
          {
            props=><MLogin {...props} variables={this.state.variables} />
          }
        </Stack.Screen>
          <Stack.Screen name="Home" >
            {
              props=><Home {...props} variables={this.state.variables} />
            }
          </Stack.Screen>

          <Stack.Screen name="SignIn" >
            {
              props=><SignIn {...props} variables={this.state.variables} />
            }
          </Stack.Screen>
          <Stack.Screen name="Menu"  >
            {
              props=><Menu {...props} variables={this.state.variables} />
            }
          </Stack.Screen>

          <Stack.Screen name="Categoria" >
            {
              props=><Categoria {...props} variables={this.state.variables} />
            }
          </Stack.Screen>
          <Stack.Screen name="Attivita" >
            {
              props=><Attivita {...props} variables={this.state.variables} />
            }
          </Stack.Screen>
          <Stack.Screen name="Recomendaciones" >
            {
              props=><Recomendaciones {...props} variables={this.state.variables} />
            }
          </Stack.Screen>
            <Stack.Screen name="Establecimiento" >
              {
                props=><Establecimiento {...props} variables={this.state.variables} />
              }
            </Stack.Screen>

            <Stack.Screen name="InserimentoAttivita" >
              {
                props=><InserimentoAttivita {...props} variables={this.state.variables} />
              }
            </Stack.Screen>
          {/*
          <Stack.Screen name="SignIn" component={SignIn} />



          <Stack.Screen name="Attivita" component={Attivita} />
          <Stack.Screen name="MLogin" component={MLogin} />
          <Stack.Screen name="InserimentoAttivita" component={InserimentoAttivita} />
          <Stack.Screen name="Establecimiento" component={Establecimiento} />
          <Stack.Screen name="Recomendaciones" component={Recomendaciones} />
          */}
        </Stack.Navigator>
      </NavigationContainer>
    )

    /*
    const { auth } = this.props;
    console.log(auth);
    if (!auth.authChecked) return null;

    const Routes = createNavigator(!!auth.loggedUser);

    return <Routes ref={this.registerService} />;

*/



  }
}
/*
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);
*/
