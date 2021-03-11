import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, View, TextInput, FlatList,Alert, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Prueba from "./prueba.js";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import Absolute from 'react-native-absolute';
export default class TextInputs extends Component {

  /*
    props:
      objDat={//
        resena

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          inputs:{
            input1:{
              currentValue:null,
              validateStatus:"default",
              message:""
            },
            input2:{
              currentValue:null,
              validateStatus:"default",
              message:""
            },
            input3:{
              currentValue:null,
              validateStatus:"default",
              message:""
            },
            input4:{
              currentValue:null,
              validateStatus:"default",
              message:""
            },
            input5:{
              currentValue:null,
              validateStatus:"default",
              message:""
            },

          }
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente =  15 * this.alto;
        this.altoComponente = this.altoComponente / 100;


    }

    componentWillUpdate(){





    }


    changeValueImputs(value){
      this.state.value=value;
      this.forceUpdate();
    }

    enviarValidacion(){

      if((this.state.inputs.input1.currentValue!="")&&(this.props.dataIndirizo!="")&&(this.props.dataCitta!="")&&(this.state.inputs.input4.currentValue!="")&&(this.state.inputs.input5.currentValue!="")){
        this.props.saveValidacion(true, "inputText");
      }
      else{
        this.props.saveValidacion(false, "inputText");
      }

    }

  render(){

    var ref1 = React.createRef()
    var ref2 = React.createRef()

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
        "fontFamily": "Montserrat-Regular",
        "textAlign": "left",
        marginLeft:"5%",
        marginRight:"5%"
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
    const color1 = this.state.inputs.input1.validateStatus == "empty input" ? "red" : "white";
    const color2 = this.state.inputs.input2.validateStatus == "empty input" ? "red" : "white";
    const color3 = this.state.inputs.input3.validateStatus == "empty input" ? "red" : "white";
    const color4 = this.state.inputs.input4.validateStatus == "empty input" ? "red" : "white";
    const color5 = this.state.inputs.input5.validateStatus == "empty input" ? "red" : "white";


    let v1 = ""
    let v2 = ""
    let v3 = ""
    let v4 = ""
    let v5 = ""
    try{
      if(this.state.inputs.input1.currentValue == null && this.state.inputs.input2.currentValue == null && this.state.inputs.input3.currentValue == null && this.state.inputs.input4.currentValue == null && this.state.inputs.input5.currentValue == null && this.props.b!={}){
        this.state.inputs.input1.currentValue = this.props.b[0].attivitaLuogo
        this.props.saveText(this.props.b[0].attivitaLuogo,"attivitaLuogo")
        this.state.inputs.input4.currentValue = this.props.b[0].telefono;
        this.props.saveText(this.props.b[0].telefono,"telefono")
        this.state.inputs.input5.currentValue = this.props.b[0].descrizione;
        this.props.saveText(this.props.b[0].descrizione,"descrizione")
        this.props.b[0].indirizzo = JSON.parse(this.props.b[0].indirizzo)
        this.state.inputs.input2.currentValue = this.props.b[0].indirizzo.data;
        this.state.inputs.input3.currentValue = this.props.b[0].citta;
        this.forceUpdate()
      }

    }
    catch(e){

    }

    return (
      <View style={misEstilos.padre}>

        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Attività/Luogo</Text>

          </View>
          <View style={misEstilos.inserimentoAttivita_rettangolo4}>

           <TextInput
             style={{ height: "100%", width:"100%", backgroundColor:"white", borderStyle:"solid",borderColor: color1, borderWidth:1}}
             value={this.state.inputs.input1.currentValue}
             onChangeText={
               (text)=>{
                 this.state.inputs.input1.currentValue = text;
                 this.props.saveText(text,"attivitaLuogo")
                 this.forceUpdate();
               }
             }

             placeholder="Scrivere qui"

             onBlur={
               ()=>{

                 if(this.state.inputs.input1.currentValue == ""){
                    this.state.inputs.input1.validateStatus = "empty input";
                    this.state.inputs.input1.message = "questo ingresso non può essere vuoto"
                    this.forceUpdate();

                 }
                this.enviarValidacion()
               }
             }

             onFocus={
               ()=>{

                   if(this.state.inputs.input1.currentValue == ""){
                      this.state.inputs.input1.validateStatus = "default";
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
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Indirizzo</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
          <TextInput
            style={{ height: "100%", width:"100%", backgroundColor:"white",borderColor: color2, borderStyle:"solid", borderWidth:1}}
            value={this.props.dataIndirizo != null ? this.props.dataIndirizo : this.state.inputs.input2.currentValue}
            onChangeText={
              (text)=>{
                this.props.saveText(text,"attivitaLuogo")
                this.forceUpdate()
              }
            }
            onFocus={
              ()=>{

                this.props.changeModal(1)
                //this.props.navigation.navigate("indirizzoI",{saveText:this.props.saveText})
                if(this.props.dataIndirizo == ""){
                   this.state.inputs.input3.validateStatus = "default";
                   this.state.inputs.input3.message = ""
                   this.forceUpdate();
                }
              }
            }

            placeholder="Scrivere qui"

            onBlur={
              ()=>{

                if(this.props.dataIndirizo == ""){
                   this.state.inputs.input2.validateStatus = "empty input";
                   this.state.inputs.input2.message = "questo ingresso non può essere vuoto"
                   this.forceUpdate();
                }
                  this.enviarValidacion()
              }
            }
          />

          </View>
          <Text style={{color:"red"}}>{this.state.inputs.input2.message}</Text>
        </View>
        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Città</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
          <TextInput
            style={{ height: "100%", width:"100%", backgroundColor:"white", borderColor:color3, borderStyle:"solid", borderWidth:1}}
            value={this.props.dataCitta != null ? this.props.dataCitta : this.state.inputs.input3.currentValue}
            onChangeText={
              (text)=>{
                this.state.inputs.input3.currentValue = text;

                this.props.saveText(text,"attivitaLuogo")
                this.forceUpdate()
              }
            }
            onFocus={
              ()=>{
                  this.props.changeModal(2)
                  if(this.state.inputs.input3.currentValue == ""){
                     this.state.inputs.input3.validateStatus = "default";
                     this.state.inputs.input3.message = ""
                     this.forceUpdate();
                  }
                //this.props.navigation.navigate("cittaI",{saveText:this.props.saveText})
              }
            }

            placeholder="Scrivere qui"

            onBlur={
              ()=>{
                if(this.props.dataCitta == ""){
                   this.state.inputs.input3.validateStatus = "empty input";
                   this.state.inputs.input3.message = "questo ingresso non può essere vuoto"
                   this.forceUpdate();

                }
                this.enviarValidacion()
              }
            }
          />

          </View>
          <Text style={{color:"red"}}>{this.state.inputs.input3.message}</Text>
        </View>
        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Telefono</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
            <TextInput
            value={this.state.inputs.input4.currentValue}
             style={{ height: "100%", width:"100%", backgroundColor:"white", borderColor: color4, borderStyle:"solid", borderWidth:1}}
             onChangeText={
               (text)=>{
                 this.state.inputs.input4.currentValue = text;
                 this.props.saveText(text,"telefono")
                 this.forceUpdate()
               }
             }
             placeholder="Scrivere qui"
             onBlur={
               ()=>{
                 if(this.state.inputs.input4.currentValue == ""){
                    this.state.inputs.input4.validateStatus = "empty input";
                    this.state.inputs.input4.message = "questo ingresso non può essere vuoto"
                    this.forceUpdate();

                 }

                   this.enviarValidacion()
               }
             }
             onFocus={
               ()=>{

                   if(this.state.inputs.input4.currentValue == ""){
                      this.state.inputs.input4.validateStatus = "default"
                      this.state.inputs.input4.message = ""
                      this.forceUpdate();
                   }
                 //this.props.navigation.navigate("cittaI",{saveText:this.props.saveText})
               }
             }
            />
          </View>
          <Text style={{color:"red"}}>{this.state.inputs.input4.message}</Text>
        </View>
        <View style={misEstilos.SectionImputTextArea}>
          <View style={misEstilos.contenedorText2}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Descrizione (max 150 caratteri)</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo42}>
            <TextInput
            value={this.state.inputs.input5.currentValue}
              multiline
              numberOfLines={10}
              style={{ height: "100%", width:"100%", backgroundColor:"white", borderColor:color5, borderStyle:"solid", borderWidth:1}}
              onChangeText={
                (text)=>{
                  this.state.inputs.input5.currentValue = text;
                  this.props.saveText(text,"descrizione")
                  this.forceUpdate()
                }
              }

              placeholder="Scrivere qui"

              onBlur={
                ()=>{
                  if(this.state.inputs.input5.currentValue == ""){
                     this.state.inputs.input5.validateStatus = "empty input";
                     this.state.inputs.input5.message = "questo ingresso non può essere vuoto"
                     this.forceUpdate();

                  }
                    this.enviarValidacion()
                }
              }
              onFocus={
                ()=>{
                  //  this.props.changeModal(2)
                    if(this.state.inputs.input5.currentValue == ""){
                       this.state.inputs.input5.validateStatus = "default";
                       this.state.inputs.input5.message = ""
                       this.forceUpdate();
                    }
                  //this.props.navigation.navigate("cittaI",{saveText:this.props.saveText})
                }
              }
            />
          </View>
          <Text style={{color:"red"}}>{this.state.inputs.input5.message}</Text>
        </View>


      </View>
    );
  }

}
