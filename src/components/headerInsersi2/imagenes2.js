import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList,TouchableOpacity, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import ImagePicker from 'react-native-image-picker';
const scom = require("../../services/url.js");
import RNFetchBlob from 'rn-fetch-blob';

//import Absolute from 'react-native-absolute';

export default class Imagenes2 extends Component {

  /*
    props:
      objDat={ style={{ height: "100%", width:"100%", backgroundColor:"white"}}
        resena

      }


  */

  constructor(props) {
        super(props);
        this.state = {
          imagenes:{

            imagine1:{
              source:{},
              name:"",
              data:"",
              loading:false

            }
            ,
            imagine2:{
              source:{},
              name:"",
              data:"",
              loading:false
            }
            ,
            imagine3:{
              source:{},
              name:"",
              data:"",
              loading:false
            }
            ,
            imagine4:{
              source:{},
              name:"",
              data:"",
              loading:false
            }
            ,
            imagine5:{
              source:{},
              name:"",
              data:"",
              loading:false
            }
            ,
            imagine6:{
              source:{},
              name:"",
              data:"",
              loading:false
            }
            ,
            imagine7:{
              source:{},
              name:"",
              data:"",
              loading:false
            },


          },
          apendice: `?${new Date().getTime()}`
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente =  10 * this.alto;
        this.altoComponente = this.altoComponente / 100;
        this.guardarImagenes= this.guardarImagenes.bind(this);
        this.getVariable = this.getVariable.bind(this);
          this.actionImage = this.actionImage.bind(this)
        this.validate= this.validate.bind(this)


    }

    actionImage(titulo, imagen){
        const options = {
          title: titulo,
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };


        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
          let id = this.props.b[0].id

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {

            extension = response.fileName.split(".");
            this.state.imagenes[imagen].loading = true;
            this.state.imagenes[imagen].data = response.data;
            this.state.imagenes[imagen].name =`${id}-${imagen}.${extension[1]}`;
            this.state.imagenes[imagen].source={uri:response.uri};

            this.forceUpdate();

            keys = Object.keys(this.state.imagenes);

            arrayI = keys.map(
              (item)=>{
                return this.state.imagenes[item].name
              }
            )
            console.log(arrayI);
            this.props.saveImages(arrayI, "imagine2")
            this.validate();

            this.guardarImagenes(imagen)
            this.props.enviar2()
            //this.props.saveImages(this.state.imagenes, "imagine2")
          }
        });








      }

      getVariable(name){
        superObj={};
        for(item in this.props.variables){

          if(item == name){
            superObj = this.props.variables[item]
          }

        }

        return superObj
      }


    guardarImagenes(name){

      baseUrl = scom.url;
      baseUrl+="/files";

      RNFetchBlob.fetch('POST', baseUrl, {

        'Content-Type' : 'multipart/form-data',
      }, [
          // element with property `filename` will be transformed into `file` in form data
        { name : 'imagen' , filename : this.state.imagenes[name].name, data: this.state.imagenes[name].data},
          // elements without property `filename` will be sent as plain text

      ]).then((resp) => {
        console.log(resp);
        this.state.imagenes[name].loading = false;
        this.forceUpdate()
      }).catch((err) => {
        console.log(err);
      });

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

    validate(){
      this.state.validate = false;
      this.props.saveValidacion(false, "images2")
      this.forceUpdate();
      for(i in this.state.imagenes){
       if(i != "validate"){
          if(this.state.imagenes[i].data!=""){
            this.state.validate = true;
            this.forceUpdate();
            this.props.saveValidacion(true, "images2")
            break;
          }

        }
      }
    }

  render(){

    let v1 = ""
    let v2 = ""
    let v3 = ""
    let v4 = ""
    let v5 = ""
    let v6 = ""
    let v8 = ""

    try{
    //  console.log(this.props.b[0].social)
    baseUrl = scom.url;
    baseUrl+="/files/"

      v1 = baseUrl+this.props.b[0].imagine[2]+this.state.apendice;
      v2 = baseUrl+this.props.b[0].imagine[3]+this.state.apendice;
      v3 = baseUrl+this.props.b[0].imagine[4]+this.state.apendice;
      v4 = baseUrl+this.props.b[0].imagine[5]+this.state.apendice;
      v5 = baseUrl+this.props.b[0].imagine[6]+this.state.apendice;
      v6 = baseUrl+this.props.b[0].imagine[7]+this.state.apendice;
      v7 = baseUrl+this.props.b[0].imagine[8]+this.state.apendice;

    }
    catch(e){
      console.log(e)
      v1 = null
      v2 = null
    }

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
        "fontFamily": "Montserrat-Regular",
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
        "fontFamily": "Montserrat-Regular",
        "textAlign": "left",

      },
      "inserimentoAttivita_raggruppa46_rettangolo12dccae145": {
        "opacity": 1,
        "backgroundColor": "#28337F",

        "width": "80%",
        "height": "50%",
      },

      "inserimentoAttivita_raggruppa46_charger5677960c": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 15,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat-Regular",
        "textAlign": "center",

      },

      "inserimentoAttivita_rettangolo35": {
        "opacity": 1,



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
        "fontFamily": "Montserrat-Regular",
        "textAlign": "center",

      },

      "inserimentoAttivita_galleriaMax9Immagini": {
        "opacity": 1,
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 14,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat-Regular",
        "textAlign": "center",
      },






    }
    value= this.altoComponente*2;
    value2 = this.altoComponente*8;

    var sections = new Array()
    let count = 2
    keys = Object.keys(this.state.imagenes);
    sections = keys.map(
        (item)=>{
          try {
            baseUrl = scom.url;
            baseUrl+="/files/"

              v1 = baseUrl+this.props.b[0].imagine[count];
          }
          catch(e){

          }
          var component ="";

          if(this.state.imagenes[item].loading==true){
            component= (
              <View style={[this.sizes("80%","80%"),misEstilos.flexPerfectCenter]}>
                <ActivityIndicator />
              </View>
            )
          }

          else{
            component= <Image source={Object.entries(this.state.imagenes[item].source).length == 0 ? {uri:v1} : this.state.imagenes[item].source } style={this.sizes("80%","80%")} />;
          }
          count++
          return component;
        }
      )

    return (
      <View style={[misEstilos.flexColumn,this.sizes("100%",value2)]}>

        <View style={[misEstilos.flexPerfectCenter, this.sizes("100%",this.altoComponente)]}>

          <View style={[misEstilos.inserimentoAttivita_rettangolo35, misEstilos.flexPerfectCenter]}>

            <Text style={misEstilos.inserimentoAttivita_galleriaMax9Immagini}>Galleria (max 9 immagini)</Text>

          </View>

        </View>
        <View style={[misEstilos.flexRowWrap, this.sizes("100%",value), {paddingLeft:"5%",paddingLeft:"5%"}]}>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Galleria</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>
            {sections[0]}
          </View>

          <TouchableOpacity style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}
          onPress={
            ()=>{
              this.actionImage("Imagina Profolio", "imagine1");
            }
          }
          >

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </View>

          </TouchableOpacity>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Galleria</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>
            {sections[1]}
          </View>

          <TouchableOpacity style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}
            onPress={
              ()=>{
                this.actionImage("Imagina Profolio", "imagine2");
              }
            }
          >

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </View>

          </TouchableOpacity>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Galleria</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>
            {sections[2]}
          </View>

          <TouchableOpacity style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}
            onPress={
              ()=>{
                this.actionImage("Imagina Profolio", "imagine3");
              }
            }
          >

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </View>

          </TouchableOpacity>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Galleria</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>

            {sections[3]}

          </View>

          <TouchableOpacity style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}

            onPress={
              ()=>{
                this.actionImage("Imagina Profolio", "imagine4");
              }
            }
          >

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </View>

          </TouchableOpacity>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Galleria</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>
            {sections[4]}
          </View>

          <TouchableOpacity style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}
            onPress={
              ()=>{
                this.actionImage("Imagina Profolio", "imagine5");
              }
            }
          >

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </View>

          </TouchableOpacity>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Galleria</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>
            {sections[5]}
          </View>

          <TouchableOpacity style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}
            onPress={
              ()=>{
                this.actionImage("Imagina Profolio", "imagine6");
              }
            }

          >

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </View>

          </TouchableOpacity>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Galleria</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>
            {sections[6]}

          </View>

          <TouchableOpacity style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}
            onPress={
              ()=>{
                this.actionImage("Imagina Profolio", "imagine7");
              }
            }

          >

            <View style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}>

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </View>

          </TouchableOpacity>
        </View>

      </View>
    );
  }

}
