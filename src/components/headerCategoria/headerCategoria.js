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
export default class HeaderCategoria extends Component {

  /*
    props:
      objDat={
        tit,
        subtit,
        imagen

      }


  */

  constructor(props) {
        super(props);
        this.state = {

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
        backgroundColor:"red"
      },
      "categoria_rettangolo10": {
        "opacity": 1,
        "backgroundColor": "#28337F",
        "width": "100%",
        "height": "20%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      },
      "categoria_mangerEtDeguster": {
        "opacity": 1,
        "backgroundColor": "#28337F",
        "color": "#F9F9F9",
        "fontSize": 22,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat-Regular",
        "textAlign": "center",
      },
      "categoria_tuAsCherche": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "#28337F",
        "fontSize": 20,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat-Regular",
        "textAlign": "left",
        marginLeft:"5%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      },

    }


    return (
      <View style={misEstilos.padre}>
        <View style={misEstilos.imageBckround}>
        <ImageBackground  style={{width:"100%", height:"100%",  display:"flex",flexDirection:"column-reverse"}} source={this.props.datos.imagen2}>
        <View style={{height:"25%",backgroundColor:"#F9F9F9",opacity:0.5}}>
          <Text data-layer="912d89a8-160a-4969-b032-9c5695d47c39" style={misEstilos.categoria_tuAsCherche}>{this.props.datos.subtit}</Text>
          </View>
        </ImageBackground>
        </View>
        <View data-layer="853274a4-9d2a-42bc-a146-a7e83326ee0b" style={misEstilos.categoria_rettangolo10}>

              <Text data-layer="29929bd1-7479-4975-b1f2-0874ed6959eb" style={misEstilos.categoria_mangerEtDeguster}>{this.props.datos.tit}</Text>

        </View>
      </View>
    );
  }

}
