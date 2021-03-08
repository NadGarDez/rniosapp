import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
//import Absolute from 'react-native-absolute';
export default class Info extends Component {

  /*
    props:
      objDat={
        resena

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          apendice: `?${new Date().getTime()}`
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente = 20 * this.alto;
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

      },
      info:{
        width:"60%",
        height:"100%",
        "backgroundColor": "#B8B8B8",
        display:"flex",
        flexDirection:"column",
        padding:5

      },
      contenedorImagen:{
        width:"40%",
        height:"100%",
      },

      item:{
        width:"100%",
        height:"33%",
        display:"flex",
        flexDirection:"row",
        "alignItems":"center",
      },
      "attivita_ristorantePiemontese": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "#28337F",
        "fontSize": 13,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "left",

        "marginLeft": "5%",
        "paddingTop": 0,

      },
      "attivita_raggruppa37_viaBra30cherascoCn": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 15,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "left",
        "marginLeft": "5%",
        width:"80%"

      },



    }


    return (
      <View style={misEstilos.padre}>
        <View style={misEstilos.info}>

          <View style={misEstilos.item}>
            <Icon name="phone" color="black" size={20} />
            <Text style={misEstilos.attivita_raggruppa37_viaBra30cherascoCn}>{this.props.datos.telefono}</Text>
          </View>
          <View style={misEstilos.item}>
            <Icon name="map-marker" color="black" size={20} />
            <Text style={misEstilos.attivita_raggruppa37_viaBra30cherascoCn}>{this.props.datos.citta}</Text>
          </View>
        </View>
        <Image source={{uri:this.props.datos.imagine[0]+this.state.apendice}}  style={{flex:1 , width: undefined, height: undefined}} />

      </View>
    );
  }

}
