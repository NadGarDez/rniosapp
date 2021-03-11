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
      objDat={
        resena

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          inputs:{
            input1:{
              currentValue:"",
              validateStatus:"default",
              message:""
            },
            input2:{
              currentValue:"",
              validateStatus:"default",
              message:""
            },
            input3:{
              currentValue:"",
              validateStatus:"default",
              message:""
            },
            input4:{
              currentValue:"",
              validateStatus:"default",
              message:""
            },
            input5:{
              currentValue:"",
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
    let a = ""
    try{
       a = this.props.dataIndirizo.split(",")
    }
    catch(e){
        a = ""
    }

    console.log(a[0])
    return (
      <View style={misEstilos.padre}>

        <View style={misEstilos.SectionImputText}>
          <View style={misEstilos.contenedorText}>
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Nom / titre / sujet</Text>

          </View>
          <View style={misEstilos.inserimentoAttivita_rettangolo4}>

           <TextInput
             style={{ height: "100%", width:"100%", backgroundColor:"white", borderStyle:"solid",borderColor: color1, borderWidth:1}}
             onChangeText={
               (text)=>{
                 this.state.inputs.input1.currentValue = text;
                 this.props.saveText(text,"attivitaLuogo")
                 this.forceUpdate();
               }
             }

             placeholder="Ecrire ici"

             onBlur={
               ()=>{

                 if(this.state.inputs.input1.currentValue == ""){
                    this.state.inputs.input1.validateStatus = "empty input";
                    this.state.inputs.input1.message = "Champ obligatoire"
                    this.forceUpdate();

                 }
                 else{
                   this.state.inputs.input1.message = ""
                   this.state.inputs.input1.validateStatus = "default";
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
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Adresse</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
          <TextInput
            style={{ height: "100%", width:"100%", backgroundColor:"white",borderColor: color2, borderStyle:"solid", borderWidth:1}}
            value={a[0]}
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

            placeholder="Ecrire ici"

            onBlur={
              ()=>{

                if(this.props.dataIndirizo == ""){
                   this.state.inputs.input2.validateStatus = "empty input";
                   this.state.inputs.input2.message = "Champ obligatoire"
                   this.forceUpdate();
                }
                else{
                  this.state.inputs.input2.message = ""
                   this.state.inputs.input2.validateStatus = "default";
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
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Ville</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
          <TextInput
            style={{ height: "100%", width:"100%", backgroundColor:"white", borderColor:color3, borderStyle:"solid", borderWidth:1}}
            value={this.props.dataCitta}
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

            placeholder="Ecrire ici"

            onBlur={
              ()=>{
                if(this.props.dataCitta == ""){
                   this.state.inputs.input3.validateStatus = "empty input";
                   this.state.inputs.input3.message = "Champ obligatoire"
                   this.forceUpdate();

                }
                else{
                  this.state.inputs.input3.message = ""
                  this.state.inputs.input3.validateStatus = "default";
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
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Téléphone</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo4}>
            <TextInput
             keyboardType='numeric'
             style={{ height: "100%", width:"100%", backgroundColor:"white", borderColor: color4, borderStyle:"solid", borderWidth:1}}
             onChangeText={
               (text)=>{
                 this.state.inputs.input4.currentValue = text;
                 this.props.saveText(text,"telefono")
                 this.forceUpdate()
               }
             }
             placeholder="Ecrire ici"
             onBlur={
               ()=>{
                 if(this.state.inputs.input4.currentValue == ""){
                    this.state.inputs.input4.validateStatus = "empty input";
                    this.state.inputs.input4.message = "Champ obligatoire"
                    this.forceUpdate();

                 }
                 else{

                     this.state.inputs.input4.message = ""
                     this.state.inputs.input4.validateStatus = "default";
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
            <Text style={misEstilos.inserimentoAttivita_attivitaluogo}>Description (max 150 caractères)</Text>

          </View>

          <View style={misEstilos.inserimentoAttivita_rettangolo42}>
            <TextInput
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

              placeholder="Ecrire ici"

              onBlur={
                ()=>{
                  if(this.state.inputs.input5.currentValue == ""){
                     this.state.inputs.input5.validateStatus = "empty input";
                     this.state.inputs.input5.message = ""
                     this.forceUpdate();

                  }
                  else{
                    this.state.inputs.input5.message = ""
                    this.state.inputs.input5.validateStatus = "default";
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
