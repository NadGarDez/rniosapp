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
        this.altoComponente = 30 * this.alto;
        this.altoComponente = this.altoComponente / 100;


    }

  render(){

    misEstilos ={
      padre:{
        "width":this.ancho,
        height:this.altoComponente,
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

        "backgroundColor": "#B8B8B8",
        "height":"100%",
        "width": "95%",
        "padding":10,
        "flexDirection":"row",
        borderLeftSyle:"solid",
        borderLeftWidth:5,
        borderLeftColor:"#E09423"

      },

      "texto":{
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 13,
        "fontWeight": "300",
        "fontStyle": "normal",
        "fontFamily": "Montserrat-Regular",
        "textAlign": "left",

      }


    }


    return (
      <View style={misEstilos.padre}>
        <View data-layer="61b17af9-c036-4d19-b685-d2682b567765" style={misEstilos.attivita_raggruppa38_rettangolo13}>
          <Text>{this.props.datos.descrizione}</Text>
        </View>
      </View>
    );
  }

}
