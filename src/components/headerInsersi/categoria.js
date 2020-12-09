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
import CheckBox from '@react-native-community/checkbox';
//import Absolute from 'react-native-absolute';
export default class Checks extends Component {

  /*
    props:
      objDat={
        resena

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          categoria1:false,
          categoria2:false,
          categoria3:false,
          categoria4:false
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente =  30 * this.alto;
        this.altoComponente = this.altoComponente / 100;


    }


    changeValueImputs(value){
      this.state.value=value;
      this.forceUpdate();
    }

  render(){

    misEstilos ={
      padre:{
        "width":this.ancho,
        height:this.altoComponente,
        "display":"flex",
        "flexDirection":"row",
        flexWrap:"wrap"


      },

      "contenedorText":{
        height:"10%",
        width:"100%",
        "display":"flex",
        "flexDirection":"row",
        alignItems:"center",
        paddingLeft:"5%",
        paddingRight:"5%"


      },

      contenedorCheck:{
        height:"90%",
        width:"100%",
        "display":"flex",
        "flexDirection":"row",
        flexWrap:"wrap"
      },

      SectionImputCheck:{
        "width":"50%",
        height:"50%",
        "display":"flex",
        "flexDirection":"row",
        justifyContent:"center",
        alignItems:"center"

      },
      SectionImputTextArea:{
        "width":"100%",
        height:this.altoComponente * 5,
        "display":"flex",
        "flexDirection":"column",
        "flexWrap":"wrap",
        marginBottom:10,


      },
      "inserimentoAttivita_attivitaluogo": {
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
      "inserimentoAttivita_rettangolo4": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 1)",

        "width": "100%",
        "height": "80%",

      },






    }
    value="";

    return (
      <View style={misEstilos.padre}>
        <View style={misEstilos.contenedorText}>
          <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>hola</Text>
        </View>
        <View style={misEstilos.contenedorCheck}>
          <View style={misEstilos.SectionImputCheck}>
            <Text>Manger</Text>
            <CheckBox

              onValueChange={(newValue) => {
                  this.state.categoria1=newValue;
                  this.forceUpdate()
                  this.props.saveCheck(newValue,"categoria1")
              }}

              value={this.state.categoria1}
            />
          </View>
          <View style={misEstilos.SectionImputCheck}>
            <Text>Visiter</Text>
            <CheckBox
              onValueChange={(newValue) => {
                  this.state.categoria2=newValue;
                  this.forceUpdate()
                  this.props.saveCheck(newValue,"categoria2")
              }}

              value={this.state.categoria2}
            />
          </View>
          <View style={misEstilos.SectionImputCheck}>
            <Text>S'amuser</Text>
            <CheckBox
              onValueChange={(newValue) => {
                  this.state.categoria3=newValue;
                  this.forceUpdate()
                  this.props.saveCheck(newValue,"categoria3")
              }}

              value={this.state.categoria3}
            />
          </View>
          <View style={misEstilos.SectionImputCheck}>
            <Text>Dormir</Text>
            <CheckBox
              onValueChange={(newValue) => {
                  this.state.categoria4=newValue;
                  this.forceUpdate()
                  this.props.saveCheck(newValue,"categoria4")
              }}

              value={this.state.categoria4}
            />
          </View>
        </View>


      </View>
    );
  }

}
