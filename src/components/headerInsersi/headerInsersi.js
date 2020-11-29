import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
//import Absolute from 'react-native-absolute';
export default class HeaderI extends Component {

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
        this.altoComponente = 20 * this.alto;
        this.altoComponente = this.altoComponente / 100;


    }

  render(){

    misEstilos ={
      padre:{
        "width":this.ancho,
        height:this.altoComponente,
        "display":"flex",
        "flexDirection":"column",
        "flexWrap":"wrap",


      },

      "userSection":{
        height:"50%",
        width:"100%",
        display:"flex",
        flexDirection:"row",
        paddingLeft:"5%",
        alignItems:"center"

      },
      titleSection:{
        height:"50%",
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"

      },
      "inserimentoAttivita_pincoPallino": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(0, 0, 0, 1)",
        "fontSize": 12,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "left",
        marginLeft:"5%"

      },
      "inserimentoAttivita_inserimentoAttivita3378703d": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 22,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "center",

      },


    }


    return (
      <View style={misEstilos.padre}>
        <View style={misEstilos.userSection}>
          <Icon6 name="user" color="rgba(35, 171, 224, 1)" size={20} />
          <Text style={misEstilos.inserimentoAttivita_pincoPallino}>{this.props.datos.nameUser}</Text>
        </View>
        <View style={misEstilos.tittleSection}>
          <Text style={misEstilos.inserimentoAttivita_inserimentoAttivita3378703d}>Inserimento Attività</Text>
        </View>
      </View>
    );
  }

}
