import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Absolute from 'react-native-absolute';
export default class Content extends Component {

  /*
    props:
      objDat={
        resena

      }


  */

  constructor(props) {
        super(props);
        this.state = {

        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente = 50 * this.alto;
        this.altoComponente = this.altoComponente / 100;


    }

  render(){

    misEstilos ={
      padre:{
        "width":this.ancho,
        "display":"flex",
        "flexDirection":"row",
        "flexWrap":"wrap",
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        marginBottom:30
      },
      "attivita_raggruppa38_rettangolo13": {
        "opacity": 1,

        "backgroundColor": "rgba(220, 220, 220, 1)",
        "height":"auto",
        "width": "95%",
        "padding":10,
        "flexDirection":"row",
        borderLeftSyle:"solid",
        borderLeftWidth:5,
        borderLeftColor:"rgba(35, 171, 224, 1)"

      },

      "texto":{
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 13,
        "fontWeight": "300",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "left",

      }


    }


    return (
      <View style={misEstilos.padre}>
        <View data-layer="61b17af9-c036-4d19-b685-d2682b567765" style={misEstilos.attivita_raggruppa38_rettangolo13}>
          <Text>{this.props.datos.resena}</Text>
        </View>
      </View>
    );
  }

}
