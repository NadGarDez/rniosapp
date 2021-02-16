import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import PropTypes from "prop-types";
import {Alert,StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Absolute from 'react-native-absolute';
import MapView from 'react-native-maps';
export default class Map extends Component {

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
        height:this.altoComponente,
        "display":"flex",
        "flexDirection":"row",
        "flexWrap":"wrap",
        marginTop:10,
        marginBottom:30


      },
      "hijo":{
        display:"flex",
        height:"100%",
        width:"50%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      },
      "attivita_raggruppa39_rettangolo12": {
        "opacity": 1,

        "backgroundColor": "rgba(35, 171, 224, 1)",

        "borderTopLeftRadius": 15,
        "borderTopRightRadius": 15,
        "borderBottomLeftRadius": 15,
        "borderBottomRightRadius": 15,
        "width": "80%",
        "height": "50%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"

      },
      "attivita_raggruppa36_x0172430185": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 15,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign":"center",
        marginLeft:"5%",
        marginRight:"5%"


      },
      "contenedorIcono":{
        width:"25%",
        height:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      },
      contenedorIconos:{
        display:"flex",
        height:"100%",
        width:"50%",
        flexDirection:"row",
        alignItems:"center",

      }


    }


    return (
      <View style={misEstilos.padre}>

        <MapView
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

          style={{width:200, height:300, backgroundColor:"white"}}
        >
        {/*
        <MapView.marker coordinate={this.props.datos.indirizzo.geocode}/>
        */}
        </MapView>

      </View>
    );
  }

}
