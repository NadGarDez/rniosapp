import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, Alert,ScrollView,TouchableOpacity,TouchableHighlight, ImageBackground, Dimensions, Image,Linking} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Absolute from 'react-native-absolute';
import { Platform } from 'react-native'

export default class HeaderRecomendaciones extends Component {

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
        this.altoComponente = 30 * this.alto;
        this.altoComponente = this.altoComponente / 100;
        this.actionPress = this.actionPress.bind(this);

  }

  async actionPress(url){
    const canOpen = await Linking.canOpenURL(url);
    if(canOpen){
        await Linking.openURL(url);
    }
    else{
      Alert.alert("No se puede abrir url")
    }

  }

  render(){

    misEstilos ={
      padre:{
        "width":this.ancho,
        "height":this.altoComponente,
        "display":"flex",
        "flexDirection":"column",
        "justifyContent":"center",
        alignItems:"center",
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
        "backgroundColor": "rgba(35, 171, 224, 1)",
        "width": "100%",
        "height": "40%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      },
      "categoria_mangerEtDeguster": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
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
      "icons":{

        width:"100%",
        height:"60%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
      }

    }

    Alert.alert(typeof this.props.datos.social)
    var url = "https://www.google.com/";

    return (
      <View style={misEstilos.padre}>
        <View data-layer="853274a4-9d2a-42bc-a146-a7e83326ee0b" style={misEstilos.categoria_rettangolo10}>

              <Text data-layer="29929bd1-7479-4975-b1f2-0874ed6959eb" style={misEstilos.categoria_mangerEtDeguster}>Follow us</Text>

        </View>
        <View style={misEstilos.icons}>
          <TouchableOpacity
            onPress={
              ()=>{
                this.actionPress(this.props.datos.social.facebook);
              }
            }
          >
            <Icon name="facebook" color="rgba(35, 171, 224, 1)" size={50} style={{marginRight:"5%",marginLeft:"5%"}}/>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              ()=>{
                this.actionPress(this.props.datos.social.instagram);
              }
            }
          >
            <Icon2 name="tripadvisor" color="rgba(35, 171, 224, 1)" size={50} style={{marginRight:"5%",marginLeft:"5%"}}/>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              ()=>{
                this.actionPress(this.props.datos.social.tripadvisor);
              }
            }
          >
            <Icon name="instagram" color="rgba(35, 171, 224, 1)" size={50} style={{marginRight:"5%",marginLeft:"5%"}} />

          </TouchableOpacity>

        </View>
      </View>
    );
  }

}
