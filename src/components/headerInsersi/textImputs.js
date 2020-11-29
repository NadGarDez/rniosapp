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
export default class TextInputs extends Component {

  /*
    props:
      objDat={
        resena

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          value:""
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente =  15 * this.alto;
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
        "display":"flex",
        "flexDirection":"column",
        paddingLeft:"5%",
        paddingRight:"5%"


      },

      SectionImputText:{
        "width":"100%",
        height:this.altoComponente,
        "display":"flex",
        "flexDirection":"column",

        marginBottom:10,

      },
      SectionImputTextArea:{
        "width":"100%",
        height:this.altoComponente * 4,
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
        marginLeft:"5%",
      },
      "inserimentoAttivita_rettangolo4": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 1)",

        "width": "100%",
        "height": "60%",

      },
      "inserimentoAttivita_rettangolo42": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 1)",

        "width": "100%",
        "height": "90%",

      },
      contenedorText:{
        "width": "100%",
        "height": "40%",
        "display":"flex",
        justifyContent:"center",

      },
      contenedorText2:{
        "width": "100%",
        "height": "10%",
        "display":"flex",
        justifyContent:"center",

      }






    }
    value="";

    return (
      <View style={misEstilos.padre}>

        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Attività/Luogo</Text>
          </View>
          <View style={misEstilos.inserimentoAttivita_rettangolo4}>

           <TextInput />

          </View>

        </View>
        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Indirizzo</Text>
          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
            <TextInput
             style={{ height: "100%", width:"100%", backgroundColor:"white"}}
             onChangeText={text => {console.log(text)}}
             value={value}
            />

          </View>
        </View>
        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Città</Text>
          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
            <TextInput
             style={{ height: "100%", width:"100%", backgroundColor:"white"}}
             onChangeText={text => {console.log(text)}}
             value={value}
            />
          </View>
        </View>
        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Telefono</Text>
          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
            <TextInput
             style={{ height: "100%", width:"100%", backgroundColor:"white"}}
             onChangeText={text => {console.log(text)}}
             value={value}
            />
          </View>
        </View>
        <View style={misEstilos.SectionImputTextArea}>
          <View style={misEstilos.contenedorText2}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Descrizione (max 150 caratteri)</Text>
          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo42}>
            <TextInput
              multiline
              numberOfLines={10}
              style={{ height: "100%", width:"100%", backgroundColor:"white"}}
              onChangeText={text => {console.log(text)}}
              value={value}
            />
          </View>
        </View>


      </View>
    );
  }

}
