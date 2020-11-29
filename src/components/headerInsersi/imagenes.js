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

export default class Imagenes extends Component {

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
        this.altoComponente =  10 * this.alto;
        this.altoComponente = this.altoComponente / 100;


    }

    sizes(ancho="auto", alto="auto"){
      obj={
        width:ancho,
        height:alto
      }
      return obj;

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

      flexRow:{
        display:"flex",
        flexDirection:"row"
      },

      flexRowWrap:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap"
      },

      flexColumn:{
        display:"flex",
        flexDirection:"column"
      },

      flexPerfectCenter:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      },

      flexVerticalCenter:{
        display:"flex",

        alignItems:"center"
      },
      flexHorizontalCenter:{

        display:"flex",
        justifyContent:"center",

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
        marginLeft:"5%",
      },
      "inserimentoAttivita_rettangolo4": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 1)",

        "width": "100%",
        "height": "60%",

      },
      contenedorText:{
        "width": "100%",
        "height": "40%",
        "display":"flex",
        justifyContent:"center",
        backgroundColor:"red"

      },

      "inserimentoAttivita_immagineProfilo": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(0, 0, 0, 1)",
        "fontSize": 14,
        "fontWeight": "300",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "left",

      },
      "inserimentoAttivita_raggruppa46_rettangolo12dccae145": {
        "opacity": 1,
        "backgroundColor": "rgba(35, 171, 224, 1)",

        "width": "50%",
        "height": "50%",
      },

      "inserimentoAttivita_raggruppa46_charger5677960c": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 15,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "center",

      },

      "inserimentoAttivita_rettangolo35": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "rgba(35, 171, 224, 1)",

        "width": "100%",
        "height": "50%",

      },

      "inserimentoAttivita_caricamentoImmagini": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(220, 220, 220, 1)",
        "fontSize": 15,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "center",

      },






    }
    value= this.altoComponente*2;

    return (
      <View style={[misEstilos.flexColumn,this.sizes("100%")]}>

        <View style={[misEstilos.flexPerfectCenter, this.sizes("100%",this.altoComponente)]}>

          <View style={[misEstilos.inserimentoAttivita_rettangolo35, misEstilos.flexPerfectCenter]}>

            <Text style={misEstilos.inserimentoAttivita_caricamentoImmagini}>Caricamento Immagini</Text>

          </View>

        </View>
        <View style={[misEstilos.flexRowWrap, this.sizes("100%",value), {paddingLeft:"5%",paddingLeft:"5%"}]}>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Profilo</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("50%","50%")]}>

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text>Charger</Text>

            </View>

          </View>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Copertina</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("50%","50%")]}>

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text>Charger</Text>

            </View>

          </View>
        </View>

      </View>
    );
  }

}
