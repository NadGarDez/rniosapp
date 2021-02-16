import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, View,ActivityIndicator, TextInput, FlatList, Picker, ScrollView, TouchableHighlight,TouchableOpacity, Alert} from 'react-native';
import { Container, Header, Content, Accordion ,Button} from "native-base";
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native'
import CheckBox from '@react-native-community/checkbox';
import Sfetch from "../../services/fetchManager.js";
import NetInfo from "@react-native-community/netinfo";
import BottonMenu from "../../components/menus/bottonMenu.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
const scom = require("../../services/url.js");

// android:usesCleartextTraffic="true" android:networkSecurityConfig="@xml/network_security_config" f
export default class changePassword extends Component {

  constructor(props) {
      super(props);
      this.state = {
        oldPass:"",
        newPass1:"",
        newPass2:"",

        enviar:false,
        message:""
      };

      this.eviar = this.enviar.bind(this);

      this.handleResponse = this.handleResponse.bind(this);
      this.accidente()

    //  this.verificarDatosGuardados= this.verificarDatosGuardados.bind(this);
    //this.enviar("iranad@hotmail.com")
      //this.verificarDatosGuardados()
  }
  async accidente(){
    Alert.alert("accidente")
    await AsyncStorage.setItem('password', "1234")
  }
  async enviar(obj){
  //  console.log(this.querystring(this.state))
  this.state.paso= 2;
  this.forceUpdate()
    //console.log(url());
    Alert.alert("enviando")

    baseUrl = scom.url;
    baseUrl+="/changeP1";
    a = new Sfetch(baseUrl);

    try{
      b = await a.postJson(obj);
      console.log(b)
      this.handleResponse(b);

    }
    catch(error){
      Alert.alert(error)
      console.log(error);
    }




  }


  async handleResponse(response){
    console.log(response)
    if(!response.error){
      Alert.alert("contraceña cambiada exitosamente")

      contracena = await AsyncStorage.getItem('password');

      if(contracena!=null){
        try {
          await AsyncStorage.setItem('password', this.state.newPass1)
        } catch(e) {
          // remove error
        }
      }
      this.props.navigation.navigate("Home")
    }

    else{
      Alert.alert("Error")
    }

  }


  render() {

    return (
      <View>
        <View style={{display:"flex",justifyContent:"center", alignItems:"center", width:"100%", height:"100%", backgroundColor:"black", color:"white"}}>

          <View style={{diaplay:'flex', flexDirection:"column", flexWrap:'wrap', justifyContent:'center',width:'100%',alignItems:"center"}}>
            <Text size="15" style={{color:"rgba(35, 171, 224, 1)",fontSize:18,textAlign:"center",marginBottom:5}}>Cambio de contraceña</Text>
            <TextInput
              style={{backgroundColor:"white", color:"black",width:"80%", height:50, borderRadius:50,marginBottom:5}}
              onChangeText={
                (text)=>{
                    this.setState({oldPass:text})
                }
              }
              value={this.state.email}
              placeholder="Contraceña actual"
              secureTextEntry={true}
            />
            <TextInput
              style={{backgroundColor:"white", color:"black",width:"80%", height:50, borderRadius:50,marginBottom:5}}
              onChangeText={
                (text)=>{
                    this.setState({newPass1:text})
                }
              }
              placeholder="ingrese la contraceña nueva"
              value={this.state.email}
            />
            <TextInput
              style={{backgroundColor:"white", color:"black",width:"80%", height:50, borderRadius:50,marginBottom:5}}
              onChangeText={
                (text)=>{
                    this.setState({newPass2:text})

                }
              }
              value={this.state.email}
              placeholder="confime la contraceña"
            />
            <Text style={{color:"red"}}>{this.state.message}</Text>

            <TouchableOpacity style={[styles.menuLogin_rettangolo20,{diaplay:'flex', flexDirection:"row", flexWrap:'wrap', justifyContent:'center',width:'50%',height:50,alignItems:"center"}]}
              onPress={
                ()=>{
                  if(this.state.pass1 ==  this.state.pass2){
                      this.setState({message:""})
                      console.log(this.props.variables.user.value)
                      let obj ={
                        oldPass:this.state.oldPass,
                        newPass:this.state.newPass1,
                        id:this.props.variables.user.value.id
                      }
                      console.log(obj)
                      this.enviar(obj)
                  }
                  else{
                      this.setState({message:"las contraceñas nuevas no coinciden"})
                  }

                }
              }
            >
              <Text style={{color:"white"}}>Enviar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  "home_rettangolo3": {
    "display":"flex",
    "flexDirection":"row",
    "opacity": 1,

    "backgroundColor": "rgba(220, 220, 220, 1)",

    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": "100%",
    "height": "80%",

  },
  "menu": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 1)",
    "width": "100%",
    "height": "90%"

  },
  "menu_rettangolo11": {
    "display":"flex",
    "flexDirection":"column",
    "opacity": 1,

    "backgroundColor": "rgba(25, 25, 25, 1)",

    "width": "100%",
    "height": 760,

  },
  "menuLogin_signin": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",


  },
  "menu_shpastapesto": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 20,
    "top": 358
  },
  "menu_windsurfadobestock151590813": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 20,
    "top": 529
  },
  "menu_cameraSuperior": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 191,
    "top": 529
  },
  "menu_cinqueTerre2": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 191,
    "top": 358
  },
  "menu_rettangolo6": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(0, 0, 0, 0.5019607843137255)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(255, 255, 255, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(255, 255, 255, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(255, 255, 255, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(255, 255, 255, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 20,
    "top": 358
  },
  "menu_rettangolo8": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(0, 0, 0, 0.5019607843137255)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(255, 255, 255, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(255, 255, 255, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(255, 255, 255, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(255, 255, 255, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 20,
    "top": 529
  },
  "menuLogin_rettangolo20": {
    "opacity": 1,

    "backgroundColor": "rgba(35, 171, 224, 1)",

    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": "85%",
    "height": "80%",

  },
  "menu_rettangolo7": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(0, 0, 0, 0.5019607843137255)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(255, 255, 255, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(255, 255, 255, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(255, 255, 255, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(255, 255, 255, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 191,
    "top": 358
  },
  "menu_rettangolo9": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(0, 0, 0, 0.5019607843137255)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopWidth": 1,
    "borderTopColor": "rgba(255, 255, 255, 1)",
    "borderRightWidth": 1,
    "borderRightColor": "rgba(255, 255, 255, 1)",
    "borderBottomWidth": 1,
    "borderBottomColor": "rgba(255, 255, 255, 1)",
    "borderLeftWidth": 1,
    "borderLeftColor": "rgba(255, 255, 255, 1)",
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 150,
    "height": 150,
    "left": 191,
    "top": 529
  },
  "menu_etDeguster": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 92,
    "height": 19,
    "left": 46,
    "top": 451
  },
  "menu_edDecouvrir": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 100,
    "height": 19,
    "left": 214,
    "top": 451
  },
  "menu_etSeRelaxer": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 102,
    "height": 19,
    "left": 213,
    "top": 622
  },
  "menu_manger0ab05290": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 30,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",

  },
  "menu_visiter8d29edfb": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 30,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 101,
    "height": 37,
    "left": 213,
    "top": 396
  },
  "menu_dormirf5e80a81": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 30,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 110,
    "height": 37,
    "left": 209,
    "top": 567
  },
  "menu_samuser18f72cfe": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(255, 255, 255, 1)",
    "fontSize": 30,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 144,
    "height": 37,
    "left": 23,
    "top": 585
  },
  "menu_route": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 15,
    "height": 15,
    "left": 276,
    "top": 239.5
  },
  "menu_route_tracciato30": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.01,
    "height": 14.47,
    "left": 0,
    "top": 0
  },
  "menu_route_tracciato31": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 2.64,
    "height": 2.64,
    "left": 1.58,
    "top": 1.58
  },
  "menu_route_tracciato32": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 6.22,
    "height": 9.12,
    "left": 8.78,
    "top": 5.88
  },
  "menu_route_tracciato33": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 2.64,
    "height": 2.64,
    "left": 10.78,
    "top": 6.78
  },
  "menu_route_ellisse1": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 1,
    "height": 2,
    "left": 6.72,
    "top": 13
  },
  "menu_raggruppa24": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 360,
    "height": 740,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa24_rettangolo15": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(25, 25, 25, 1)",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "borderTopLeftRadius": 0,
    "borderTopRightRadius": 0,
    "borderBottomLeftRadius": 0,
    "borderBottomRightRadius": 0,
    "width": 360,
    "height": 740,
    "left": 0,
    "top": 0
  },
  "menu_rettangolo1": {
    "opacity": 1,
    "backgroundColor": "rgba(220, 220, 220, 1)",
    "display":"flex",
    "flexDirection":"row",

    "width": "100%",
    "height": "10%",

  },
  "menu_raggruppa23": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 29.44,
    "height": 14.67,
    "left": 20.5,
    "top": 733
  },
  "menu_raggruppa23_raggruppa1": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 24.44,
    "height": 14.67,
    "left": 5,
    "top": 0
  },
  "menu_raggruppa23_raggruppa1_linea1de355e88": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 27.44,
    "height": 3,
    "left": -1.5,
    "top": -1.5
  },
  "menu_raggruppa23_raggruppa1_linea2efbad5e9": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 27.44,
    "height": 3,
    "left": -1.5,
    "top": 5.83
  },
  "menu_raggruppa23_raggruppa1_linea3e20160e6": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 27.44,
    "height": 3,
    "left": -1.5,
    "top": 13.17
  },
  "menu_raggruppa23_raggruppa22": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 0.25,
    "height": 14.67,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa23_raggruppa22_linea1": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 3.25,
    "height": 3,
    "left": -1.5,
    "top": -1.5
  },
  "menu_raggruppa23_raggruppa22_linea2": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 3.25,
    "height": 3,
    "left": -1.5,
    "top": 5.83
  },
  "menu_raggruppa23_raggruppa22_linea3": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 3.25,
    "height": 3,
    "left": -1.5,
    "top": 13.17
  },
  "menu_homeIconSilhouette86859776": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 26.85,
    "height": 25,
    "left": 166.1,
    "top": 727.5
  },
  "menu_homeIconSilhouette86859776_raggruppa21470543fb": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 26.85,
    "height": 25,
    "left": 0,
    "top": 0
  },
  "menu_homeIconSilhouette86859776_raggruppa21470543fb_raggruppa2025a01a7b": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 26.85,
    "height": 25,
    "left": 0,
    "top": 0
  },
  "menu_homeIconSilhouette86859776_raggruppa21470543fb_raggruppa2025a01a7b_tracciato43fe07d011": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 26.85,
    "height": 14.21,
    "left": 0,
    "top": 0
  },
  "menu_homeIconSilhouette86859776_raggruppa21470543fb_raggruppa2025a01a7b_tracciato44": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 19.26,
    "height": 19.39,
    "left": 3.8,
    "top": 5.61
  },
  "menu_homeIconSilhouette5c64c588": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 322.32,
    "top": 733.32
  },
  "menu_homeIconSilhouette5c64c588_raggruppa21e7d06b01": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_homeIconSilhouette5c64c588_raggruppa21e7d06b01_raggruppa2051d77708": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_homeIconSilhouette5c64c588_raggruppa21e7d06b01_raggruppa2051d77708_tracciato43501db71e": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa25": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 24.97,
    "height": 25,
    "left": 167.34,
    "top": 655.3
  },
  "menu_raggruppa25_homeIconSilhouetteb02fba53": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 5.98,
    "top": 6.02
  },
  "menu_raggruppa25_homeIconSilhouetteb02fba53_raggruppa21deb6a5af": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa25_homeIconSilhouetteb02fba53_raggruppa21deb6a5af_raggruppa208eb579df": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa25_homeIconSilhouetteb02fba53_raggruppa21deb6a5af_raggruppa208eb579df_tracciato4305556ace": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa25_homeIconSilhouette": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": -6.02,
    "top": 6.02
  },
  "menu_raggruppa25_homeIconSilhouette_raggruppa21": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa25_homeIconSilhouette_raggruppa21_raggruppa20": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_raggruppa25_homeIconSilhouette_raggruppa21_raggruppa20_tracciato43": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 25,
    "height": 12.97,
    "left": 0,
    "top": 0
  },
  "menu_user": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 22,
    "height": 26.37,
    "left": 23,
    "top": 32
  },
  "menu_user_tracciato1": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 12.7,
    "height": 12.7,
    "left": 4.48,
    "top": 0
  },
  "menu_user_tracciato2": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 22,
    "height": 13.63,
    "left": 0,
    "top": 12.74
  },

  "menu_rettangolo17": {
    "opacity": 1,

    "backgroundColor": "rgba(35, 171, 224, 1)",

    "width": "100%",
    "height": "20%",

  },
  "menu_rettangolo17-2": {
    "opacity": 1,

    "backgroundColor": "rgba(25, 25, 25, 1)",

    "width": "100%",
    "height": 40,

  },

  "menu_login": {
    "opacity": 1,

    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(220, 220, 220, 1)",
    "fontSize": 13,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginLeft":3
  },
  "menu_accueil": {
    "opacity": 1,

    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(220, 220, 220, 1)",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",

  },
  "menu_lesDestinations": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",

  },
  "menu_manger": {
    "opacity": 1,

    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(35, 171, 224, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",

  },
  "menu_visiter": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(35, 171, 224, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 68,
    "height": 24,
    "left": 146,
    "top": 348
  },
  "menu_samuser": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(35, 171, 224, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 96,
    "height": 24,
    "left": 132,
    "top": 386
  },
  "menu_dormir": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(35, 171, 224, 1)",
    "fontSize": 20,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 74,
    "height": 24,
    "left": 143,
    "top": 424
  },
  "menu_visitezLaCote": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(220, 220, 220, 1)",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",

  },
  "menu_adherer": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(220, 220, 220, 1)",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 107,
    "height": 30,
    "left": 127,
    "top": 537
  },
  "menu_contact": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(220, 220, 220, 1)",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 104,
    "height": 30,
    "left": 128,
    "top": 594
  },
  "menu_raggruppa6": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 10,
    "height": 5,
    "left": 331.5,
    "top": 493.5
  },
  "menu_raggruppa6_linea4badcd306": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.73,
    "height": 7.83,
    "left": -1.41,
    "top": -1.41
  },
  "menu_raggruppa6_linea534e4c214": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.73,
    "height": 7.83,
    "left": 3.69,
    "top": -1.41
  },
  "menu_raggruppa31": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 10,
    "height": 5,
    "left": 331.5,
    "top": 278.5
  },
  "menu_raggruppa31_linea4": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.73,
    "height": 7.83,
    "left": -1.41,
    "top": -1.41
  },
  "menu_raggruppa31_linea5": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.73,
    "height": 7.83,
    "left": 3.69,
    "top": -1.41
  },
  "menu_raggruppa33": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "transparent",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 70.14,
    "height": 9.51,
    "left": 276.73,
    "top": 13.49
  },
  "menu_raggruppa33_tracciato9": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 10.28,
    "height": 11.51,
    "left": 5.12,
    "top": -1
  },
  "menu_raggruppa33_tracciato10": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 8.61,
    "height": 11.31,
    "left": 62.53,
    "top": -0.88
  },
  "menu_raggruppa33_tracciato11": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.8,
    "height": 11.43,
    "left": 43.11,
    "top": -0.92
  },
  "menu_raggruppa33_tracciato12": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.41,
    "height": 11.51,
    "left": 14,
    "top": -1
  },
  "menu_raggruppa33_tracciato13": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.53,
    "height": 11.51,
    "left": -1,
    "top": -1
  },
  "menu_raggruppa33_tracciato14": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 3.49,
    "height": 2.14,
    "left": 67.64,
    "top": -0.92
  },
  "menu_raggruppa33_tracciato15": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 3.22,
    "height": 2.18,
    "left": 67.92,
    "top": 8.25
  },
  "menu_raggruppa33_tracciato16": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 2.05,
    "height": 2.18,
    "left": 69.09,
    "top": -0.52
  },
  "menu_raggruppa33_tracciato17": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 2.03,
    "height": 2.09,
    "left": 69.11,
    "top": 7.85
  },
  "menu_raggruppa33_tracciato18": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 2.03,
    "height": 2.09,
    "left": 69.11,
    "top": 8.07
  },
  "menu_raggruppa33_tracciato19": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.74,
    "height": 11.3,
    "left": 56.68,
    "top": -0.88
  },
  "menu_raggruppa33_tracciato20": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 7.71,
    "height": 11.3,
    "left": 50.28,
    "top": -0.88
  },
  "menu_raggruppa33_tracciato21": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 8.61,
    "height": 11.34,
    "left": 24.24,
    "top": -0.91
  },
  "menu_raggruppa33_tracciato22": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 6.89,
    "height": 11.34,
    "left": 31.8,
    "top": -0.91
  },
  "menu_raggruppa33_tracciato23": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 6.89,
    "height": 11.34,
    "left": 37.22,
    "top": -0.91
  },
  "menu_raggruppa33_tracciato24": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 6.69,
    "height": 11.34,
    "left": 20.09,
    "top": -0.91
  },
  "menu_raggruppa33_tracciato25": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 5.58,
    "height": 11.34,
    "left": 56.65,
    "top": -0.91
  },
  "menu_raggruppa33_tracciato26": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 4.69,
    "height": 11.31,
    "left": 50.23,
    "top": -0.88
  },
  "menu_raggruppa33_tracciato27": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 5.51,
    "height": 2.13,
    "left": 50.28,
    "top": -0.91
  },
  "menu_raggruppa33_tracciato28": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 2.07,
    "height": 2.1,
    "left": 67.57,
    "top": -0.88
  },
  "menu_raggruppa33_tracciato29": {
    "opacity": 1,
    "position": "absolute",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 2.07,
    "height": 2.13,
    "left": 52.93,
    "top": 4.66
  },
  "home_raggruppa9_tracciato13f5eeb4ec": {
    "opacity": 1,
    "width": "3%",
    "height": "40%",

  },
});
