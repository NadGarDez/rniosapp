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
export default class Header extends Component {

  /*
    props:
      objDat={
        name,
        imagen

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          apendice: `?${new Date().getTime()}`
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente = 40 * this.alto;
        this.altoComponente = this.altoComponente / 100;


    }

  render(){

    misEstilos ={
      padre:{
        "width":this.ancho,
        "height":this.altoComponente,
        "display":"flex",
        "flexDirection":"column",
        marginTop:0
      },
      imageBckround:{
        height:"80%",
        width:"100%",
        display:"flex",
        flexDirection:"column-reverse",
        backgroundColor:"grey"
      },
      "categoria_rettangolo10": {
        "opacity": 1,
        "backgroundColor": "#F9F9F9",
        "width": "100%",
        "height": "20%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      },
      "categoria_mangerEtDeguster": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "#28337F",
        "fontSize": 22,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "center",
      },
      "categoria_tuAsCherche": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(220, 220, 220, 1)",
        "fontSize": 20,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "left",
        marginLeft:"5%"
      },

    }


    return (
      <View style={misEstilos.padre}>
        <View style={misEstilos.imageBckround}>
        <ImageBackground  style={{width:"100%", height:"100%",  display:"flex",flexDirection:"column-reverse"}} source={{uri:this.props.datos.imagine[1]+this.state.apendice}}>
        </ImageBackground>
        </View>
        <View data-layer="853274a4-9d2a-42bc-a146-a7e83326ee0b" style={misEstilos.categoria_rettangolo10}>

              <Text data-layer="29929bd1-7479-4975-b1f2-0874ed6959eb" style={misEstilos.categoria_mangerEtDeguster}>{this.props.datos.attivitaLuogo}</Text>

        </View>
      </View>
    );
  }

}
