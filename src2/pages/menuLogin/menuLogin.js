import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, View, Modal,TextInput, FlatList, Picker, ScrollView, TouchableHighlight,TouchableOpacity, Alert, Dimensions,Image} from 'react-native';
import { Container, Header, Content, Accordion ,Button} from "native-base";
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CheckBox } from 'react-native-elements';
import Sfetch from "../../services/fetchManager.js";
const scom = require("../../services/url.js");
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class MenuLogin extends Component {

  constructor(props) {
      super(props);
      this.state = {//
        email:"",
        password:"",
        mantenerIniciada:false
      };
      this.eviar = this.enviar.bind(this);
      this.getVariable = this.getVariable.bind(this);
      this.handleTextInput = this.handleTextInput.bind(this);
      this.handleResponse = this.handleResponse.bind(this);
      this.querystring = this.querystring.bind(this)
      this.guardarTokenPermanente = this.guardarTokenPermanente.bind(this);

      this.alto = Dimensions.get('window').height,
      this.ancho = Dimensions.get('window').width,
      console.log(this.ancho)
      this.anchoC = 40 * this.ancho;
      this.anchoC = this.anchoC / 100;
      this.imgH = 12*this.anchoC
      this.imgH = this.imgH/100
  }

  componentDidlMount(){
    token = this.getVariable("tokenLogin");
  //  Alert.alert(token.value)
    if(token.value!=""){
      this.props.navigation.navigate("Menu");
    }


  }

  querystring(obj){

    const query = Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');

    return query;

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

  handleTextInput(value, name){
    this.state[name]= value;
    this.forceUpdate()
    console.log(this.state)
  }

  async enviar(){
  //  console.log(this.querystring(this.state)) android:usesCleartextTraffic="true" android:networkSecurityConfig="@xml/network_security_config"

    //console.log(url());
//// var ab= 0; this ñ.hola.dos= h;
  if(this.state.email!="" && this.state.password!=""){
    baseUrl = scom.url;
    baseUrl+="/session";

    a = new Sfetch(baseUrl);

    try{
      b = await a.postJson({email:this.state.email, password:this.state.password});
      this.handleResponse(b);

    }
    catch(error){
      //Alert.alert(error)
      console.log(error);
    }
  }





  }

  guardarTokenPermanente(){

  }

  async handleResponse(response){

    if(response.token){

      user = this.getVariable("user");
      token = this.getVariable("tokenLogin")

      user.action(response.user, user);
      token.action(response.token, token);

      if(this.state.mantenerIniciada==true){
        try {
          await AsyncStorage.setItem('email', this.state.email);
          await AsyncStorage.setItem('password', this.state.password);
        } catch (e) {
          // saving error
        }


      }
      else{
        try {
          correo = await AsyncStorage.getItem('email');
          contracena = await AsyncStorage.getItem('password');

          if((correo!=null)&&(contracena!=null)){
            try {
              await AsyncStorage.removeItem('email')
              await AsyncStorage.removeItem('password')
            } catch(e) {
              // remove error
            }
          }
        } catch (e) {
          // saving error
        }
      }

      Alert.alert("login effettuato con successo ")
      this.props.navigation.navigate("Menu")

    }

    else{
      Alert.alert("login non valido ")
    }

  }

  render() {

    objDat2={
      nombre:"Città di Bra",
      imagenLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU",
      descripcion:"La capitale de la gastronomie, à deux pas de Nice La capitale de la gastronomie, à ....",
      ciudad: "Bra (CN)",
      numero: "0172 430185",
      imagenGrande:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU"

    }
    objDat1={
      tit:"Degustare",
      subtit:"Hai cercato",
      imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ne4fxlOxhGDTycjkVZd_4KxtraQ0WP4DoQ&usqp=CAU",
      imagen2: require("./assets/1.jpg")
    }

    objDat3={
      tit:"Divertirsi",
      subtit:"Hai cercato",
      imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ne4fxlOxhGDTycjkVZd_4KxtraQ0WP4DoQ&usqp=CAU",
      imagen2: require("./assets/3..jpg")
    }

    objDat4={
      tit:"Rilassarsi",
      subtit:"Hai cercato",
      imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ne4fxlOxhGDTycjkVZd_4KxtraQ0WP4DoQ&usqp=CAU",
      imagen2: require("./assets/4.jpeg")
    }

    objDat5={
      tit:"Rilassarsi",
      subtit:"Hai cercato",
      imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Ne4fxlOxhGDTycjkVZd_4KxtraQ0WP4DoQ&usqp=CAU",
      imagen2: require("./assets/2.jpg")
    }


    return (
      <View>
      <ScrollView data-layer="a299d972-123f-4dc7-9b56-cc655809f74b" style={styles.menu}>
          <View data-layer="af950e58-d172-42f8-bbbe-e9fea43143ce" style={styles.menu_rettangolo11}>


            <View style={{width:"100%", height:"30%",display:"flex", flexDirection:"column", paddingLeft:10, paddingRight:10}}>
              <View style={{width:"100%", height:"20%",display:"flex", flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                <Image source={require("~/pages/register/assets/costaLogo2.png")}  style={{width:this.anchoC,height:this.imgH,resizeMode:"stretch"}}/>
              </View>
              <TouchableOpacity style={{width:"100%", height:"20%",display:"flex", flexDirection:"row", alignItems:"center"}}
                onPress={()=>{this.props.navigation.navigate("Menu")}}
              >
                <Icon name="user" size={20} color="#28337F" />
                <Text data-layer="6b4f094d-7a98-4f46-8168-114075edf8bc" style={styles.menu_login}>Déjà enregistré?</Text>

              </TouchableOpacity>
              <View style={{width:"100%", height:"50%",display:"flex", flexDirection:"row"}}>

                <View style={{width:"75%", height:"100%",display:"flex", flexDirection:"column"}}>

                  <View style={{diaplay:'flex', flexDirection:"row", flexWrap:'wrap', justifyContent:'center',width:'100%',height:"50%",alignItems:"center"}}>
                    <View data-layer="b6f95810-29c9-4480-a241-74cfcddf0ca1" style={styles.home_rettangolo3}>


                      <TextInput
                      placeholder="e-mail"
                        onChangeText={(text)=>{
                          this.handleTextInput(text,"email")
                        }}

                        value={this.state.correo}

                        style={{width:"100%", height:"100%"}}
                      />

                    </View>
                  </View>

                  <View style={{diaplay:'flex', flexDirection:"row", flexWrap:'wrap', justifyContent:'center',width:'100%',height:"50%",alignItems:"center"}}>
                    <View data-layer="b6f95810-29c9-4480-a241-74cfcddf0ca1" style={styles.home_rettangolo3}>

                    <TextInput
                      secureTextEntry={true}
                      placeholder="mot de passe"
                      onChangeText={(text)=>{
                        this.handleTextInput(text,"password")

                      }}

                      value={this.state.pass}

                      style={{width:"100%", height:"100%"}}
                    />


                    </View>
                  </View>

                </View>
                <View style={{width:"25%", height:"100%",display:"flex", flexDirection:"column-reverse", }}>
                  <View style={{diaplay:'flex', flexDirection:"row", flexWrap:'wrap', justifyContent:'center',width:'100%',height:"50%",alignItems:"center"}}
                    onPress={this.enviar}
                  >
                    <TouchableOpacity data-layer="323b1996-02bb-4a46-94a0-a1037add1660" style={styles.menuLogin_rettangolo20}   onPress={()=>{this.enviar()}}>
                      <Text data-layer="e0c1fa49-7aaa-4e47-8fbf-21da82753515" style={styles.menuLogin_signin}>accéder</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
              <View style={{width:"100%", height:"20%",display:"flex", flexDirection:"row", alignItems:"center"}}>
               {/* <CheckBox

                 checked={this.state.mantenerIniciada}
                 onPress={(newValue) => {
                   this.state.mantenerIniciada = newValue;
                   this.forceUpdate();
                 }}
                 color="blue"
                />*/}

		<BouncyCheckbox
  isChecked={this.state.mantenerIniciada}
  fillColor="blue"
borderColor="blue"
  text=""
  onPress={(newValue) => {
	this.state.mantenerIniciada = newValue;
                   this.forceUpdate();

  }}
/>

                <Text style={{color:"#28337F"}}>Restez connecté</Text>
                <TouchableOpacity
                  onPress={
                    ()=>{
                      this.props.navigation.navigate("RememberPass",{estado:1})
                    }
                  }
                >
                  <Text style={{marginLeft:18, color:"#28337F"}}>perdu le mot de passe?</Text>

                </TouchableOpacity>
              </View>

            </View>

            <View style={{width:"100%", height:"70%",}}>
              <TouchableOpacity style={{width:"100%", height:"20%",display:"flex", alignItems:"center", justifyContent:"center"}}

              onPress={
                ()=>{
                  this.props.navigation.navigate("SignIn")
                }
              }

              >
                <Text data-layer="bebb5481-53d2-47d9-8d38-a4a8401c7e01" style={styles.menu_accueil}>Nouvelle inscription</Text>
              </TouchableOpacity>
              <View style={{width:"100%", height:"80%",display:"flex", flexDirection:"column"}}>
              {/*
                <View style={{width:"100%", height:"40%",display:"flex", flexDirection:"column"}}>

                    <View data-layer="4b22338e-7ec0-4335-b9e8-95894dd8dad2" style={styles.menu_rettangolo17}>
                      <Text data-layer="182cd424-1749-4537-aa34-625797d50ddd" style={styles.menu_lesDestinations}>Categories</Text>
                    </View>
                    <View style={{width:"100%", height:"80%",display:"flex", flexDirection:"column"}}>
                    <TouchableOpacity style={{width:"100%", height:"25%",display:"flex", alignItems:"center", justifyContent:"center"}}
                          onPress={()=>this.props.navigation.navigate("Categoria", {objDat1,objDat2,categoria:"1"})}

                    >
                      <Text data-layer="136634cf-fb1c-4a78-9645-c35019a9c6bb" style={styles.menu_manger}>Mangia e degusta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:"100%", height:"25%",display:"flex", alignItems:"center", justifyContent:"center"}}

                      onPress={()=>this.props.navigation.navigate("Categoria", {objDat3,objDat2,categoria:"2"})}

                    >
                      <Text data-layer="136634cf-fb1c-4a78-9645-c35019a9c6bb" style={styles.menu_manger}>Divertiti</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:"100%", height:"25%",display:"flex", alignItems:"center", justifyContent:"center"}}

                      onPress={()=>this.props.navigation.navigate("Categoria", {objDat4,objDat2,categoria:"3"})}

                    >
                      <Text data-layer="136634cf-fb1c-4a78-9645-c35019a9c6bb" style={styles.menu_manger}>Dormi e rilassati</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:"100%", height:"25%",display:"flex", alignItems:"center", justifyContent:"center"}}

                      onPress={()=>this.props.navigation.navigate("Categoria", {objDat5,objDat2,categoria:"4"})}

                    >
                      <Text data-layer="136634cf-fb1c-4a78-9645-c35019a9c6bb" style={styles.menu_manger}>Visita e scopri</Text>
                    </TouchableOpacity>
                    </View>

                </View>*/}
              {/*  <View style={{width:"100%", height:"15%",display:"flex", alignItems:"center", justifyContent:"center"}}>

                  <View data-layer="4b22338e-7ec0-4335-b9e8-95894dd8dad2" style={styles.menu_rettangolo17-2}>
                      <Text data-layer="9860dbc4-fc0b-447d-81b5-fbf69fd44414" style={styles.menu_visitezLaCote}>Visitare la costa</Text>
                  </View>

                </View>*/}
{/*
                <View style={{width:"100%", height:"15%",display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <TouchableOpacity data-layer="4b22338e-7ec0-4335-b9e8-95894dd8dad2" style={styles.menu_rettangolo17-2}
                    onPress={
                      ()=>{
                        if(this.props.variables.tokenLogin.value!==""){
                          this.props.navigation.navigate("InserimentoAttivita");
                        }
                        else{
                          Alert.alert("non sei loggato o registrato")
                        }
                      }

                    }


                  >
                    <Text data-layer="182cd424-1749-4537-aa34-625797d50ddd" style={styles.menu_visitezLaCote}>Nouvelle entreprise</Text>
                  </TouchableOpacity>
                </View >*/}

              {/*  <View style={{width:"100%", height:"60%",display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <View data-layer="4b22338e-7ec0-4335-b9e8-95894dd8dad2" style={styles.menu_rettangolo17-2}>
                    <Text data-layer="182cd424-1749-4537-aa34-625797d50ddd" style={styles.menu_visitezLaCote}>Contatto</Text>
                  </View>
                </View>*/}


                {/*
                <TouchableOpacity style={{width:"100%", height:"15%",display:"flex", alignItems:"center", justifyContent:"center"}}
                  onPress={
                    ()=>{
                      this.props.navigation.navigate("SignIn")
                    }
                  }
                >
                <View data-layer="4b22338e-7ec0-4335-b9e8-95894dd8dad2" style={styles.menu_rettangolo17-2}>
                  <Text data-layer="182cd424-1749-4537-aa34-625797d50ddd" style={styles.menu_visitezLaCote}>Registrati</Text>
                </View>
                </TouchableOpacity>*/}

              </View>



            </View>



          </View>


        {/*
        <ReactImage data-layer="8d24bcf7-71e8-4b6f-9e6d-bc79f2784f27" source={require('./assets/shpastapesto.png')} style={styles.menu_shpastapesto} />
        <ReactImage data-layer="0b466303-c5c2-4bb3-8779-af8f6c4629f8" source={require('./assets/windsurfadobestock151590813.png')} style={styles.menu_windsurfadobestock151590813} />
        <ReactImage data-layer="1e657de4-6b94-4725-8c74-17ebf3296199" source={require('./assets/cameraSuperior.png')} style={styles.menu_cameraSuperior} />
        <ReactImage data-layer="bcfb5c99-a952-4ac9-aa3f-1704facbb1a9" source={require('./assets/cinqueTerre2.png')} style={styles.menu_cinqueTerre2} />
        <View data-layer="d9aa1631-53ce-4861-bb29-28e6449554b2" style={styles.menu_rettangolo6}></View>
        <View data-layer="d2534690-c187-44bc-8348-bca6bfbe57d1" style={styles.menu_rettangolo8}></View>
        <View data-layer="19c8bf66-1ccf-4723-9219-a09b26d78d69" style={styles.menu_rettangolo7}></View>
        <View data-layer="07c2e654-a13b-4cfa-9562-9221f9d35131" style={styles.menu_rettangolo9}></View>
        <Text data-layer="6b83d99d-225d-4d6f-8e09-175986725920" style={styles.menu_etDeguster}>et deguster</Text>
        <Text data-layer="fe21bda7-e297-4fce-9abc-651135e2b10a" style={styles.menu_edDecouvrir}>ed découvrir</Text>
        <Text data-layer="347cc9c1-58c6-4676-a8f2-c226e6c8d30f" style={styles.menu_etSeRelaxer}>Et Se Relaxer</Text>
        <Text data-layer="2268b29b-a515-4306-9e52-85958ed21eda" style={styles.menu_manger0ab05290}>Manger</Text>
        <Text data-layer="5861ad94-43e4-4836-8bde-768d08698260" style={styles.menu_visiter8d29edfb}>Visiter</Text>
        <Text data-layer="2a72a202-fb6e-4353-adc6-12bebae8b5a2" style={styles.menu_dormirf5e80a81}>Dormir</Text>
        <Text data-layer="dfef850e-aec3-4840-9aef-7a433af594c7" style={styles.menu_samuser18f72cfe}>S'amuser</Text>
        <View data-layer="ce654246-a8fd-484d-8860-e7e226a2d08f" style={styles.menu_route}>
            <Svg data-layer="035e62ca-cf0b-4ebd-8b79-d8353d16c76d" style={styles.menu_route_tracciato30} preserveAspectRatio="none" viewBox="0 -0.000015537556464551017 7.013671875 14.47265625" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 2.498139619827271 8.712517738342285 C 2.26565957069397 8.866362571716309 2.109380483627319 9.14910888671875 2.109380483627319 9.471919059753418 C 2.109380483627319 9.958518028259277 2.464231014251709 10.35439777374268 2.900398254394531 10.35439777374268 C 3.24412202835083 10.35439777374268 3.537220478057861 10.1084508895874 3.646064043045044 9.766077995300293 L 5.695326805114746 9.766077995300293 C 6.131494045257568 9.766077995300293 6.486345767974854 10.16195774078369 6.486345767974854 10.64855575561523 C 6.486345767974854 11.13515472412109 6.131494045257568 11.53103542327881 5.695326805114746 11.53103542327881 L 2.531256675720215 11.53103542327881 C 1.804311275482178 11.53103542327881 1.212893843650818 12.19083213806152 1.212893843650818 13.0018310546875 C 1.212893843650818 13.81282806396484 1.804311275482178 14.47262859344482 2.531256675720215 14.47262859344482 L 5.167982578277588 14.47262859344482 C 5.313608646392822 14.47262859344482 5.431654453277588 14.34093379974365 5.431654453277588 14.17846870422363 C 5.431654453277588 14.01600456237793 5.313608646392822 13.88430881500244 5.167982578277588 13.88430881500244 L 2.531256675720215 13.88430881500244 C 2.095089673995972 13.88430881500244 1.740239024162292 13.48843097686768 1.740239024162292 13.0018310546875 C 1.740239024162292 12.51523399353027 2.095089673995972 12.11935234069824 2.531256675720215 12.11935234069824 L 5.695326805114746 12.11935234069824 C 6.422272682189941 12.11935234069824 7.013689994812012 11.45955276489258 7.013689994812012 10.64855575561523 C 7.013689994812012 9.837558746337891 6.422272682189941 9.177759170532227 5.695326805114746 9.177759170532227 L 3.646064043045044 9.177759170532227 C 3.583705186843872 8.981614112854004 3.46088719367981 8.81721019744873 3.302657127380371 8.712517738342285 L 5.316535472869873 5.026228427886963 C 5.633338451385498 4.494975566864014 5.800796508789063 3.875946760177612 5.800796508789063 3.235738039016724 C 5.800796508789063 1.451543569564819 4.499678134918213 -1.553755646455102e-05 2.900398254394531 -1.553755646455102e-05 C 1.301118850708008 -1.553755646455102e-05 0 1.451543569564819 0 3.235738039016724 C 0 3.875946760177612 0.1674584448337555 4.494975566864014 0.4842610359191895 5.026228427886963 L 2.498139619827271 8.712517738342285 Z M 2.900398254394531 9.766077995300293 C 2.755008935928345 9.766077995300293 2.636725664138794 9.63411808013916 2.636725664138794 9.471919059753418 C 2.636725664138794 9.309719085693359 2.755008935928345 9.177759170532227 2.900398254394531 9.177759170532227 C 3.04578709602356 9.177759170532227 3.164071083068848 9.309719085693359 3.164071083068848 9.471919059753418 C 3.164071083068848 9.63411808013916 3.04578709602356 9.766077995300293 2.900398254394531 9.766077995300293 Z M 2.900398254394531 0.588303804397583 C 4.208899974822998 0.588303804397583 5.273451328277588 1.775943040847778 5.273451328277588 3.235738754272461 C 5.273451328277588 3.761342525482178 5.135629177093506 4.269268035888672 4.874910354614258 4.704623699188232 C 4.872879981994629 4.708006381988525 4.870902538299561 4.711447715759277 4.869003772735596 4.714948654174805 L 2.900398254394531 8.318373680114746 C 2.900398254394531 8.318373680114746 0.9279162883758545 4.708006381988525 0.9258859753608704 4.704623699188232 C 0.6651665568351746 4.269268035888672 0.5273448824882507 3.761342525482178 0.5273448824882507 3.235738754272461 C 0.5273448824882507 1.775943040847778 1.591896653175354 0.588303804397583 2.900398254394531 0.588303804397583 Z"  /></Svg>
            <Svg data-layer="2b3f4301-2139-41e7-954e-38662c8529c8" style={styles.menu_route_tracciato31} preserveAspectRatio="none" viewBox="60.00000762939453 60.00000762939453 2.63671875 2.63671875" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 61.31836700439453 62.63673400878906 C 62.04531860351563 62.63673400878906 62.63673400878906 62.04531860351563 62.63673400878906 61.31836700439453 C 62.63673400878906 60.59142684936523 62.04531860351563 60.00000762939453 61.31836700439453 60.00000762939453 C 60.59142684936523 60.00000762939453 60.00000762939453 60.59142684936523 60.00000762939453 61.31836700439453 C 60.00000762939453 62.04531860351563 60.59142684936523 62.63673400878906 61.31836700439453 62.63673400878906 Z M 61.31836700439453 60.52735137939453 C 61.75453948974609 60.52735137939453 62.10939025878906 60.88220596313477 62.10939025878906 61.31836700439453 C 62.10939025878906 61.75453948974609 61.75453948974609 62.10939025878906 61.31836700439453 62.10939025878906 C 60.88220596313477 62.10939025878906 60.52735137939453 61.75453948974609 60.52735137939453 61.31836700439453 C 60.52735137939453 60.88220596313477 60.88220596313477 60.52735137939453 61.31836700439453 60.52735137939453 Z"  /></Svg>
            <Svg data-layer="8e8c607b-9c3f-4172-b48b-adc32da42fe9" style={styles.menu_route_tracciato32} preserveAspectRatio="none" viewBox="276.0001220703125 166 6.22265625 9.12310791015625" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 279.3223571777344 166 C 277.7230834960938 166 276.4219665527344 167.3011169433594 276.4219665527344 168.900390625 C 276.4219665527344 169.4751892089844 276.5899963378906 170.0308990478516 276.9077758789063 170.5075988769531 L 278.9141235351563 173.65478515625 C 278.7587585449219 173.7488098144531 278.6383056640625 173.894775390625 278.5767211914063 174.0683746337891 L 276.2637634277344 174.0683746337891 C 276.1181335449219 174.0683746337891 276.0001220703125 174.1864166259766 276.0001220703125 174.3320465087891 C 276.0001220703125 174.4776763916016 276.1181335449219 174.5957336425781 276.2637634277344 174.5957336425781 L 278.5767211914063 174.5957336425781 C 278.685546875 174.9026184082031 278.9786376953125 175.1230773925781 279.3223571777344 175.1230773925781 C 279.758544921875 175.1230773925781 280.1133728027344 174.7682189941406 280.1133728027344 174.3320465087891 C 280.1133728027344 174.0451507568359 279.9598388671875 173.7934875488281 279.7306518554688 173.65478515625 L 281.7369995117188 170.5075988769531 C 282.0548095703125 170.0308990478516 282.2227783203125 169.4751892089844 282.2227783203125 168.900390625 C 282.2227783203125 167.3011169433594 280.9216613769531 166 279.3223571777344 166 Z M 279.3223571777344 174.5957336425781 C 279.1769714355469 174.5957336425781 279.0586853027344 174.4774322509766 279.0586853027344 174.3320465087891 C 279.0586853027344 174.1866607666016 279.1769714355469 174.0683746337891 279.3223571777344 174.0683746337891 C 279.4677734375 174.0683746337891 279.5860290527344 174.1866607666016 279.5860290527344 174.3320465087891 C 279.5860290527344 174.4774322509766 279.4677734375 174.5957336425781 279.3223571777344 174.5957336425781 Z M 281.2969055175781 170.217041015625 C 281.2958679199219 170.2186126708984 279.3223571777344 173.314208984375 279.3223571777344 173.314208984375 C 279.3223571777344 173.314208984375 277.348876953125 170.2185974121094 277.3478698730469 170.217041015625 C 277.087158203125 169.8268127441406 276.9492797851563 169.3715209960938 276.9492797851563 168.900390625 C 276.9492797851563 167.5918884277344 278.0138549804688 166.52734375 279.3223571777344 166.52734375 C 280.630859375 166.52734375 281.6954040527344 167.5918884277344 281.6954040527344 168.900390625 C 281.6954040527344 169.3715209960938 281.5576171875 169.8268127441406 281.2969055175781 170.217041015625 Z"  /></Svg>
            <Svg data-layer="4e24ee00-5262-43b5-9c40-2964025afacc" style={styles.menu_route_tracciato33} preserveAspectRatio="none" viewBox="352 226.00006103515625 2.63671875 2.63671875" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 353.3184204101563 226.0000610351563 C 352.5914306640625 226.0000610351563 352 226.5914611816406 352 227.3184204101563 C 352 228.0453491210938 352.5914306640625 228.6367797851563 353.3184204101563 228.6367797851563 C 354.0453186035156 228.6367797851563 354.63671875 228.0453491210938 354.63671875 227.3184204101563 C 354.63671875 226.5914611816406 354.0453186035156 226.0000610351563 353.3184204101563 226.0000610351563 Z M 353.3184204101563 228.1094207763672 C 352.8822021484375 228.1094207763672 352.52734375 227.7545776367188 352.52734375 227.3184204101563 C 352.52734375 226.8822326660156 352.8822021484375 226.5274047851563 353.3184204101563 226.5274047851563 C 353.7545776367188 226.5274047851563 354.109375 226.8822326660156 354.109375 227.3184204101563 C 354.109375 227.7545776367188 353.7545776367188 228.1094207763672 353.3184204101563 228.1094207763672 Z"  /></Svg>
            <Svg data-layer="8de0ae7e-fde7-4f80-bd96-b79b8676eb0f" style={styles.menu_route_ellisse1} preserveAspectRatio="none" viewBox="0 0 1 2" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 0.5 0 C 0.7761423587799072 0 1 0.4477152824401855 1 1 C 1 1.552284717559814 0.7761423587799072 2 0.5 2 C 0.2238576412200928 2 0 1.552284717559814 0 1 C 0 0.4477152824401855 0.2238576412200928 0 0.5 0 Z"  /></Svg>
        </View>
        <View data-layer="1ab8c328-8c33-4f97-bf08-7a1398480d56" style={styles.menu_raggruppa24}>
            <View data-layer="4556e7f2-5d49-401d-940e-c598773b1be8" style={styles.menu_raggruppa24_rettangolo15}></View>
        </View>
        <View data-layer="10e3e5e0-d684-4683-855a-adb2248fb403" style={styles.menu_rettangolo1}></View>
        <View data-layer="6855ef5f-c487-42c1-90cf-63158cd2ac92" style={styles.menu_raggruppa23}>
            <View data-layer="87e35e11-4efe-40ba-88b4-b49bc397cf39" style={styles.menu_raggruppa23_raggruppa1}>
                <Svg data-layer="d10d6183-3a8c-4927-9426-198a0514a9d9" style={styles.menu_raggruppa23_raggruppa1_linea1de355e88} preserveAspectRatio="none" viewBox="-1.5 -1.5 27.4444580078125 3" fill="transparent"><SvgPath d="M 0 0 L 24.44447898864746 0"  /></Svg>
                <Svg data-layer="979c1fad-49f4-4778-8503-98d35a75b3c2" style={styles.menu_raggruppa23_raggruppa1_linea2efbad5e9} preserveAspectRatio="none" viewBox="-1.5 -1.5 27.4444580078125 3" fill="transparent"><SvgPath d="M 0 0 L 24.44447898864746 0"  /></Svg>
                <Svg data-layer="7d4cf5c0-1b21-4c3f-bcab-e856f787865b" style={styles.menu_raggruppa23_raggruppa1_linea3e20160e6} preserveAspectRatio="none" viewBox="-1.5 -1.5 27.4444580078125 3" fill="transparent"><SvgPath d="M 0 0 L 24.44447898864746 0"  /></Svg>
            </View>
            <View data-layer="47cf1979-503f-40a5-a4f1-7a986261d6d9" style={styles.menu_raggruppa23_raggruppa22}>
                <Svg data-layer="c89c1ebe-076a-4976-9c7f-595c09bd4808" style={styles.menu_raggruppa23_raggruppa22_linea1} preserveAspectRatio="none" viewBox="-1.5 -1.5 3.25 3" fill="transparent"><SvgPath d="M 0 0 L 0.2500000596046448 0"  /></Svg>
                <Svg data-layer="8fb313de-9452-431b-84ec-9415cc3f2f5c" style={styles.menu_raggruppa23_raggruppa22_linea2} preserveAspectRatio="none" viewBox="-1.5 -1.5 3.25 3" fill="transparent"><SvgPath d="M 0 0 L 0.2500000596046448 0"  /></Svg>
                <Svg data-layer="e9b947af-8ad4-4ec9-9cd7-1a32840c7585" style={styles.menu_raggruppa23_raggruppa22_linea3} preserveAspectRatio="none" viewBox="-1.5 -1.5 3.25 3" fill="transparent"><SvgPath d="M 0 0 L 0.2500000596046448 0"  /></Svg>
            </View>
        </View>
        <View data-layer="f3ab0e24-64f9-4da6-ad5a-2476bfe4bbf2" style={styles.menu_homeIconSilhouette86859776}>
            <View data-layer="beee28c1-cef4-44ae-894b-4cfa19f84e3d" style={styles.menu_homeIconSilhouette86859776_raggruppa21470543fb}>
                <View data-layer="e775fb8e-bece-4049-bb5c-3731aaedccdc" style={styles.menu_homeIconSilhouette86859776_raggruppa21470543fb_raggruppa2025a01a7b}>
                    <Svg data-layer="8d2a2a2a-204e-4d7e-a5cc-a7877166db0a" style={styles.menu_homeIconSilhouette86859776_raggruppa21470543fb_raggruppa2025a01a7b_tracciato43fe07d011} preserveAspectRatio="none" viewBox="0.0005005598068237305 17.046607971191406 26.84765625 14.2095947265625" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 26.39752197265625 28.57500839233398 L 22.32862663269043 24.42302703857422 L 22.32862663269043 19.62679672241211 C 22.32862663269043 18.75957107543945 21.63992691040039 18.0567512512207 20.7888069152832 18.0567512512207 C 19.93963813781738 18.0567512512207 19.25093841552734 18.75957107543945 19.25093841552734 19.62679672241211 L 19.25093841552734 21.28255462646484 L 16.22132301330566 18.19096755981445 C 14.72345161437988 16.6633415222168 12.11915302276611 16.66604995727539 10.62469577789307 18.19373321533203 L 0.4509352445602417 28.57500839233398 C -0.1496443003416061 29.18906402587891 -0.1496443003416061 30.18265533447266 0.4509352445602417 30.79577255249023 C 1.051785707473755 31.40966796875 2.027389049530029 31.40966796875 2.628022909164429 30.79577255249023 L 12.80080699920654 20.41422271728516 C 13.13220310211182 20.07782745361328 13.71630859375 20.07782745361328 14.04597187042236 20.41322708129883 L 24.22049140930176 30.79577255249023 C 24.52218818664551 31.10274505615234 24.91553115844727 31.25543594360352 25.30876159667969 31.25543594360352 C 25.70280647277832 31.25543594360352 26.09679794311523 31.10258102416992 26.39757919311523 30.79577255249023 C 26.99837303161621 30.18270874023438 26.99837303161621 29.18912124633789 26.39752197265625 28.57500839233398 Z"  /></Svg>
                    <Svg data-layer="4d574954-9fbd-4fa9-a57b-3eff6f8539a6" style={styles.menu_homeIconSilhouette86859776_raggruppa21470543fb_raggruppa2025a01a7b_tracciato44} preserveAspectRatio="none" viewBox="68.62699890136719 127.74775695800781 19.256591796875 19.38861083984375" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 78.78598022460938 127.9738311767578 C 78.49271392822266 127.6723937988281 78.01787567138672 127.6723937988281 77.72547149658203 127.9738311767578 L 68.84664916992188 137.1027069091797 C 68.70647430419922 137.246826171875 68.62699890136719 137.4435882568359 68.62699890136719 137.6489105224609 L 68.62699890136719 144.3071746826172 C 68.62699890136719 145.8695831298828 69.8587646484375 147.1363677978516 71.37787628173828 147.1363677978516 L 75.77378082275391 147.1363677978516 L 75.77378082275391 140.1347351074219 L 80.7366943359375 140.1347351074219 L 80.7366943359375 147.1363677978516 L 85.13266754150391 147.1363677978516 C 86.65172576904297 147.1363677978516 87.88349151611328 145.8695831298828 87.88349151611328 144.3072509765625 L 87.88349151611328 137.6489105224609 C 87.88349151611328 137.4435882568359 87.80471038818359 137.246826171875 87.66384124755859 137.1027069091797 L 78.78598022460938 127.9738311767578 Z"  /></Svg>
                </View>
            </View>
        </View>
        <View data-layer="07f9c541-0cf7-425e-a5ef-e1f8e71ac42a" style={styles.menu_homeIconSilhouette5c64c588}>
            <View data-layer="baff4d47-7af1-4539-b5d4-252b44bb253b" style={styles.menu_homeIconSilhouette5c64c588_raggruppa21e7d06b01}>
                <View data-layer="0df0b2d7-c86a-49f6-9e7c-ff1e3d9d3306" style={styles.menu_homeIconSilhouette5c64c588_raggruppa21e7d06b01_raggruppa2051d77708}>
                    <Svg data-layer="1d3e5efa-0399-44f5-9b79-de0677f761f8" style={styles.menu_homeIconSilhouette5c64c588_raggruppa21e7d06b01_raggruppa2051d77708_tracciato43501db71e} preserveAspectRatio="none" viewBox="0.0005005896091461182 17.046607971191406 25 12.9669189453125" fill="rgba(25, 25, 25, 1)"><SvgPath d="M 24.58086776733398 27.56681060791016 C 18.98395347595215 21.8856201171875 17.38699531555176 20.06052780151367 15.10500049591064 18.09089088439941 C 13.71021270751953 16.69685935974121 11.28514289855957 16.69933128356934 9.893533706665039 18.09341430664063 L 0.4199361503124237 27.56681060791016 C -0.1393112689256668 28.12716484069824 -0.1393112689256668 29.03386116027832 0.4199361503124237 29.59336090087891 C 0.9794358015060425 30.1535701751709 1.887897610664368 30.1535701751709 2.447195529937744 29.59336090087891 L 11.91988468170166 20.11971664428711 C 12.22847461700439 19.8127384185791 12.77238178253174 19.8127384185791 13.0793571472168 20.11880493164063 L 22.55366134643555 29.59336090087891 C 22.8345947265625 29.87348937988281 23.20086860656738 30.01282691955566 23.56703758239746 30.01282691955566 C 23.93396377563477 30.01282691955566 24.30083847045898 29.87333869934082 24.5809211730957 29.59336090087891 C 25.1403694152832 29.03391265869141 25.1403694152832 28.12721633911133 24.58086776733398 27.56681060791016 Z"  /></Svg>
                </View>
            </View>
        </View>
        <View data-layer="1345ea7c-aa53-4294-b8ac-ef66c06e4172" style={styles.menu_raggruppa25}>
            <View data-layer="2b428d85-b4f5-49b9-9c7a-5f80482ffc42" style={styles.menu_raggruppa25_homeIconSilhouetteb02fba53}>
                <View data-layer="8216d4f3-1832-4ba5-807d-f244cceb600e" style={styles.menu_raggruppa25_homeIconSilhouetteb02fba53_raggruppa21deb6a5af}>
                    <View data-layer="3553325d-977e-44b7-9efb-3f7d3d1fdac6" style={styles.menu_raggruppa25_homeIconSilhouetteb02fba53_raggruppa21deb6a5af_raggruppa208eb579df}>
                        <Svg data-layer="ffc23afc-efa3-4f41-a744-258f8ca42d07" style={styles.menu_raggruppa25_homeIconSilhouetteb02fba53_raggruppa21deb6a5af_raggruppa208eb579df_tracciato4305556ace} preserveAspectRatio="none" viewBox="0.0005005896091461182 17.046607971191406 25 12.9669189453125" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 24.58086776733398 27.56681060791016 C 18.98395347595215 21.8856201171875 17.38699531555176 20.06052780151367 15.10500049591064 18.09089088439941 C 13.71021270751953 16.69685935974121 11.28514289855957 16.69933128356934 9.893533706665039 18.09341430664063 L 0.4199361503124237 27.56681060791016 C -0.1393112689256668 28.12716484069824 -0.1393112689256668 29.03386116027832 0.4199361503124237 29.59336090087891 C 0.9794358015060425 30.1535701751709 1.887897610664368 30.1535701751709 2.447195529937744 29.59336090087891 L 11.91988468170166 20.11971664428711 C 12.22847461700439 19.8127384185791 12.77238178253174 19.8127384185791 13.0793571472168 20.11880493164063 L 22.55366134643555 29.59336090087891 C 22.8345947265625 29.87348937988281 23.20086860656738 30.01282691955566 23.56703758239746 30.01282691955566 C 23.93396377563477 30.01282691955566 24.30083847045898 29.87333869934082 24.5809211730957 29.59336090087891 C 25.1403694152832 29.03391265869141 25.1403694152832 28.12721633911133 24.58086776733398 27.56681060791016 Z"  /></Svg>
                    </View>
                </View>
            </View>
            <View data-layer="7542f9cd-2a32-4f34-b1aa-8aa88da75782" style={styles.menu_raggruppa25_homeIconSilhouette}>
                <View data-layer="b3f0e47b-5521-431e-a9f7-4981f2181fe5" style={styles.menu_raggruppa25_homeIconSilhouette_raggruppa21}>
                    <View data-layer="091d0c1b-06b5-4ba5-a9c5-c6a55906a056" style={styles.menu_raggruppa25_homeIconSilhouette_raggruppa21_raggruppa20}>
                        <Svg data-layer="c71ff90d-f547-4d9d-ab07-3696784154c9" style={styles.menu_raggruppa25_homeIconSilhouette_raggruppa21_raggruppa20_tracciato43} preserveAspectRatio="none" viewBox="0.0005005896091461182 17.046607971191406 25 12.9669189453125" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 24.58086776733398 27.56681060791016 C 18.98395347595215 21.8856201171875 17.38699531555176 20.06052780151367 15.10500049591064 18.09089088439941 C 13.71021270751953 16.69685935974121 11.28514289855957 16.69933128356934 9.893533706665039 18.09341430664063 L 0.4199361503124237 27.56681060791016 C -0.1393112689256668 28.12716484069824 -0.1393112689256668 29.03386116027832 0.4199361503124237 29.59336090087891 C 0.9794358015060425 30.1535701751709 1.887897610664368 30.1535701751709 2.447195529937744 29.59336090087891 L 11.91988468170166 20.11971664428711 C 12.22847461700439 19.8127384185791 12.77238178253174 19.8127384185791 13.0793571472168 20.11880493164063 L 22.55366134643555 29.59336090087891 C 22.8345947265625 29.87348937988281 23.20086860656738 30.01282691955566 23.56703758239746 30.01282691955566 C 23.93396377563477 30.01282691955566 24.30083847045898 29.87333869934082 24.5809211730957 29.59336090087891 C 25.1403694152832 29.03391265869141 25.1403694152832 28.12721633911133 24.58086776733398 27.56681060791016 Z"  /></Svg>
                    </View>
                </View>
            </View>
        </View>
        <View data-layer="21b7f9f6-a66f-44f8-90ab-f799055b4f8d" style={styles.menu_user}>
            <Svg data-layer="14a19f87-a0db-4084-89e0-d8bd9a042f74" style={styles.menu_user_tracciato1} preserveAspectRatio="none" viewBox="87.03169250488281 0.00019073486328125 12.70263671875 12.7022705078125" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 93.38301086425781 12.70242500305176 C 95.12806701660156 12.70242500305176 96.63894653320313 12.0765495300293 97.87379455566406 10.84169101715088 C 99.10825347900391 9.607035636901855 99.73432922363281 8.09636116027832 99.73432922363281 6.351107597351074 C 99.73432922363281 4.60645580291748 99.10845184326172 3.095580339431763 97.87359619140625 1.860521912574768 C 96.63873291015625 0.6260660886764526 95.12786102294922 0.00019073486328125 93.38301086425781 0.00019073486328125 C 91.63775634765625 0.00019073486328125 90.1270751953125 0.6260660290718079 88.89242553710938 1.860722541809082 C 87.65777587890625 3.095379590988159 87.03169250488281 4.606255054473877 87.03169250488281 6.351107597351074 C 87.03169250488281 8.09636116027832 87.65777587890625 9.607241630554199 88.89242553710938 10.84189319610596 C 90.12747955322266 12.07634925842285 91.63835906982422 12.70242500305176 93.38301086425781 12.70242500305176 Z M 89.98524475097656 2.953341007232666 C 90.93260955810547 2.005975723266602 92.0439453125 1.545470356941223 93.38301086425781 1.545470356941223 C 94.72187805175781 1.545470356941223 95.83340454101563 2.00597620010376 96.78097534179688 2.953341007232666 C 97.72834777832031 3.900906801223755 98.18904876708984 5.012441158294678 98.18904876708984 6.351107597351074 C 98.18904876708984 7.690176010131836 97.72834777832031 8.801504135131836 96.78097534179688 9.749075889587402 C 95.83341217041016 10.69664096832275 94.72187805175781 11.15714550018311 93.38301086425781 11.15714550018311 C 92.04434204101563 11.15714550018311 90.93301391601563 10.69643878936768 89.98524475097656 9.749075889587402 C 89.03767395019531 8.801711082458496 88.57696533203125 7.690176963806152 88.57696533203125 6.351108074188232 C 88.57696533203125 5.012441635131836 89.03767395019531 3.900912284851074 89.98524475097656 2.953341245651245 Z M 89.98524475097656 2.953341007232666"  /></Svg>
            <Svg data-layer="07f20b8e-899f-400c-8258-e096c1d99564" style={styles.menu_user_tracciato2} preserveAspectRatio="none" viewBox="-0.00017654895782470703 247.3162841796875 22 13.63189697265625" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 21.94659042358398 254.8555755615234 C 21.91098213195801 254.3417663574219 21.83896064758301 253.78125 21.73293685913086 253.1893768310547 C 21.62590599060059 252.5930786132813 21.48809814453125 252.0293579101563 21.32312774658203 251.5141296386719 C 21.15252494812012 250.9816131591797 20.92096519470215 250.4557189941406 20.63428115844727 249.9517517089844 C 20.33713340759277 249.4286804199219 19.98788070678711 248.9732055664063 19.59597778320313 248.5984191894531 C 19.18617057800293 248.206298828125 18.68442344665527 247.8910522460938 18.10421562194824 247.6611022949219 C 17.52601623535156 247.4323577880859 16.88525199890137 247.3164825439453 16.1998233795166 247.3164825439453 C 15.93064117431641 247.3164825439453 15.67030811309814 247.4269256591797 15.16755676269531 247.7542572021484 C 14.8581371307373 247.9560394287109 14.49620914459229 248.1894073486328 14.09223747253418 248.4475250244141 C 13.74680709838867 248.6676177978516 13.27885723114014 248.8738403320313 12.70086288452148 249.0605163574219 C 12.1369514465332 249.2429962158203 11.56438541412354 249.3355407714844 10.99906253814697 249.3355407714844 C 10.43414115905762 249.3355407714844 9.861579895019531 249.2429962158203 9.297262191772461 249.0605163574219 C 8.719871520996094 248.8740234375 8.251717567443848 248.6678161621094 7.906893253326416 248.4477233886719 C 7.506742000579834 248.1920166015625 7.144613265991211 247.9586486816406 6.830569744110107 247.7540435791016 C 6.328217506408691 247.4267272949219 6.067888259887695 247.3162841796875 5.798704624176025 247.3162841796875 C 5.113075733184814 247.3162841796875 4.472512245178223 247.4323577880859 3.894513607025146 247.6613006591797 C 3.31470775604248 247.8908386230469 2.812757730484009 248.2061004638672 2.402544736862183 248.5986022949219 C 2.010641813278198 248.9736022949219 1.661391258239746 249.4288940429688 1.364442467689514 249.9517517089844 C 1.078160643577576 250.4557189941406 0.8463981747627258 250.9814147949219 0.6757957935333252 251.5143432617188 C 0.5110275745391846 252.0295715332031 0.373217910528183 252.5930786132813 0.2661888003349304 253.1893768310547 C 0.1599646657705307 253.7804565429688 0.08814270049333572 254.3411407470703 0.05253328755497932 254.8561706542969 C 0.01752758026123047 255.3597412109375 -0.000176548957824707 255.8838043212891 -0.000176548957824707 256.413330078125 C -0.000176548957824707 257.789794921875 0.4373942911624908 258.9041442871094 1.300264596939087 259.7259826660156 C 2.152473449707031 260.5369567871094 3.279896259307861 260.9481811523438 4.651354312896729 260.9481811523438 L 17.34834671020508 260.9481811523438 C 18.71940231323242 260.9481811523438 19.84682464599609 260.5369567871094 20.6992359161377 259.7259826660156 C 21.56230735778809 258.90478515625 21.99987983703613 257.7900085449219 21.99987983703613 256.4131164550781 C 21.99967575073242 255.8817901611328 21.98177337646484 255.3577270507813 21.94656372070313 254.8555755615234 Z M 19.63379859924316 258.6064147949219 C 19.0706901550293 259.1423645019531 18.32310104370117 259.4028930664063 17.34816932678223 259.4028930664063 L 4.651383399963379 259.4028930664063 C 3.6762535572052 259.4028930664063 2.928662300109863 259.142333984375 2.365754127502441 258.6066284179688 C 1.813506960868835 258.0809326171875 1.545131921768188 257.3633117675781 1.545131921768188 256.413330078125 C 1.545131921768188 255.9192199707031 1.561427593231201 255.4313659667969 1.594019055366516 254.9629974365234 C 1.625805974006653 254.5035095214844 1.690788149833679 253.9987335205078 1.787154078483582 253.4623870849609 C 1.88231348991394 252.9326782226563 2.003424882888794 252.435546875 2.147470951080322 251.9855041503906 C 2.285682916641235 251.5539703369141 2.474190711975098 251.1266784667969 2.707963943481445 250.7150421142578 C 2.931074857711792 250.3227386474609 3.187783241271973 249.9861755371094 3.471046924591064 249.7149658203125 C 3.736003637313843 249.4612731933594 4.069965839385986 249.253662109375 4.463476657867432 249.0979309082031 C 4.827415466308594 248.9538879394531 5.236417293548584 248.8750305175781 5.680427074432373 248.8631591796875 C 5.73454475402832 248.8919219970703 5.830911159515381 248.9468383789063 5.9870285987854 249.0486450195313 C 6.304695129394531 249.2556610107422 6.670844554901123 249.4918518066406 7.075623989105225 249.7503662109375 C 7.531904697418213 250.0412750244141 8.119757652282715 250.3040313720703 8.822087287902832 250.53076171875 C 9.540106773376465 250.7629089355469 10.27241230010986 250.8807983398438 10.99927806854248 250.8807983398438 C 11.72614860534668 250.8807983398438 12.45865058898926 250.7629089355469 13.17626762390137 250.5309600830078 C 13.87919521331787 250.3038330078125 14.46685123443604 250.0412750244141 14.92373561859131 249.7499694824219 C 15.33796977996826 249.4851989746094 15.6938591003418 249.255859375 16.01152801513672 249.0486450195313 C 16.16764640808105 248.9470520019531 16.26401138305664 248.8919219970703 16.31812858581543 248.8631591796875 C 16.7623405456543 248.8750305175781 17.17134284973145 248.9538879394531 17.53548049926758 249.0979309082031 C 17.92879104614258 249.253662109375 18.26275444030762 249.4614562988281 18.5277099609375 249.7149658203125 C 18.81097221374512 249.9859619140625 19.06768417358398 250.3225402832031 19.29079437255859 250.7152404785156 C 19.5247688293457 251.1266784667969 19.71347618103027 251.5541687011719 19.85148620605469 251.9853057861328 C 19.99573516845703 252.4359436035156 20.11704635620117 252.932861328125 20.21200561523438 253.4621887207031 C 20.30817031860352 253.9995422363281 20.37335014343262 254.5045166015625 20.4051399230957 254.9631958007813 L 20.4051399230957 254.9635925292969 C 20.43793296813965 255.4301452636719 20.45442771911621 255.9178009033203 20.45462799072266 256.413330078125 C 20.45442771911621 257.363525390625 20.1860523223877 258.0809326171875 19.6338062286377 258.6064147949219 Z M 19.63379859924316 258.6064147949219"  /></Svg>
        </View>

        <Text data-layer="6b4f094d-7a98-4f46-8168-114075edf8bc" style={styles.menu_login}>Login</Text>

        <Text data-layer="182cd424-1749-4537-aa34-625797d50ddd" style={styles.menu_lesDestinations}>Les destinations</Text>
        <Text data-layer="136634cf-fb1c-4a78-9645-c35019a9c6bb" style={styles.menu_manger}>Manger</Text>
        <Text data-layer="522821e9-662a-4e1b-8559-7734fb8ba688" style={styles.menu_visiter}>Visiter</Text>
        <Text data-layer="3de0e5d0-96b2-43ef-a2fc-1620ea07e912" style={styles.menu_samuser}>S'amuser</Text>
        <Text data-layer="8c4eafea-e1bb-4bf7-85bb-9ce6b68bcb32" style={styles.menu_dormir}>Dormir</Text>
        <Text data-layer="9860dbc4-fc0b-447d-81b5-fbf69fd44414" style={styles.menu_visitezLaCote}>Visitez la Cote</Text>
        <Text data-layer="bcc76d78-aa17-4d68-8226-b19851a22884" style={styles.menu_adherer}>Adherer</Text>
        <Text data-layer="73f5172f-10f5-440a-972d-5867b8eca703" style={styles.menu_contact}>Contact</Text>
        <View data-layer="0c59192f-30d0-4734-bd94-1160d7d99e8f" style={styles.menu_raggruppa6}>
            <Svg data-layer="1857a761-ac14-4ea8-b7f0-277490f54de8" style={styles.menu_raggruppa6_linea4badcd306} preserveAspectRatio="none" viewBox="-1.41412353515625 -1.414154052734375 7.728271484375 7.828277587890625" fill="transparent"><SvgPath d="M 0 0 L 4.900020122528076 4.999995708465576"  /></Svg>
            <Svg data-layer="cefcd822-ddf9-4f3c-b356-8d563465e504" style={styles.menu_raggruppa6_linea534e4c214} preserveAspectRatio="none" viewBox="-1.41412353515625 -1.414154052734375 7.728271484375 7.828277587890625" fill="transparent"><SvgPath d="M 4.900020122528076 0 L 0 4.999995708465576"  /></Svg>
        </View>
        <View data-layer="c42868ef-df7c-4743-882d-64c554744f69" style={styles.menu_raggruppa31}>
            <Svg data-layer="3106dda0-b74d-4b6d-937e-46403484c0d0" style={styles.menu_raggruppa31_linea4} preserveAspectRatio="none" viewBox="-1.41412353515625 -1.41412353515625 7.728271484375 7.8282470703125" fill="transparent"><SvgPath d="M 0 0 L 4.900020122528076 4.999995708465576"  /></Svg>
            <Svg data-layer="006a0275-9507-4bab-ae02-8a9bdea6f304" style={styles.menu_raggruppa31_linea5} preserveAspectRatio="none" viewBox="-1.41412353515625 -1.41412353515625 7.728271484375 7.8282470703125" fill="transparent"><SvgPath d="M 4.900020122528076 0 L 0 4.999995708465576"  /></Svg>
        </View>
        <View data-layer="e63e2de3-46e8-4ac2-bb18-785160cef5f4" style={styles.menu_raggruppa33}>
            <Svg data-layer="0bb859b8-633e-47a7-bf4e-c2b499747a08" style={styles.menu_raggruppa33_tracciato9} preserveAspectRatio="none" viewBox="1045.76513671875 1234.25 9.7821044921875 11.012451171875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 1050.043334960938 1244.512451171875 C 1049.737060546875 1244.3935546875 1049.418212890625 1244.3115234375 1049.1162109375 1244.178833007813 C 1048.645874023438 1243.972534179688 1048.264526367188 1243.654174804688 1047.90576171875 1243.2939453125 C 1047.58642578125 1242.973388671875 1047.3251953125 1242.61669921875 1047.107788085938 1242.22216796875 C 1046.783813476563 1241.63427734375 1046.597900390625 1241.004272460938 1046.54248046875 1240.339233398438 C 1046.484008789063 1239.638671875 1046.51025390625 1238.940673828125 1046.711303710938 1238.259887695313 C 1046.878662109375 1237.692749023438 1047.138549804688 1237.17236328125 1047.48974609375 1236.69384765625 C 1047.844482421875 1236.210571289063 1048.29345703125 1235.83251953125 1048.778076171875 1235.492919921875 C 1048.895141601563 1235.410766601563 1049.036865234375 1235.353271484375 1049.175659179688 1235.315307617188 C 1049.418701171875 1235.248901367188 1049.627319335938 1235.081787109375 1049.890991210938 1235.077880859375 C 1049.924926757813 1235.077392578125 1049.951904296875 1235.041137695313 1049.95556640625 1235 L 1051.314453125 1235 C 1051.321411132813 1235.041381835938 1051.35107421875 1235.070434570313 1051.386840820313 1235.071166992188 C 1051.65673828125 1235.076904296875 1051.877075195313 1235.235229492188 1052.124633789063 1235.30908203125 C 1052.27001953125 1235.3525390625 1052.419067382813 1235.409423828125 1052.542358398438 1235.4951171875 C 1052.919677734375 1235.7578125 1053.277954101563 1236.044311523438 1053.585205078125 1236.3916015625 C 1053.884155273438 1236.729858398438 1054.131958007813 1237.103393554688 1054.32421875 1237.506713867188 C 1054.644287109375 1238.178466796875 1054.79443359375 1238.89453125 1054.797119140625 1239.64111328125 C 1054.79931640625 1240.263427734375 1054.744262695313 1240.874633789063 1054.535400390625 1241.467895507813 C 1054.351196289063 1241.991821289063 1054.095703125 1242.469970703125 1053.75341796875 1242.910766601563 C 1053.358032226563 1243.420166015625 1052.880004882813 1243.827758789063 1052.31787109375 1244.126953125 C 1051.978515625 1244.307861328125 1051.597900390625 1244.404174804688 1051.226806640625 1244.512451171875 L 1050.043334960938 1244.512451171875 Z M 1053.55224609375 1239.782836914063 C 1053.578979492188 1239.1591796875 1053.421142578125 1238.50244140625 1053.083251953125 1237.927001953125 C 1052.671508789063 1237.2255859375 1052.09814453125 1236.703002929688 1051.309814453125 1236.503173828125 C 1050.526245117188 1236.304565429688 1049.774291992188 1236.438598632813 1049.109619140625 1236.947631835938 C 1048.410888671875 1237.482788085938 1047.978515625 1238.175903320313 1047.821655273438 1239.03955078125 C 1047.687133789063 1239.780029296875 1047.74169921875 1240.505004882813 1048.036499023438 1241.202880859375 C 1048.210693359375 1241.614990234375 1048.482299804688 1241.954711914063 1048.7841796875 1242.287353515625 C 1049.16943359375 1242.711791992188 1049.654296875 1242.943115234375 1050.177734375 1243.046752929688 C 1050.607666015625 1243.131958007813 1051.05908203125 1243.110107421875 1051.50537109375 1242.9462890625 C 1052.015747070313 1242.7587890625 1052.422607421875 1242.455810546875 1052.757934570313 1242.054809570313 C 1053.304077148438 1241.401977539063 1053.573486328125 1240.64013671875 1053.55224609375 1239.782836914063 Z"  /></Svg>
            <Svg data-layer="3a25c0c3-5f6a-45f1-bb6f-67be2e87772d" style={styles.menu_raggruppa33_tracciato10} preserveAspectRatio="none" viewBox="2355.4609375 1236.9581298828125 8.110107421875 10.81005859375" fill="rgba(34, 171, 225, 1)"><SvgPath d="M 2361.6005859375 1246.970092773438 C 2361.595458984375 1246.328125 2361.582763671875 1245.68603515625 2361.589599609375 1245.044189453125 C 2361.591552734375 1244.85888671875 2361.53564453125 1244.813720703125 2361.3564453125 1244.81591796875 C 2360.575439453125 1244.825439453125 2359.7939453125 1244.822265625 2359.0126953125 1244.818359375 C 2358.8876953125 1244.817749023438 2358.814453125 1244.837280273438 2358.74462890625 1244.968017578125 C 2358.39990234375 1245.614013671875 2358.03125 1246.247192382813 2357.681396484375 1246.890625 C 2357.630859375 1246.983154296875 2357.5849609375 1247.015991210938 2357.4853515625 1247.015014648438 C 2357.113037109375 1247.01123046875 2356.740478515625 1247.010009765625 2356.3681640625 1247.01806640625 C 2356.20068359375 1247.021606445313 2356.17626953125 1246.962524414063 2356.25146484375 1246.827514648438 C 2356.716552734375 1245.9931640625 2357.18408203125 1245.160034179688 2357.645263671875 1244.323486328125 C 2358.046875 1243.59521484375 2358.4384765625 1242.861328125 2358.840087890625 1242.132934570313 C 2359.242431640625 1241.403442382813 2359.654296875 1240.679077148438 2360.05712890625 1239.949951171875 C 2360.400390625 1239.329223632813 2360.736328125 1238.704223632813 2361.078125 1238.08251953125 C 2361.13037109375 1237.9873046875 2361.19677734375 1237.899536132813 2361.256591796875 1237.808349609375 C 2361.3154296875 1237.798217773438 2361.333984375 1237.763793945313 2361.3173828125 1237.708129882813 L 2361.326171875 1237.714599609375 C 2361.740234375 1237.716796875 2362.154541015625 1237.720458984375 2362.568359375 1237.7197265625 C 2362.665771484375 1237.719482421875 2362.7578125 1237.718872070313 2362.821044921875 1237.808471679688 L 2362.821044921875 1238.071533203125 C 2362.760009765625 1238.130004882813 2362.760009765625 1238.188354492188 2362.821044921875 1238.246826171875 L 2362.821044921875 1246.444213867188 C 2362.77734375 1246.473388671875 2362.77734375 1246.502563476563 2362.821044921875 1246.531860351563 L 2362.821044921875 1246.663330078125 C 2362.77734375 1246.692626953125 2362.77734375 1246.721801757813 2362.821044921875 1246.751098632813 L 2362.821044921875 1246.838745117188 C 2362.770263671875 1246.935913085938 2362.700439453125 1246.977783203125 2362.581298828125 1246.973754882813 C 2362.254638671875 1246.963134765625 2361.927490234375 1246.970092773438 2361.6005859375 1246.970092773438 Z M 2361.583740234375 1239.946899414063 L 2361.53662109375 1239.935791015625 C 2361.5029296875 1239.982055664063 2361.46337890625 1240.025268554688 2361.43603515625 1240.075073242188 C 2361.136962890625 1240.619995117188 2360.840087890625 1241.166015625 2360.541748046875 1241.711303710938 C 2360.260986328125 1242.223999023438 2359.98291015625 1242.738037109375 2359.69580078125 1243.247314453125 C 2359.616943359375 1243.386962890625 2359.64990234375 1243.41796875 2359.79736328125 1243.416748046875 C 2360.3291015625 1243.411987304688 2360.861328125 1243.408569335938 2361.3935546875 1243.417602539063 C 2361.550537109375 1243.420288085938 2361.58837890625 1243.3681640625 2361.587646484375 1243.21875 C 2361.581787109375 1242.176391601563 2361.583984375 1241.134033203125 2361.583740234375 1240.091674804688 C 2361.583740234375 1240.04345703125 2361.583740234375 1239.9951171875 2361.583740234375 1239.946899414063 Z"  /></Svg>
            <Svg data-layer="e85116c0-c665-4112-afa3-61f792228c12" style={styles.menu_raggruppa33_tracciato11} preserveAspectRatio="none" viewBox="1912.47705078125 1236.1387939453125 7.2958984375 10.9295654296875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 1915.671875 1246.318359375 C 1915.48583984375 1246.193115234375 1915.260375976563 1246.170532226563 1915.05810546875 1246.073974609375 C 1914.202026367188 1245.6650390625 1913.697387695313 1244.976196289063 1913.40234375 1244.109375 C 1913.250610351563 1243.663330078125 1913.231567382813 1243.19384765625 1913.231323242188 1242.725830078125 C 1913.230224609375 1240.86376953125 1913.232421875 1239.001708984375 1913.22705078125 1237.1396484375 C 1913.2265625 1236.959228515625 1913.259765625 1236.874633789063 1913.46533203125 1236.891357421875 C 1913.7119140625 1236.911376953125 1913.962646484375 1236.9111328125 1914.209350585938 1236.8916015625 C 1914.425659179688 1236.87451171875 1914.49365234375 1236.93115234375 1914.491088867188 1237.161865234375 C 1914.477783203125 1238.366577148438 1914.484375 1239.571533203125 1914.484252929688 1240.7763671875 C 1914.484130859375 1241.543212890625 1914.474731445313 1242.31005859375 1914.488159179688 1243.07666015625 C 1914.4990234375 1243.695922851563 1914.752685546875 1244.208251953125 1915.243286132813 1244.594360351563 C 1915.61767578125 1244.888916015625 1916.0595703125 1244.965698242188 1916.499389648438 1244.85595703125 C 1916.904174804688 1244.755126953125 1917.231201171875 1244.489135742188 1917.46240234375 1244.126708984375 C 1917.701293945313 1243.752319335938 1917.7861328125 1243.344116210938 1917.784057617188 1242.900390625 C 1917.774780273438 1240.97998046875 1917.781982421875 1239.059448242188 1917.776000976563 1237.138916015625 C 1917.775512695313 1236.95849609375 1917.80419921875 1236.875610351563 1918.011474609375 1236.890625 C 1918.294799804688 1236.911010742188 1918.580810546875 1236.90087890625 1918.865356445313 1236.893676757813 C 1918.99072265625 1236.890625 1919.0234375 1236.930541992188 1919.02294921875 1237.056884765625 C 1919.017333984375 1239.006713867188 1919.008056640625 1240.956298828125 1919.021240234375 1242.905883789063 C 1919.02587890625 1243.592529296875 1918.900268554688 1244.238525390625 1918.556396484375 1244.829345703125 C 1918.375 1245.140991210938 1918.13232421875 1245.41259765625 1917.861083984375 1245.656494140625 C 1917.470825195313 1246.00732421875 1917.00341796875 1246.193359375 1916.5048828125 1246.318359375 L 1915.671875 1246.318359375 Z"  /></Svg>
            <Svg data-layer="1f31803b-34b9-4282-ae44-d0def3753089" style={styles.menu_raggruppa33_tracciato12} preserveAspectRatio="none" viewBox="1248.348876953125 1234.25 6.9124755859375 11.012451171875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 1251.286376953125 1244.512451171875 C 1251.0654296875 1244.394165039063 1250.815673828125 1244.360473632813 1250.5849609375 1244.256469726563 C 1249.89501953125 1243.945434570313 1249.414672851563 1243.45263671875 1249.123291015625 1242.762084960938 C 1249.0810546875 1242.662231445313 1249.091552734375 1242.584838867188 1249.20068359375 1242.556640625 C 1249.5185546875 1242.474853515625 1249.8017578125 1242.311157226563 1250.099853515625 1242.183471679688 C 1250.212890625 1242.135009765625 1250.269897460938 1242.171142578125 1250.301391601563 1242.2646484375 C 1250.481079101563 1242.79638671875 1251.364013671875 1243.146606445313 1251.900024414063 1243.090576171875 C 1252.357666015625 1243.042724609375 1252.727905273438 1242.86279296875 1253.016723632813 1242.508056640625 C 1253.349731445313 1242.099487304688 1253.357421875 1241.458251953125 1252.884765625 1241.069091796875 C 1252.443481445313 1240.705810546875 1251.919799804688 1240.541259765625 1251.396484375 1240.35546875 C 1250.647216796875 1240.089233398438 1249.954345703125 1239.72021484375 1249.494018554688 1239.0380859375 C 1249.183227539063 1238.577880859375 1249.060913085938 1238.052856445313 1249.109008789063 1237.501586914063 C 1249.16162109375 1236.89892578125 1249.309326171875 1236.325073242188 1249.741943359375 1235.864501953125 C 1249.950561523438 1235.642333984375 1250.168701171875 1235.42919921875 1250.45654296875 1235.318481445313 C 1250.67724609375 1235.233642578125 1250.873291015625 1235.081787109375 1251.121337890625 1235.067016601563 C 1251.15625 1235.06494140625 1251.189453125 1235.04150390625 1251.19873046875 1235 C 1251.59326171875 1235 1251.987670898438 1235 1252.38232421875 1235 C 1252.632080078125 1235.100830078125 1252.88134765625 1235.203491210938 1253.131958007813 1235.302124023438 C 1253.484497070313 1235.44091796875 1253.745971679688 1235.695434570313 1253.9951171875 1235.968017578125 C 1254.054443359375 1236.032958984375 1254.033935546875 1236.079345703125 1253.987426757813 1236.136108398438 C 1253.75439453125 1236.42041015625 1253.482666015625 1236.6669921875 1253.2216796875 1236.923950195313 C 1253.176513671875 1236.968505859375 1253.128173828125 1236.952880859375 1253.0751953125 1236.904296875 C 1252.588623046875 1236.45654296875 1252.008422851563 1236.349365234375 1251.374755859375 1236.451904296875 C 1250.699340820313 1236.561279296875 1250.22412109375 1237.224365234375 1250.364624023438 1237.861083984375 C 1250.445556640625 1238.227294921875 1250.701171875 1238.460693359375 1251.00048828125 1238.64599609375 C 1251.421997070313 1238.906860351563 1251.904418945313 1239.024658203125 1252.362060546875 1239.201416015625 C 1253.050537109375 1239.467529296875 1253.670288085938 1239.848266601563 1254.090698242188 1240.477294921875 C 1254.580322265625 1241.210083007813 1254.627075195313 1242.005737304688 1254.311279296875 1242.80908203125 C 1254.042114257813 1243.49365234375 1253.55517578125 1243.984252929688 1252.86865234375 1244.287231445313 C 1252.664794921875 1244.377075195313 1252.44384765625 1244.404541015625 1252.250732421875 1244.512451171875 L 1251.286376953125 1244.512451171875 Z"  /></Svg>
            <Svg data-layer="99fbc75f-b059-4b6c-9c30-7950ec544221" style={styles.menu_raggruppa33_tracciato13} preserveAspectRatio="none" viewBox="906.2501220703125 1234.25 7.0264892578125 11.012451171875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 911.7781982421875 1235 C 911.8019409179688 1235.0986328125 911.8839111328125 1235.08740234375 911.9542846679688 1235.08837890625 C 912.1436767578125 1235.0908203125 912.283935546875 1235.2294921875 912.461181640625 1235.266357421875 C 912.5391235351563 1235.282592773438 912.5225830078125 1235.355712890625 912.522705078125 1235.411499023438 C 912.523681640625 1235.86376953125 912.5232543945313 1236.316162109375 912.5232543945313 1236.788696289063 C 912.3359375 1236.717041015625 912.1619873046875 1236.655517578125 911.9918212890625 1236.584594726563 C 911.4232177734375 1236.347900390625 910.862548828125 1236.372314453125 910.2852783203125 1236.576782226563 C 909.8695068359375 1236.72412109375 909.5315551757813 1236.959228515625 909.2276611328125 1237.269409179688 C 908.6898193359375 1237.818115234375 908.381103515625 1238.47119140625 908.276123046875 1239.228637695313 C 908.1786499023438 1239.932006835938 908.2643432617188 1240.61083984375 908.549560546875 1241.259033203125 C 908.771240234375 1241.762817382813 909.10498046875 1242.1826171875 909.5379028320313 1242.529663085938 C 910.141845703125 1243.013916015625 910.830322265625 1243.149291992188 911.5775146484375 1243.06298828125 C 911.84619140625 1243.031982421875 912.0888671875 1242.905395507813 912.329345703125 1242.794311523438 C 912.5159301757813 1242.708129882813 912.5302734375 1242.7626953125 912.5260009765625 1242.92822265625 C 912.517822265625 1243.249267578125 912.523681640625 1243.570556640625 912.523681640625 1243.891845703125 C 912.523681640625 1244.246826171875 912.489013671875 1244.2880859375 912.1412353515625 1244.3857421875 C 911.9910888671875 1244.427856445313 911.8291015625 1244.428955078125 911.6905517578125 1244.512451171875 L 910.55078125 1244.512451171875 C 910.3306884765625 1244.390258789063 910.0782470703125 1244.36181640625 909.8442993164063 1244.275390625 C 909.2528076171875 1244.056518554688 908.777587890625 1243.69677734375 908.3475341796875 1243.25048828125 C 907.6729125976563 1242.550415039063 907.266357421875 1241.719482421875 907.0897827148438 1240.76953125 C 907.0797729492188 1240.715698242188 907.0935668945313 1240.643432617188 907.0001220703125 1240.654907226563 L 907.0001220703125 1239.032958984375 C 907.0584716796875 1239.007080078125 907.0534057617188 1238.949340820313 907.0606689453125 1238.90185546875 C 907.195068359375 1238.028198242188 907.5270385742188 1237.240112304688 908.089111328125 1236.5556640625 C 908.5286254882813 1236.020263671875 909.030029296875 1235.559204101563 909.6904296875 1235.305053710938 C 909.9615478515625 1235.20068359375 910.2347412109375 1235.1015625 910.5069580078125 1235 L 911.7781982421875 1235 Z"  /></Svg>
            <Svg data-layer="80d2d104-8236-4043-9fa2-988a7f88ae2b" style={styles.menu_raggruppa33_tracciato14} preserveAspectRatio="none" viewBox="2472.1533203125 1236.1627197265625 2.99462890625 1.6353759765625" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2474.39794921875 1237.048095703125 C 2474.3349609375 1236.958374023438 2474.24267578125 1236.958984375 2474.1455078125 1236.959228515625 C 2473.7314453125 1236.9599609375 2473.3173828125 1236.956298828125 2472.9033203125 1236.9541015625 C 2473.099853515625 1236.87890625 2473.30322265625 1236.930541992188 2473.503173828125 1236.92333984375 C 2473.801025390625 1236.912353515625 2474.099853515625 1236.91796875 2474.39794921875 1236.91650390625 L 2474.39794921875 1237.048095703125 Z"  /></Svg>
            <Svg data-layer="40ca6132-1191-4788-8b5f-a2d26a262ecf" style={styles.menu_raggruppa33_tracciato15} preserveAspectRatio="none" viewBox="2478.414306640625 1445.2501220703125 2.719970703125 1.6806640625" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2479.164306640625 1446.13134765625 C 2479.490966796875 1446.13134765625 2479.818115234375 1446.124389648438 2480.14453125 1446.135131835938 C 2480.263916015625 1446.13916015625 2480.333740234375 1446.09716796875 2480.38427734375 1446.000122070313 L 2480.38427734375 1446.175415039063 C 2480.043701171875 1446.1748046875 2479.703125 1446.176513671875 2479.36279296875 1446.171875 C 2479.29638671875 1446.1708984375 2479.21630859375 1446.210083007813 2479.164306640625 1446.13134765625 Z"  /></Svg>
            <Svg data-layer="11448756-5bfe-4d58-9473-89875db8dff2" style={styles.menu_raggruppa33_tracciato16} preserveAspectRatio="none" viewBox="2505.20947265625 1245.25 1.545654296875 1.67529296875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2506.005126953125 1246.17529296875 C 2505.9443359375 1246.116943359375 2505.9443359375 1246.058471679688 2506.005126953125 1246 L 2506.005126953125 1246.17529296875 Z"  /></Svg>
            <Svg data-layer="48831eed-35c9-477e-a10e-5729665c9ffb" style={styles.menu_raggruppa33_tracciato17} preserveAspectRatio="none" viewBox="2505.50634765625 1436.25 1.53271484375 1.587646484375" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2506.2890625 1437.087646484375 C 2506.24560546875 1437.058349609375 2506.24560546875 1437.029174804688 2506.2890625 1437 L 2506.2890625 1437.087646484375 Z"  /></Svg>
            <Svg data-layer="73bd1dbe-e99d-4ba3-aed2-71ac64e4d3e5" style={styles.menu_raggruppa33_tracciato18} preserveAspectRatio="none" viewBox="2505.50634765625 1441.2501220703125 1.53271484375 1.587646484375" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2506.2890625 1442.087768554688 C 2506.24560546875 1442.05859375 2506.24560546875 1442.029296875 2506.2890625 1442.000122070313 L 2506.2890625 1442.087768554688 Z"  /></Svg>
            <Svg data-layer="dedb07a6-fbbc-4e79-a01a-2fbf5b1c5ffd" style={styles.menu_raggruppa33_tracciato19} preserveAspectRatio="none" viewBox="2222.08544921875 1237.0877685546875 7.235107421875 10.802978515625" fill="rgba(34, 171, 225, 1)"><SvgPath d="M 2226.38916015625 1237.93359375 C 2226.79638671875 1237.978881835938 2227.103515625 1238.214599609375 2227.3671875 1238.495239257813 C 2227.69140625 1238.839721679688 2227.95068359375 1239.232666015625 2228.0595703125 1239.705810546875 C 2228.2646484375 1240.597290039063 2228.17822265625 1241.437377929688 2227.63671875 1242.204956054688 C 2227.428955078125 1242.499267578125 2227.1923828125 1242.756591796875 2226.86328125 1242.911865234375 C 2226.7529296875 1242.9638671875 2226.752197265625 1243.034790039063 2226.791748046875 1243.122314453125 C 2227.14990234375 1243.91455078125 2227.509765625 1244.706176757813 2227.869873046875 1245.49755859375 C 2228.092041015625 1245.986083984375 2228.315185546875 1246.47412109375 2228.5400390625 1246.96142578125 C 2228.598876953125 1247.088745117188 2228.57861328125 1247.14404296875 2228.423828125 1247.140625 C 2228.06640625 1247.1328125 2227.708740234375 1247.135009765625 2227.35107421875 1247.13818359375 C 2227.250244140625 1247.139038085938 2227.19970703125 1247.103637695313 2227.15625 1247.007080078125 C 2226.66357421875 1245.91650390625 2226.158203125 1244.831665039063 2225.673828125 1243.737670898438 C 2225.60205078125 1243.57568359375 2225.48486328125 1243.426513671875 2225.471923828125 1243.239013671875 C 2225.4521484375 1243.116821289063 2225.355224609375 1243.151000976563 2225.28173828125 1243.150268554688 C 2224.9677734375 1243.147338867188 2224.653564453125 1243.14892578125 2224.33935546875 1243.149047851563 C 2224.03759765625 1243.149169921875 2224.0078125 1243.176513671875 2223.983642578125 1243.479858398438 C 2223.9794921875 1243.530639648438 2223.982421875 1243.58203125 2223.982421875 1243.633178710938 C 2223.982421875 1244.626708984375 2223.98193359375 1245.620239257813 2223.9833984375 1246.61376953125 C 2223.9833984375 1246.700439453125 2223.989013671875 1246.788696289063 2224.005859375 1246.87353515625 C 2224.035400390625 1247.0244140625 2223.982177734375 1247.095825195313 2223.826904296875 1247.094604492188 C 2223.5859375 1247.0927734375 2223.34375 1247.080078125 2223.10400390625 1247.098388671875 C 2222.889404296875 1247.11474609375 2222.837646484375 1247.03759765625 2222.83837890625 1246.829345703125 C 2222.844970703125 1243.980346679688 2222.8486328125 1241.131225585938 2222.83544921875 1238.2822265625 C 2222.833740234375 1237.920166015625 2222.9599609375 1237.84033203125 2223.2783203125 1237.84716796875 C 2224.3154296875 1237.868896484375 2225.35595703125 1237.771850585938 2226.38916015625 1237.93359375 Z M 2224.062255859375 1240.496459960938 C 2224.062255859375 1240.861206054688 2224.0673828125 1241.22607421875 2224.0595703125 1241.590576171875 C 2224.056640625 1241.733642578125 2224.08642578125 1241.798950195313 2224.24951171875 1241.796020507813 C 2224.78173828125 1241.78662109375 2225.314453125 1241.794189453125 2225.84716796875 1241.791625976563 C 2226.0244140625 1241.790893554688 2226.207275390625 1241.7646484375 2226.34521484375 1241.655029296875 C 2226.85302734375 1241.250610351563 2227.0361328125 1240.795166015625 2226.865234375 1240.112060546875 C 2226.728271484375 1239.563842773438 2226.307861328125 1239.2236328125 2225.688232421875 1239.213745117188 C 2225.228759765625 1239.206420898438 2224.7685546875 1239.224975585938 2224.3095703125 1239.206665039063 C 2224.09521484375 1239.198120117188 2224.0517578125 1239.27685546875 2224.058837890625 1239.467895507813 C 2224.071044921875 1239.810302734375 2224.062255859375 1240.153564453125 2224.062255859375 1240.496459960938 Z"  /></Svg>
            <Svg data-layer="a225951a-1b4f-427a-94f9-e91a973f7d3c" style={styles.menu_raggruppa33_tracciato20} preserveAspectRatio="none" viewBox="2076.052978515625 1237.080078125 7.208984375 10.8016357421875" fill="rgba(34, 171, 225, 1)"><SvgPath d="M 2080.316650390625 1237.925170898438 C 2080.75341796875 1237.95947265625 2081.06494140625 1238.228271484375 2081.342529296875 1238.520385742188 C 2081.67919921875 1238.874755859375 2081.92236328125 1239.29443359375 2082.029541015625 1239.78271484375 C 2082.185791015625 1240.496826171875 2082.12890625 1241.186767578125 2081.795166015625 1241.8427734375 C 2081.564453125 1242.2958984375 2081.259033203125 1242.685302734375 2080.78955078125 1242.915893554688 C 2080.69140625 1242.963989257813 2080.69287109375 1243.015869140625 2080.734130859375 1243.105834960938 C 2081.1123046875 1243.928955078125 2081.486328125 1244.75390625 2081.86083984375 1245.57861328125 C 2082.067626953125 1246.034057617188 2082.270751953125 1246.491088867188 2082.48046875 1246.945068359375 C 2082.54150390625 1247.076904296875 2082.51904296875 1247.133178710938 2082.366455078125 1247.131713867188 C 2082.0087890625 1247.128051757813 2081.65087890625 1247.128540039063 2081.29296875 1247.131591796875 C 2081.193359375 1247.13232421875 2081.14794921875 1247.099365234375 2081.103515625 1246.999633789063 C 2080.619873046875 1245.9228515625 2080.1259765625 1244.850708007813 2079.63671875 1243.776611328125 C 2079.5947265625 1243.684814453125 2079.564453125 1243.587524414063 2079.52880859375 1243.492797851563 C 2079.529052734375 1243.434814453125 2079.53564453125 1243.372924804688 2079.454345703125 1243.361083984375 C 2079.44970703125 1243.332885742188 2079.44482421875 1243.3046875 2079.440185546875 1243.276611328125 C 2079.453369140625 1243.14599609375 2079.36962890625 1243.140380859375 2079.27294921875 1243.140869140625 C 2078.92236328125 1243.142822265625 2078.57080078125 1243.157470703125 2078.2216796875 1243.135986328125 C 2077.98974609375 1243.121826171875 2077.944580078125 1243.203979492188 2077.946533203125 1243.419311523438 C 2077.956787109375 1244.565673828125 2077.947265625 1245.712280273438 2077.955322265625 1246.858642578125 C 2077.95654296875 1247.04345703125 2077.8994140625 1247.10205078125 2077.71923828125 1247.090087890625 C 2077.50830078125 1247.076049804688 2077.294189453125 1247.070678710938 2077.08447265625 1247.091186523438 C 2076.857177734375 1247.11328125 2076.80615234375 1247.03125 2076.806640625 1246.8115234375 C 2076.81396484375 1243.912475585938 2076.811767578125 1241.013427734375 2076.811279296875 1238.1142578125 C 2076.81103515625 1238.019653320313 2076.805908203125 1237.924926757813 2076.802978515625 1237.830078125 L 2076.8056640625 1237.830444335938 C 2077.97607421875 1237.864013671875 2079.149658203125 1237.775390625 2080.316650390625 1237.925170898438 Z M 2077.992431640625 1240.506103515625 C 2077.992431640625 1240.871215820313 2077.99609375 1241.236328125 2077.990478515625 1241.601318359375 C 2077.98876953125 1241.72412109375 2078.0126953125 1241.788818359375 2078.156005859375 1241.787109375 C 2078.71826171875 1241.780517578125 2079.2802734375 1241.78662109375 2079.842529296875 1241.780517578125 C 2080.011474609375 1241.778564453125 2080.1796875 1241.737060546875 2080.31396484375 1241.6298828125 C 2080.7587890625 1241.274291992188 2080.92724609375 1240.813842773438 2080.849609375 1240.246337890625 C 2080.779541015625 1239.735107421875 2080.266357421875 1239.212158203125 2079.7802734375 1239.206176757813 C 2079.247314453125 1239.199462890625 2078.71435546875 1239.20947265625 2078.181396484375 1239.201904296875 C 2078.036865234375 1239.199951171875 2077.98876953125 1239.24853515625 2077.99072265625 1239.38916015625 C 2077.99658203125 1239.761474609375 2077.99267578125 1240.1337890625 2077.992431640625 1240.506103515625 Z"  /></Svg>
            <Svg data-layer="7e45caf5-07fc-4496-9dbb-20eed30b52e4" style={styles.menu_raggruppa33_tracciato21} preserveAspectRatio="none" viewBox="1482.012939453125 1236.3109130859375 8.1146240234375 10.83740234375" fill="rgba(34, 171, 225, 1)"><SvgPath d="M 1489.37744140625 1241.7490234375 C 1489.37744140625 1243.1435546875 1489.377319335938 1244.537963867188 1489.377563476563 1245.932373046875 C 1489.377685546875 1246.395141601563 1489.378051757813 1246.39501953125 1488.92138671875 1246.39501953125 C 1488.716918945313 1246.39501953125 1488.512084960938 1246.387939453125 1488.30810546875 1246.397705078125 C 1488.164916992188 1246.404541015625 1488.120239257813 1246.35546875 1488.1220703125 1246.210693359375 C 1488.129516601563 1245.612182617188 1488.118530273438 1245.013305664063 1488.12939453125 1244.414672851563 C 1488.132568359375 1244.241455078125 1488.083618164063 1244.195190429688 1487.911499023438 1244.197265625 C 1487.122924804688 1244.206298828125 1486.334350585938 1244.203247070313 1485.545776367188 1244.198974609375 C 1485.422729492188 1244.1982421875 1485.365356445313 1244.233642578125 1485.302612304688 1244.351928710938 C 1484.956787109375 1245.00341796875 1484.588745117188 1245.64306640625 1484.237548828125 1246.291748046875 C 1484.18212890625 1246.393920898438 1484.1103515625 1246.39501953125 1484.0224609375 1246.39501953125 C 1483.650146484375 1246.39501953125 1483.277587890625 1246.388671875 1482.905395507813 1246.3974609375 C 1482.734497070313 1246.401611328125 1482.74072265625 1246.330688476563 1482.80322265625 1246.218505859375 C 1483.070068359375 1245.73779296875 1483.339721679688 1245.258544921875 1483.60546875 1244.77734375 C 1484.074584960938 1243.927368164063 1484.541015625 1243.076049804688 1485.009643554688 1242.225952148438 C 1485.344848632813 1241.61767578125 1485.68310546875 1241.011108398438 1486.017578125 1240.402465820313 C 1486.435424804688 1239.642578125 1486.84912109375 1238.880493164063 1487.267822265625 1238.12109375 C 1487.446655273438 1237.796997070313 1487.636840820313 1237.479125976563 1487.81396484375 1237.154052734375 C 1487.852172851563 1237.083984375 1487.895263671875 1237.061889648438 1487.967163085938 1237.062133789063 C 1488.38330078125 1237.063720703125 1488.799682617188 1237.069702148438 1489.215698242188 1237.06103515625 C 1489.40185546875 1237.05712890625 1489.363403320313 1237.179077148438 1489.363525390625 1237.281127929688 C 1489.364990234375 1238.558715820313 1489.364624023438 1239.836181640625 1489.36474609375 1241.11376953125 C 1489.36474609375 1241.325561523438 1489.36474609375 1241.537353515625 1489.36474609375 1241.7490234375 L 1489.37744140625 1241.7490234375 Z M 1488.124633789063 1239.320556640625 C 1488.032470703125 1239.382934570313 1488.011474609375 1239.4521484375 1487.977294921875 1239.51416015625 C 1487.68701171875 1240.039184570313 1487.392578125 1240.561767578125 1487.10302734375 1241.087036132813 C 1486.816650390625 1241.606323242188 1486.536987304688 1242.129150390625 1486.248901367188 1242.647338867188 C 1486.18994140625 1242.753173828125 1486.1796875 1242.798095703125 1486.32568359375 1242.796997070313 C 1486.87255859375 1242.792724609375 1487.419677734375 1242.793579101563 1487.966674804688 1242.796875 C 1488.071411132813 1242.797607421875 1488.126953125 1242.776611328125 1488.126708984375 1242.654296875 C 1488.123291015625 1241.55322265625 1488.124633789063 1240.452026367188 1488.124633789063 1239.320556640625 Z"  /></Svg>
            <Svg data-layer="e4c4fc2e-6736-45a2-bed8-1e80827de56e" style={styles.menu_raggruppa33_tracciato22} preserveAspectRatio="none" viewBox="1654.5523681640625 1236.29296875 6.3948974609375 10.83837890625" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 1657.43798828125 1246.378173828125 C 1656.78076171875 1246.378173828125 1656.123291015625 1246.374389648438 1655.465942382813 1246.380615234375 C 1655.294311523438 1246.382202148438 1655.271362304688 1246.341064453125 1655.33447265625 1246.179931640625 C 1655.765747070313 1245.077758789063 1656.184448242188 1243.970703125 1656.6123046875 1242.8671875 C 1656.940673828125 1242.020385742188 1657.27734375 1241.1767578125 1657.6083984375 1240.3310546875 C 1657.827880859375 1239.77001953125 1658.04443359375 1239.207885742188 1658.261474609375 1238.645874023438 C 1658.3154296875 1238.505981445313 1658.273559570313 1238.448608398438 1658.115600585938 1238.449951171875 C 1657.443603515625 1238.455932617188 1656.771606445313 1238.449462890625 1656.099609375 1238.455810546875 C 1655.955688476563 1238.457153320313 1655.8935546875 1238.427490234375 1655.899291992188 1238.265869140625 C 1655.911865234375 1237.915771484375 1655.906616210938 1237.564819335938 1655.901733398438 1237.21435546875 C 1655.900024414063 1237.101318359375 1655.917236328125 1237.04248046875 1656.053466796875 1237.04296875 C 1657.39013671875 1237.047607421875 1658.726806640625 1237.047241210938 1660.0634765625 1237.044921875 C 1660.211303710938 1237.044677734375 1660.2177734375 1237.106689453125 1660.1728515625 1237.22119140625 C 1659.663818359375 1238.518310546875 1659.154418945313 1239.815185546875 1658.6494140625 1241.11376953125 C 1658.17333984375 1242.337646484375 1657.70361328125 1243.563720703125 1657.227905273438 1244.78759765625 C 1657.17431640625 1244.925659179688 1657.185791015625 1244.978271484375 1657.354370117188 1244.976318359375 C 1658.03369140625 1244.968139648438 1658.713134765625 1244.981323242188 1659.392211914063 1244.967163085938 C 1659.60205078125 1244.962768554688 1659.650146484375 1245.033935546875 1659.64111328125 1245.227416992188 C 1659.626708984375 1245.540771484375 1659.628784179688 1245.855712890625 1659.641479492188 1246.169189453125 C 1659.648193359375 1246.334106445313 1659.595703125 1246.38330078125 1659.43212890625 1246.38134765625 C 1658.767578125 1246.37353515625 1658.102783203125 1246.378173828125 1657.43798828125 1246.378173828125 Z"  /></Svg>
            <Svg data-layer="fd99cfda-43ef-48b5-a037-7a3c1cfba71d" style={styles.menu_raggruppa33_tracciato23} preserveAspectRatio="none" viewBox="1778.0738525390625 1236.303955078125 6.394287109375 10.838623046875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 1780.984130859375 1246.388305664063 C 1780.319458007813 1246.38818359375 1779.654907226563 1246.3828125 1778.990478515625 1246.391845703125 C 1778.812133789063 1246.394165039063 1778.797119140625 1246.329956054688 1778.851928710938 1246.190307617188 C 1779.36474609375 1244.88525390625 1779.87939453125 1243.5810546875 1780.387573242188 1242.274169921875 C 1780.856079101563 1241.069580078125 1781.316162109375 1239.86181640625 1781.782958984375 1238.656616210938 C 1781.8388671875 1238.511962890625 1781.806640625 1238.45947265625 1781.6474609375 1238.460693359375 C 1780.975708007813 1238.46533203125 1780.3037109375 1238.456298828125 1779.632080078125 1238.466674804688 C 1779.4609375 1238.469360351563 1779.423828125 1238.412475585938 1779.427612304688 1238.254516601563 C 1779.435913085938 1237.911743164063 1779.430908203125 1237.568115234375 1779.419189453125 1237.225341796875 C 1779.41455078125 1237.086303710938 1779.466064453125 1237.053588867188 1779.596313476563 1237.053955078125 C 1780.918212890625 1237.057861328125 1782.239990234375 1237.05810546875 1783.561767578125 1237.053955078125 C 1783.720825195313 1237.053466796875 1783.74853515625 1237.091918945313 1783.689819335938 1237.242065429688 C 1783.208374023438 1238.47216796875 1782.7353515625 1239.705444335938 1782.256103515625 1240.936401367188 C 1781.79541015625 1242.119140625 1781.330322265625 1243.300048828125 1780.868041992188 1244.482299804688 C 1780.847045898438 1244.5361328125 1780.839233398438 1244.59521484375 1780.818725585938 1244.649291992188 C 1780.693237304688 1244.981201171875 1780.692626953125 1244.982177734375 1781.05419921875 1244.982666015625 C 1781.660400390625 1244.983276367188 1782.266479492188 1244.98193359375 1782.87255859375 1244.98193359375 C 1783.173095703125 1244.981811523438 1783.173217773438 1244.982177734375 1783.173095703125 1245.292724609375 C 1783.172973632813 1245.5849609375 1783.16357421875 1245.87744140625 1783.175537109375 1246.169067382813 C 1783.1826171875 1246.339233398438 1783.13232421875 1246.395263671875 1782.955810546875 1246.392456054688 C 1782.298828125 1246.38232421875 1781.641357421875 1246.388427734375 1780.984130859375 1246.388305664063 Z"  /></Svg>
            <Svg data-layer="6254e225-ea9c-4330-a37c-f4dcda91f266" style={styles.menu_raggruppa33_tracciato24} preserveAspectRatio="none" viewBox="1387.2965087890625 1236.3040771484375 6.193603515625 10.83935546875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 1391.0205078125 1242.421508789063 C 1391.020385742188 1243.670654296875 1391.017456054688 1244.919799804688 1391.024047851563 1246.1689453125 C 1391.02490234375 1246.3388671875 1390.98388671875 1246.402099609375 1390.805053710938 1246.392456054688 C 1390.5283203125 1246.37744140625 1390.249755859375 1246.379638671875 1389.97265625 1246.39208984375 C 1389.809936523438 1246.399291992188 1389.758544921875 1246.350463867188 1389.760131835938 1246.183959960938 C 1389.768188476563 1245.373291015625 1389.764038085938 1244.562377929688 1389.764038085938 1243.75146484375 C 1389.76416015625 1242.1005859375 1389.76416015625 1240.449462890625 1389.764038085938 1238.798583984375 C 1389.764038085938 1238.462524414063 1389.764038085938 1238.463134765625 1389.439819335938 1238.463500976563 C 1389.037963867188 1238.463989257813 1388.636108398438 1238.457641601563 1388.234497070313 1238.466552734375 C 1388.09033203125 1238.4697265625 1388.043212890625 1238.426879882813 1388.046752929688 1238.281494140625 C 1388.0556640625 1237.923706054688 1388.052734375 1237.565673828125 1388.04736328125 1237.207763671875 C 1388.045776367188 1237.095947265625 1388.078125 1237.05419921875 1388.1962890625 1237.054565429688 C 1389.6572265625 1237.057861328125 1391.118286132813 1237.05810546875 1392.579223632813 1237.054077148438 C 1392.708251953125 1237.0537109375 1392.740478515625 1237.1015625 1392.73876953125 1237.219970703125 C 1392.733764648438 1237.577880859375 1392.73193359375 1237.935913085938 1392.739990234375 1238.293701171875 C 1392.7431640625 1238.428955078125 1392.69970703125 1238.467895507813 1392.565673828125 1238.465454101563 C 1392.12744140625 1238.45751953125 1391.688720703125 1238.471435546875 1391.250854492188 1238.458251953125 C 1391.063232421875 1238.45263671875 1391.0166015625 1238.518798828125 1391.017578125 1238.695922851563 C 1391.0234375 1239.937744140625 1391.020629882813 1241.1796875 1391.0205078125 1242.421508789063 Z"  /></Svg>
            <Svg data-layer="f84159b0-b561-44ba-b359-444f3c477032" style={styles.menu_raggruppa33_tracciato25} preserveAspectRatio="none" viewBox="2221.418701171875 1236.2542724609375 5.0830078125 10.84033203125" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2225.751708984375 1237.136474609375 C 2224.718505859375 1236.974731445313 2223.677978515625 1237.071899414063 2222.640869140625 1237.050048828125 C 2222.322509765625 1237.04345703125 2222.1962890625 1237.123168945313 2222.19775390625 1237.4853515625 C 2222.211181640625 1240.334228515625 2222.20751953125 1243.183227539063 2222.200927734375 1246.032348632813 C 2222.2001953125 1246.240600585938 2222.251953125 1246.317626953125 2222.466552734375 1246.301391601563 C 2222.706298828125 1246.283203125 2222.948486328125 1246.295654296875 2223.189453125 1246.297607421875 C 2223.3447265625 1246.298828125 2223.39794921875 1246.227294921875 2223.3681640625 1246.07666015625 C 2223.3515625 1245.99169921875 2223.345947265625 1245.903442382813 2223.345703125 1245.816650390625 C 2223.34423828125 1244.8232421875 2223.344970703125 1243.829711914063 2223.344970703125 1242.836181640625 C 2223.344970703125 1242.785034179688 2223.342041015625 1242.733642578125 2223.34619140625 1242.682861328125 C 2223.3701171875 1242.37939453125 2223.400146484375 1242.352172851563 2223.701904296875 1242.35205078125 C 2224.01611328125 1242.351928710938 2224.330078125 1242.350341796875 2224.644287109375 1242.353271484375 C 2224.7177734375 1242.35400390625 2224.814697265625 1242.319702148438 2224.83447265625 1242.442138671875 C 2224.40576171875 1242.384521484375 2223.97509765625 1242.42919921875 2223.54541015625 1242.4169921875 C 2223.385986328125 1242.412353515625 2223.4267578125 1242.535766601563 2223.426513671875 1242.620483398438 C 2223.423828125 1243.3505859375 2223.4248046875 1244.080688476563 2223.4248046875 1244.810791015625 C 2223.4248046875 1245.256225585938 2223.418701171875 1245.70166015625 2223.428466796875 1246.146850585938 C 2223.431884765625 1246.302124023438 2223.38134765625 1246.34912109375 2223.2294921875 1246.343627929688 C 2222.9453125 1246.333251953125 2222.659912109375 1246.331176757813 2222.375732421875 1246.343994140625 C 2222.207275390625 1246.351684570313 2222.167724609375 1246.29150390625 2222.1689453125 1246.131103515625 C 2222.17626953125 1245.203857421875 2222.17333984375 1244.276611328125 2222.17333984375 1243.349365234375 C 2222.17333984375 1241.312377929688 2222.1748046875 1239.275390625 2222.168701171875 1237.238525390625 C 2222.168212890625 1237.060302734375 2222.211669921875 1237.00244140625 2222.398193359375 1237.004272460938 C 2223.369140625 1237.013916015625 2224.34033203125 1237.0068359375 2225.311279296875 1237.011474609375 C 2225.465576171875 1237.01220703125 2225.636474609375 1236.98486328125 2225.751708984375 1237.136474609375 Z"  /></Svg>
            <Svg data-layer="fa8fae04-d03e-4093-9f3a-0912bb817b1b" style={styles.menu_raggruppa33_tracciato26} preserveAspectRatio="none" viewBox="2074.905029296875 1237.080078125 4.18896484375 10.8060302734375" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2075.70556640625 1237.830078125 C 2075.708251953125 1237.924926757813 2075.71337890625 1238.019653320313 2075.713623046875 1238.1142578125 C 2075.7138671875 1241.013427734375 2075.716552734375 1243.912475585938 2075.708984375 1246.8115234375 C 2075.70849609375 1247.03125 2075.759521484375 1247.11328125 2075.98681640625 1247.091186523438 C 2076.196533203125 1247.070678710938 2076.41064453125 1247.076049804688 2076.62158203125 1247.090087890625 C 2076.8017578125 1247.10205078125 2076.85888671875 1247.04345703125 2076.857666015625 1246.858642578125 C 2076.849853515625 1245.712280273438 2076.859130859375 1244.565673828125 2076.848876953125 1243.419311523438 C 2076.8466796875 1243.203979492188 2076.89208984375 1243.121826171875 2077.1240234375 1243.135986328125 C 2077.47314453125 1243.157470703125 2077.82470703125 1243.142822265625 2078.17529296875 1243.140869140625 C 2078.271728515625 1243.140380859375 2078.35595703125 1243.14599609375 2078.342529296875 1243.276611328125 C 2078.285888671875 1243.21044921875 2078.21435546875 1243.191040039063 2078.128173828125 1243.192016601563 C 2077.78515625 1243.195556640625 2077.44140625 1243.201782226563 2077.098388671875 1243.190551757813 C 2076.9287109375 1243.18505859375 2076.89111328125 1243.25 2076.891845703125 1243.407958984375 C 2076.8974609375 1244.569091796875 2076.889892578125 1245.73046875 2076.89892578125 1246.891723632813 C 2076.900390625 1247.085693359375 2076.84814453125 1247.146484375 2076.654296875 1247.134765625 C 2076.377685546875 1247.117919921875 2076.099365234375 1247.1279296875 2075.82177734375 1247.1318359375 C 2075.7080078125 1247.13330078125 2075.65478515625 1247.109619140625 2075.655029296875 1246.972900390625 C 2075.6611328125 1243.993041992188 2075.661376953125 1241.01318359375 2075.66455078125 1238.033325195313 C 2075.66455078125 1237.96484375 2075.63330078125 1237.8857421875 2075.70556640625 1237.830078125 Z"  /></Svg>
            <Svg data-layer="fa8e1920-55bf-4c90-8e12-173aa5f51d19" style={styles.menu_raggruppa33_tracciato27} preserveAspectRatio="none" viewBox="2076.115234375 1236.29345703125 5.010986328125 1.629638671875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2080.376220703125 1237.173095703125 C 2079.208984375 1237.023315429688 2078.035400390625 1237.111938476563 2076.865234375 1237.078369140625 C 2076.90380859375 1237.029907226563 2076.95849609375 1237.046020507813 2077.007080078125 1237.046020507813 C 2077.984375 1237.045776367188 2078.96142578125 1237.0439453125 2079.938232421875 1237.049682617188 C 2080.0908203125 1237.050537109375 2080.26220703125 1237.019897460938 2080.376220703125 1237.173095703125 Z"  /></Svg>
            <Svg data-layer="dd2ad4c7-c80b-4b54-bd35-922f8e376314" style={styles.menu_raggruppa33_tracciato28} preserveAspectRatio="none" viewBox="2470.56396484375 1236.9581298828125 1.566650390625 1.6002197265625" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2471.375 1237.708129882813 C 2471.39111328125 1237.763793945313 2471.372802734375 1237.798217773438 2471.31396484375 1237.808349609375 C 2471.31689453125 1237.764282226563 2471.312744140625 1237.716186523438 2471.375 1237.708129882813 Z"  /></Svg>
            <Svg data-layer="e5d3e26c-0a07-45de-be2b-00ae4dbd6e7b" style={styles.menu_raggruppa33_tracciato29} preserveAspectRatio="none" viewBox="2136.537353515625 1363.255126953125 1.57470703125 1.6317138671875" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 2137.287353515625 1364.005126953125 C 2137.368896484375 1364.016967773438 2137.362060546875 1364.078857421875 2137.36181640625 1364.136840820313 C 2137.3369140625 1364.093017578125 2137.312255859375 1364.049072265625 2137.287353515625 1364.005126953125 Z"  /></Svg>
        </View>
        */}
      </ScrollView>
      <View data-layer="10e3e5e0-d684-4683-855a-adb2248fb403" style={styles.menu_rettangolo1}>
        <TouchableOpacity style={{width:"33%", height:"100%",display:"flex", alignItems:"center", justifyContent:"center"}} underlayColor="white"
          onPress={
            ()=>{this.props.navigation.navigate("MLogin")}
          }
        >

              <Icon2 name="menu" size={30} color="#F9F9F9"/>

        </TouchableOpacity>

        <TouchableOpacity style={{width:"33%", height:"100%",display:"flex", alignItems:"center", justifyContent:"center"}} underlayColor="white"
        onPress={
          ()=>{this.props.navigation.navigate("Home")}
        }
        >
          <Icon name="home" size={30} color="#F9F9F9"/>
        </TouchableOpacity>

        <TouchableOpacity style={{width:"33%", height:"100%",display:"flex", alignItems:"center", justifyContent:"center"}} underlayColor="white"
        onPress={
          ()=>{this.props.navigation.navigate("Home")}
        }
        >
          <Icon  name="left" size={30} color="#F9F9F9"/>
        </TouchableOpacity>

      </View>
    </View>
    );
  }
}

MenuLogin.propTypes = {

}

MenuLogin.defaultProps = {

}

const styles = StyleSheet.create({
  "home_rettangolo3": {
    "display":"flex",
    "flexDirection":"row",
    "opacity": 1,

    "backgroundColor": "#B8B8B8",

    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": "100%",
    "height": "80%",

  },
  "menu": {
    "opacity": 1,
    "backgroundColor": "#F9F9F9",
    "width": "100%",
    "height": "90%"

  },
  "menu_rettangolo11": {
    "display":"flex",
    "flexDirection":"column",
    "opacity": 1,

    "backgroundColor": "#F9F9F9",

    "width": "100%",
    "height": 760,

  },
  "menuLogin_signin": {
    "opacity": 1,
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "#F9F9F9",
    "fontSize": 13,
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

    "backgroundColor": "#28337F",

    "borderTopLeftRadius": 15,
    "borderTopRightRadius": 15,
    "borderBottomLeftRadius": 15,
    "borderBottomRightRadius": 15,
    "width": "95%",
    "height": "80%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
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
    "color": "#28337F",
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
    "backgroundColor": "#28337F",
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
    "color": "#B8B8B8",
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
    "color": "#B8B8B8",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",

  },
  "menu_lesDestinations": {
    "opacity": 1,
    "backgroundColor": "#28337F",
    "color": "#F9F9F9",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat",
    "textAlign": "center",

  },
  "menu_manger": {
    "opacity": 1,

    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "#B8B8B8",
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
    "color": "#B8B8B8",
    "fontSize": 25,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Dolce Vita Heavy",
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
