import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, TouchableOpacity} from 'react-native';

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
  static propTypes = {
    auth: PropTypes.shape({
      authChecked: PropTypes.bool,
      loggedUser: PropTypes.oneOfType([null, PropTypes.object]),
    }).isRequired,
  };

  registerService = (ref) => {
    setNavigator(ref);
  };

  constructor(props){

    super(props);

    this.state={
/*
      variables:{
        login:[
          false,
          (newValue)=>{
            this.state.variables.login[0]= newValue;
            this.forceUpdate();
          }
        ]
      }
*/
    }

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
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Menu"  component={Menu} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Categoria" component={Categoria} />
          <Stack.Screen name="Attivita" component={Attivita} />
          <Stack.Screen name="Recomendaciones" component={Recomendaciones} />
            <Stack.Screen name="Establecimiento" component={Establecimiento} />
            <Stack.Screen name="MLogin" component={MLogin} />
            <Stack.Screen name="InserimentoAttivita" component={InserimentoAttivita} />
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
