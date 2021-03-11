import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image, Alert,TouchableOpacity} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Absolute from 'react-native-absolute';
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
        "display":"flex",
        "flexDirection":"row",
        "flexWrap":"wrap",
        alignItems:"center",
        marginTop:30,
        marginBottom:30
      },
      "contenedorImagen":{
        height:this.altoComponente,
        width:"33%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",

      },
      image:{
        height:"90%",
        width:"90%",
        borderColor:"white",
        borderWidth:1

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
      "icons":{

        width:"100%",
        height:"60%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
      }

    }


    sa = Array()

    this.props.datos.imagine.forEach((item, i) => {

      if(item.indexOf("http://51.178.16.150:3333")!= -1 && i > 1){
        sa.push(item)
      }
    });

    im = sa.map(
      (item)=>{
        let so = item+this.state.apendice;
        return(
          <TouchableOpacity style={misEstilos.contenedorImagen}
            onPress={
              ()=>{
                this.props.open(so)
              }
            }
          >
            <Image source={{uri:so}} style={misEstilos.image}/>
          </TouchableOpacity>
        )
      }
    )


    return (
      <View style={misEstilos.padre}>
        {
          im
        /*  this.props.datos.imagine.forEach((item, i) => {
            Alert.alert(item);
            //if(i>1){
              return(
                <View style={misEstilos.contenedorImagen}>
                  <Image source={{uri:item}} style={misEstilos.image}/>
                </View>
              )
            //}
          })
*/

        }
      </View>
    );
  }

}
