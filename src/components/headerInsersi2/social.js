import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, View, TextInput,Alert,FlatList,Linking,Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
//import Absolute from 'react-native-absolute';

export default class Social extends Component {

  /*
    props:
      objDat={
        resena//

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          social:{
            facebook:"https://www.youtube.com/watch?v=rsMVS_CglL8",
            instagram:"https://www.youtube.com/watch?v=rsMVS_CglL8",
            tripadvisor:"https://www.youtube.com/watch?v=rsMVS_CglL8"
          },
          inputs:{
            input1:{
              validateStatus:"default",
              messaje:""
            },
            input2:{
              validateStatus:"default",
              messaje:""
            },
            input3:{
              validateStatus:"default",
              messaje:""
            }

          }
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente =  15 * this.alto;
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

    enviarValidacion(){
      let v = true;
      for(i in this.state.inputs){
        if(this.state.inputs[i].validateStatus=="no navegable"){
          v = false;
          break;
        }
      }
      this.props.saveValidacion(v,"social");
    }

    color(a){
      let retorno = ""
      switch (a) {
        case "default":
          retorno = "white"
        break;

        case "navegable":
          retorno = "white"
        break;

        case "no navegable":
          retorno = "red"
        break;

      }
      return retorno
    }


  render(){

    let v1 = ""
    let v2 = ""
    let v3 = ""
    try{

      v1 = this.props.b[0].social.facebook;
      v2 = this.props.b[0].social.instagram;
      v3 = this.props.b[0].social.tripadvisor;

      this.props.saveText(this.props.b[0].social,"social")
    }
    catch(e){


      v1 = null
      v2 = null
      v3 = null
    }

    misEstilos ={
      padre:{
        "width":this.ancho,
        "display":"flex",
        "flexDirection":"column",


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
        paddingLeft:"5%",
        paddingRight:"5%",
        marginBottom:5,

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

        "backgroundColor": "#28337F",

        "width": "100%",
        "height": "50%",

      },

      "inserimentoAttivita_caricamentoImmagini": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "#F9F9F9",
        "fontSize": 15,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "center",

      },

      "inserimentoAttivita_galleriaMax9Immagini": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 14,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "center",
      },




    }
    value= this.altoComponente*3;
    value2= this.altoComponente*4;
    const color1 = this.color(this.state.inputs.input1.validateStatus);
    const color2 = this.color(this.state.inputs.input2.validateStatus);
    const color3 = this.color(this.state.inputs.input3.validateStatus);
    return (
      <View style={[misEstilos.flexColumn,this.sizes("100%",value2)]}>

        <View style={[misEstilos.flexPerfectCenter, this.sizes("100%",this.altoComponente)]}>

          <View style={[misEstilos.inserimentoAttivita_rettangolo35, misEstilos.flexPerfectCenter]}>

            <Text style={misEstilos.inserimentoAttivita_caricamentoImmagini}>sociale</Text>

          </View>

        </View>
        <View style={[misEstilos.flexRowWrap, this.sizes("100%",value), {boxSizing:"border-box"}]}>

          <View style={misEstilos.SectionImputText}>
            <View style={misEstilos.contenedorText}>
              <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Facebook</Text>
            </View>
            <View style={misEstilos.inserimentoAttivita_rettangolo4}>

             <TextInput style={{backgroundColor:"white", borderStyle:"solid",borderColor: color1, borderWidth:1}}
                value={this.state.social.facebook!= null? this.state.social.facebook : v1}
               onChangeText={
                 (text)=>{
                   this.state.social.facebook = text;
                   this.forceUpdate();
                   this.props.saveText(this.state.social,"social")
                 }
               }

               onBlur={
                async ()=>{


                   if(this.state.social.facebook ==""){
                     this.state.inputs.input1.validateStatus = "empty input"
                     this.state.inputs.input1.message = "questo ingresso non può essere vuoto"
                     this.forceUpdate()
                   }
                   else{
                      const canOpen = await Linking.canOpenURL(this.state.social.facebook);
                      if(canOpen == false){
                        this.state.inputs.input1.validateStatus = "no navegable"
                        this.state.inputs.input1.message = "type a real url"
                        this.forceUpdate()
                      }

                      else{
                        this.state.inputs.input1.validateStatus = "navegable"
                        this.forceUpdate()
                      }

                   }

                   this.enviarValidacion()
                 }


               }

               onFocus={
                 ()=>{

                     if(this.state.social.facebook =="" || this.state.inputs.input1.validateStatus != "default"){
                        this.state.inputs.input1.validateStatus = "default"
                        this.state.inputs.input1.message = ""
                        this.forceUpdate();
                     }
                   //this.props.navigation.navigate("cittaI",{saveText:this.props.saveText})
                 }
               }



             />

            </View>
            <Text style={{color:"red"}}>{this.state.inputs.input1.message}</Text>

          </View>

          <View style={misEstilos.SectionImputText}>
            <View style={misEstilos.contenedorText}>
              <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Instagram</Text>
            </View>
            <View style={misEstilos.inserimentoAttivita_rettangolo4}>

             <TextInput style={{backgroundColor:"white", borderStyle:"solid",borderColor: color2, borderWidth:1}}
             value={this.state.social.instagram!= null? this.state.social.instagram : v2}
               onChangeText={
                 (text)=>{
                   this.state.social.instagram = text;
                   this.forceUpdate();
                   this.props.saveText(this.state.social,"social")
                 }
               }

               onBlur={
                 async ()=>{


                    if(this.state.social.instagram ==""){
                      this.state.inputs.input2.validateStatus = "empty input"
                      this.state.inputs.input2.message = "questo ingresso non può essere vuoto"
                      this.forceUpdate()
                    }
                    else{
                       const canOpen = await Linking.canOpenURL(this.state.social.instagram);
                       if(canOpen == false){
                         this.state.inputs.input2.validateStatus = "no navegable"
                         this.state.inputs.input2.message = "type a real url"
                         this.forceUpdate()
                       }
                       else{
                         this.state.inputs.input2.validateStatus = "navegable"
                         this.forceUpdate()
                       }

                    }

                    this.enviarValidacion()
                  }
                }

                onFocus={
                  ()=>{

                      if(this.state.social.instagram =="" || this.state.inputs.input1.validateStatus != "default"){
                         this.state.inputs.input2.validateStatus = "default"
                         this.state.inputs.input2.message = ""
                         this.forceUpdate();
                      }
                    //this.props.navigation.navigate("cittaI",{saveText:this.props.saveText})
                  }
                }


             />

            </View>
            <Text style={{color:"red"}}>{this.state.inputs.input2.message}</Text>

          </View>

          <View style={misEstilos.SectionImputText}>
            <View style={misEstilos.contenedorText}>
              <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Tripadvisor</Text>
            </View>
            <View style={misEstilos.inserimentoAttivita_rettangolo4}>

             <TextInput style={{backgroundColor:"white", borderStyle:"solid",borderColor: color3, borderWidth:1}}
             value={this.state.social.tripadvisor!= null? this.state.social.tripadvisor : v3}
               onChangeText={
                 (text)=>{
                   this.state.social.tripadvisor = text;
                   this.forceUpdate();
                   this.props.saveText(this.state.social,"social")
                 }
               }

               onBlur={
                 async ()=>{


                    if(this.state.social.tripadvisor ==""){
                      this.state.inputs.input3.validateStatus = "empty input"
                      this.state.inputs.input3.message = "questo ingresso non può essere vuoto"
                      this.forceUpdate()
                    }
                    else{


                       const canOpen = await Linking.canOpenURL(this.state.social.tripadvisor);

                       if(canOpen== false){
                         this.state.inputs.input3.validateStatus = "no navegable"
                         this.state.inputs.input3.message = "type a real url"
                         this.forceUpdate()
                       }
                       else{
                         this.state.inputs.input3.validateStatus = "navegable"
                         this.forceUpdate()
                       }

                    }

                    this.enviarValidacion()
                  }

               }

               onFocus={
                 ()=>{

                     if(this.state.social.tripadvisor ==""){
                        this.state.inputs.input3.validateStatus = "default"
                        this.state.inputs.input3.message = ""
                        this.forceUpdate();
                     }
                   //this.props.navigation.navigate("cittaI",{saveText:this.props.saveText})
                 }
               }

               />

            </View>
            <Text style={{color:"red"}}>{this.state.inputs.input3.message}</Text>
          </View>

        </View>
      </View>
    );
  }

}
