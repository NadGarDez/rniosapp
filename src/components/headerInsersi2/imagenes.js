import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, View, ActivityIndicator,TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image, TouchableOpacity,Alert} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import ImagePicker from 'react-native-image-picker';
const scom = require("../../services/url.js");
import RNFetchBlob from 'rn-fetch-blob';
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
          imagenes:{
            profolio:{
              source:{},
              name:"",
              data:"",
              loading:false
            }
            ,
            copertina:{
              source:{},
              name:"",
              data:"",
              loading:false
            }
          },

          apendice: `?${new Date().getTime()}`

        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,
        this.altoComponente =  10 * this.alto;
        this.altoComponente = this.altoComponente / 100;
        this.actionImage = this.actionImage.bind(this)
        this.guardarImagenes= this.guardarImagenes.bind(this);
        this.getVariable = this.getVariable.bind(this)
        this.validate= this.validate.bind(this);

    }

    getVariable(name){
      superObj={};
      for(item in this.props.variables){

        if(item == name){
          superObj = this.props.variables[item]
        }
//
      }

      return superObj
    }

    componentWillUpdate(){

    }

  actionImage(titulo, imagen){
      const options = {
        title: titulo,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      let id = this.props.b[0].id

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

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

                return this.state.imagenes[item].name;


            }
          )
          console.log(arrayI);
          this.props.saveImages(arrayI, "imagine1")
          this.validate();
          this.guardarImagenes(imagen)
          this.props.enviar2()
          //this.props.saveImages(this.state.imagenes, "imagine1")
        }
      });








    }

    sizes(ancho="auto", alto="auto"){
      obj={
        width:ancho,
        height:alto
      }
      return obj;

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

    changeValueImputs(value){
      this.state.value=value;
      this.forceUpdate();
    }

    validate(){
      this.state.validate = true;
      this.props.saveValidacion(true, "images")
      this.forceUpdate();
      for(i in this.state.imagenes){
       if(i != "validate"){
          if(this.state.imagenes[i].data==""){
            this.state.validate = false;
            this.forceUpdate();
            this.props.saveValidacion(false, "images")
            break;
          }

        }
      }
    }
  render(){

    let v1 = ""
    let v2 = ""

    try{
    //  console.log(this.props.b[0].social)
    baseUrl = scom.url;
    baseUrl+="/files/"

      v1 = baseUrl+this.props.b[0].imagine[0]+this.state.apendice;
      v2 = baseUrl+this.props.b[0].imagine[1]+this.state.apendice;
      v3 = this.props.b[0].id
    }
    catch(e){

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
        "fontFamily": "Montserrat",
        "textAlign": "center",

      },

      "inserimentoAttivita_rettangolo35": {
        "opacity": 1,
        "position": "absolute",
        "backgroundColor": "#28337F",

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

    var sections = new Array()

    keys = Object.keys(this.state.imagenes);
    sections = keys.map(
        (item)=>{
          let h = item=="profolio"?v1 : v2
          var component ="";

          if(this.state.imagenes[item].loading==true){
            component= (
              <View style={[this.sizes("80%","80%"),misEstilos.flexPerfectCenter]}>
                <ActivityIndicator />
              </View>
            )
          }

          else{
            component= <Image source={Object.entries(this.state.imagenes[item].source).length == 0 ? {uri:h} : this.state.imagenes[item].source } style={this.sizes("80%","80%")} />;
          }
          return component;
        }
      )

    var section = <Image source={Object.entries(this.state.imagenes.profolio.source).length == 0 ? {uri:v2} : this.state.imagenes.profolio.source } style={this.sizes("80%","80%")} />;

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

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>

            {sections[0]}
          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>

            <TouchableOpacity style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}
              onPress={
                ()=>{
                  this.actionImage("Imagina Profolio", "profolio");
                }
              }
            >

              <Text style={{color:"#F9F9F9"}}>Charger</Text>

            </TouchableOpacity>

          </View>

          <View style={[misEstilos.flexHorizontalCenter, this.sizes("50%","50%")]}>

            <Text style={misEstilos.inserimentoAttivita_immagineProfilo}>Immagine Copertina</Text>

          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>
            {sections[1]}
          </View>

          <View style={[misEstilos.flexPerfectCenter, this.sizes("25%","50%")]}>

            <TouchableOpacity style={[misEstilos.inserimentoAttivita_raggruppa46_rettangolo12dccae145, misEstilos.flexPerfectCenter]}
            onPress={
              ()=>{
                this.actionImage("Imagina Profolio", "copertina");
              }
            }
            >

              <Text  style={{color:"#F9F9F9"}}>Charger</Text>

            </TouchableOpacity>

          </View>
        </View>

      </View>
    );
  }

}
