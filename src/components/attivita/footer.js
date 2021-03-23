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
export default class Footer extends Component {

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
        this.altoComponente = 55 * this.alto;
        this.altoComponente = this.altoComponente / 100;
        this.imgW = this.ancho / 2
        this.imgH = this.imgH / 2




              this.anchoC2 = 45 * this.ancho;
              this.anchoC2 = this.anchoC2 / 100;
              this.imgH2 = 27*this.anchoC2
              this.imgH2 = this.imgH2/100



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
        marginTop:0,
          "backgroundColor": "rgba(25, 25, 25, 1)",
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
        "height": "70%",
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
        "fontFamily": "Montserrat-Regular",
        "textAlign": "center",
      },
      "categoria_tuAsCherche": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(220, 220, 220, 1)",
        "fontSize": 20,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat-Regular",
        "textAlign": "left",
        marginLeft:"5%"
      },

      "register_raggruppa14_tracciato36": {
        "opacity": 1,

        "width": "10%",
        "height": "30%"

      },
      "home_raggruppa9_tracciato13f5eeb4ec": {
        "opacity": 1,
        "width": "5%",
        "height": "50%",
        marginTop:10

      },
      "register_rettangolo14": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(220, 220, 220, 1)",

        "width": "100%",
        "height": "100%",

      },

    }


    return (
      <View style={misEstilos.padre}>
        <View data-layer="16a0e816-7c20-4c60-8f73-fcaeaf03bf47" style={misEstilos.register_rettangolo14}>
          <View style={{width:"100%", height:"60%", display:"flex", flexDirection:"row"}}>
            <View style={{width:"100%", height:"100%",display:"flex",alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
              <Image source={require("~/pages/register/assets/logo.png")}  style={{width:200,height:100,resizeMode:"stretch"}}/>
            </View>
            {/*<View style={{width:"50%", height:"100%",display:"flex",alignItems:"center", justifyContent:"center",flexDirection:"row"}}>
              <Image source={require("~/pages/register/assets/adveraLogo.png")}  style={{width:this.anchoC2,height:this.imgH2,resizeMode:"stretch"}}/>
            </View>*/}
          </View>
          <View style={{width:"100%", height:"40%", display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <Image source={require("~/pages/register/assets/costaLogo2.png")}  style={{width:200,height:25,resizeMode:"stretch"}}/>
          </View>
        </View>
      </View>
    );
  }

}
