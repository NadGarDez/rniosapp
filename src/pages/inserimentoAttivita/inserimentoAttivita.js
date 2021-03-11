import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker,Modal, Alert, ScrollView, TouchableHighlight,TouchableOpacity,Button} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import HeaderI from '~/components/headerInsersi/headerInsersi.js';
import TextInputs from '~/components/headerInsersi/textImputs.js';
import Checks from '~/components/headerInsersi/categoria.js';
import Imagenes1 from '~/components/headerInsersi/imagenes.js';
import Imagenes2 from '~/components/headerInsersi/imagenes2.js';
import Social from '~/components/headerInsersi/social.js';
import Enviar from '~/components/headerInsersi/enviar.js';
import Sfetch from "../../services/fetchManager.js";
import Prueba from '~/components/headerInsersi/prueba.js';
import Prueba2 from '~/components/headerInsersi/prueba2.js';
import Paypal from "./../webViewPayPal/WebViewPayPal.js";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import BottonMenu from "../../components/menus/bottonMenu.js";

const scom = require("../../services/url.js");

export default class InserimentoAttivita extends Component {

  constructor(props) {
      super(props);
      let d = new Date()
      console.log(d)
      let v = d.getTime() + 31536000000;
      console.log(new Date(v))
      this.state = {
        estado:"activo",
        id:`${this.props.variables.user.value.id}-${d.getTime()}`,
        idUsuario:this.props.variables.user.value.id,
        attivitaLuogo:"",
        indirizzo:{
          data:""
        },
        citta:"",
        telefono:"",
        descrizione:"",
        categoria1:false,
        categoria2:false,
        categoria3:false,
        categoria4:false,
        imagine1:[],
        imagine2:[],
        imagine:[],
        social:"",
        pagado:false,
        fechaPago: "",
        vencimiento:new Date(v),
        idUsuario:this.props.variables.user.value.id,
        modalVisible:false,
        modalVisible2:false,
        modalVisible3:false,
        validaciones:{
          inputText:false,
          checkbox:false,
          images:false,
          images2:false,
          social:false
        },
        urlAprove:""
      };
      this.changeModal = this.changeModal.bind(this);
      this.handleTextInput = this.handleTextInput.bind(this);
      this.getVariable = this.getVariable.bind(this);
      this.enviar = this.enviar.bind(this)
      this.handleResponse = this.handleResponse.bind(this);
      this.changeModalPaypal = this.changeModalPaypal.bind(this);
      this.changeModalPaypal2 = this.changeModalPaypal2.bind(this);
      this.validar = this.validar.bind(this);
      this.saveValidacion = this.saveValidacion.bind(this)
      this.urlAprove = "";
      this.idPay = "";
      this.action1 = this.action1.bind(this)
      this.action2 = this.action2.bind(this)
      this.action3 = this.action3.bind(this)
      var now = new Date();
      this.dif = now.getTime()
  }

  saveValidacion(value,item){
    for(i in this.state.validaciones){
      if(item == i){

        this.state.validaciones[i]= value;
        this.forceUpdate()
        console.log(this.state)
      }
    }
  }
  changeModal(modal){
    if(modal==1){
      this.state.modalVisible=!this.state.modalVisible;
    }
    else{
      this.state.modalVisible2=!this.state.modalVisible2;
    }
    this.forceUpdate()
  }

  handleResponse(obj){

    if(obj.estatus == "exitoso"){
        Alert.alert("Activité saisie correctement")
        this.props.navigation.navigate("Menu");
    }

  }
  async preEnviar(){
    baseUrl = scom.url;
    baseUrl+="/paypal";
    a = new Sfetch(baseUrl);


    try{
      b = await a.getJson(obj,token.value);
      console.log(b.links[1].href)
      this.state.urlAprove = b.links[1].href;
      this.forceUpdate()
      this.id = b.id;


    }
    catch(error){
      console.log(error);
    }
  }

  validar(){
    let v = true;
    for(let i in this.state.validaciones){
      if(this.state.validaciones[i] == false){
        Alert.alert("Ci sono campi non validi, si prega di controllare attentamente e correggere ")
        v=false;
        break;
      }
    }
    return v;
  }

  async enviar(){
  //  if(this.validar() == true){
      this.state.idUsuario = this.props.variables.user.value.id;
      this.state.imagine = this.state.imagine1.concat(this.state.imagine2)
      //this.state.citta= JSON.stringify(this.state.citta);
      this.state.indirizzo=JSON.stringify(this.state.indirizzo);

      objE = {}

      for(let i in this.state){
        if((i!=="imagine1") && (i!=="imagine2")){
          objE[i]= this.state[i];
        }
      }

      console.log(objE);


      baseUrl = scom.url;
      baseUrl+="/crear_actividad";
      a = new Sfetch(baseUrl);

      try{
        b = await a.postJson(objE);
        console.log(b)
        this.handleResponse(b);

      }
      catch(error){
        console.log(error);
      }

    //}
  }

  handleTextInput(value, name){
    this.state[name]= value;
    this.forceUpdate()
    console.log(this.state)
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

  changeModalPaypal(){
   if(this.validar()==true){
      this.preEnviar()
      this.state.modalVisible3=!this.state.modalVisible3;//
      this.forceUpdate();
    }
  }
  changeModalPaypal2(){

      this.state.modalVisible3=!this.state.modalVisible3;//

  }


  action1(){
    this.props.navigation.navigate("Menu")
  }

  action2(){
    this.props.navigation.navigate("Home")
  }

  action3(){
      this.props.navigation.navigate("Home")
  }


  render() {

    objDat={
      nameUser:this.props.variables.user.value.name,
      idUser:this.props.variables.user.value.id
    }

    return (
      <View>
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible3}

      >
        <View style={{width:"100%", height:"100%", backgroundColor:"white"}}>
          <Paypal saveText={this.handleTextInput} changeModalPaypal={this.changeModalPaypal2} enviar={this.enviar} urlAprove={this.state.urlAprove}/>

        </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}

      >
        <View style={{width:"100%", height:"100%", backgroundColor:"white"}}>
          <Prueba saveText={this.handleTextInput} changeModal={this.changeModal}/>
          <Button
            onPress={()=>{
                this.changeModal(1)
            }}
            title="supprimer"
            color="#28337F"

          />
        </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}

      >
        <View style={{width:"100%", height:"100%", backgroundColor:"white"}}>
          <Prueba2 saveText={this.handleTextInput} changeModal={this.changeModal}/>
          <Button
            onPress={()=>{
                this.changeModal(2)
            }}
            title="supprimer"
            color="#28337F"

          />
        </View>
      </Modal>
      <ScrollView data-layer="1398e460-2e53-4563-9977-48bb596277a5" keyboardShouldPersistTaps="always" style={styles.inserimentoAttivita}>
        <View data-layer="30490757-9eba-42ee-9721-60e6b086022e" style={styles.inserimentoAttivita_rettangolo11}>
          <HeaderI datos={objDat} />
          <TextInputs saveValidacion={this.saveValidacion} saveText={this.handleTextInput} navigation={this.props.navigation} changeModal={this.changeModal} dataCitta={this.state.citta} dataIndirizo={this.state.indirizzo.data}/>
          <Checks saveValidacion={this.saveValidacion} saveCheck={this.handleTextInput} />
          <Imagenes1 saveValidacion={this.saveValidacion} saveImages={this.handleTextInput} dif={this.dif} variables={this.props.variables} id={this.state.id}/>
          <Imagenes2 saveValidacion={this.saveValidacion} saveImages={this.handleTextInput} dif={this.dif} variables={this.props.variables} id={this.state.id}/>
          <Social saveValidacion={this.saveValidacion} saveText={this.handleTextInput}/>
          <Enviar enviar={this.changeModalPaypal} />


        </View>

        {/*

          <View data-layer="b88d8ff9-1214-40ec-bde7-01297c905849" style={styles.inserimentoAttivita_rettangolo4}></View>
          <View data-layer="ca638039-66ef-4900-8e38-c62f89489900" style={styles.inserimentoAttivita_rettangolo38}></View>
          <View data-layer="76d3402a-66e5-44a1-bccd-a907ddd1920a" style={styles.inserimentoAttivita_rettangolo28}></View>
          <View data-layer="55a7b385-c40d-4c7b-8c3f-c32293ea4543" style={styles.inserimentoAttivita_rettangolo39}></View>
          <View data-layer="c62699a6-157d-4b9f-82fc-20eb0ca57c05" style={styles.inserimentoAttivita_rettangolo29}></View>
          <View data-layer="127fe45f-e157-4a62-9f9b-ebaf91049b8f" style={styles.inserimentoAttivita_rettangolo40}></View>
          <View data-layer="09f2bdfc-4450-4b08-8f48-cba3a4ee326c" style={styles.inserimentoAttivita_rettangolo37}></View>
          <View data-layer="2ec32a4f-3045-4301-b50a-d0547f03db2b" style={styles.inserimentoAttivita_rettangolo30}></View>
          <Text data-layer="be4809d5-6b98-48ea-857c-44b9ed0c16db" style={styles.inserimentoAttivita_attivitaluogo}>Attività/Luogo</Text>
          <Text data-layer="c3e839b9-5e81-492d-b69b-a2bb82b113eb" style={styles.inserimentoAttivita_facebook}>Facebook</Text>
          <Text data-layer="d36c795a-50b1-4580-99cc-f75a64382597" style={styles.inserimentoAttivita_indirizzo}>Indirizzo</Text>
          <Text data-layer="cacd7c7d-feb0-4fb3-a5cc-fbbe0f52e77f" style={styles.inserimentoAttivita_instagram}>Instagram</Text>
          <Text data-layer="f4c8985b-3cae-4460-bf45-bbe0965c3b01" style={styles.inserimentoAttivita_citta}>Città</Text>
          <Text data-layer="d7744fc9-0862-4061-b23c-2442b03195c3" style={styles.inserimentoAttivita_tripadvisor}>Tripadvisor</Text>
          <Text data-layer="c8d0e2ed-33c5-427f-921b-c81244678414" style={styles.inserimentoAttivita_telefono}>Telefono</Text>
          <Text data-layer="861563ba-1022-4b3a-bc28-8e930fc640fc" style={styles.inserimentoAttivita_descrizioneMax150Caratteri}>Descrizione (max 150 caratteri)</Text>
          <Text data-layer="c9751792-794c-4b79-ad84-6c510bb4368d" style={styles.inserimentoAttivita_categorie}>Categorie</Text>
          <Text data-layer="56205cfe-492e-4a68-a7b8-a4d11e086cac" style={styles.inserimentoAttivita_manger}>Manger</Text>
          <Text data-layer="6e4b0b08-3aad-4cc0-8eb5-7635247b862b" style={styles.inserimentoAttivita_immagineProfilo}>Immagine Profilo</Text>
          <Text data-layer="1d76fc09-c135-40ca-ba64-e8991e453470" style={styles.inserimentoAttivita_immagineCopertina}>Immagine Copertina</Text>
          <Text data-layer="94b91d12-dd84-4e28-8f9f-76402014bd5d" style={styles.inserimentoAttivita_samuser}>S'amuser</Text>
          <Text data-layer="8ef3c4f4-b60d-4aa6-9209-b74b6faa009e" style={styles.inserimentoAttivita_visiter}>Visiter</Text>
          <Text data-layer="fcc2db8d-913d-46e6-b6db-1a3819286a24" style={styles.inserimentoAttivita_homePage}>Home Page</Text>
          <Text data-layer="5055435a-4815-4d85-90a0-4e0293dfdd52" style={styles.inserimentoAttivita_dormir}>Dormir</Text>
          <Text data-layer="1f7df6b4-8e1d-4afa-9aaa-46a48952003d" style={styles.inserimentoAttivita_inserimentoAttivita3378703d}>Inserimento Attività</Text>
          <View data-layer="28f0ac28-77cc-47e8-bc3f-997913fbcfb4" style={styles.inserimentoAttivita_user}>
              <Svg data-layer="ee3aa240-b443-4554-811e-4dc1ad05976b" style={styles.inserimentoAttivita_user_tracciato1} preserveAspectRatio="none" viewBox="87.03169250488281 0.00019073486328125 12.70263671875 12.7022705078125" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 93.38301086425781 12.70242500305176 C 95.12806701660156 12.70242500305176 96.63894653320313 12.0765495300293 97.87379455566406 10.84169101715088 C 99.10825347900391 9.607035636901855 99.73432922363281 8.09636116027832 99.73432922363281 6.351107597351074 C 99.73432922363281 4.60645580291748 99.10845184326172 3.095580339431763 97.87359619140625 1.860521912574768 C 96.63873291015625 0.6260660886764526 95.12786102294922 0.00019073486328125 93.38301086425781 0.00019073486328125 C 91.63775634765625 0.00019073486328125 90.1270751953125 0.6260660290718079 88.89242553710938 1.860722541809082 C 87.65777587890625 3.095379590988159 87.03169250488281 4.606255054473877 87.03169250488281 6.351107597351074 C 87.03169250488281 8.09636116027832 87.65777587890625 9.607241630554199 88.89242553710938 10.84189319610596 C 90.12747955322266 12.07634925842285 91.63835906982422 12.70242500305176 93.38301086425781 12.70242500305176 Z M 89.98524475097656 2.953341007232666 C 90.93260955810547 2.005975723266602 92.0439453125 1.545470356941223 93.38301086425781 1.545470356941223 C 94.72187805175781 1.545470356941223 95.83340454101563 2.00597620010376 96.78097534179688 2.953341007232666 C 97.72834777832031 3.900906801223755 98.18904876708984 5.012441158294678 98.18904876708984 6.351107597351074 C 98.18904876708984 7.690176010131836 97.72834777832031 8.801504135131836 96.78097534179688 9.749075889587402 C 95.83341217041016 10.69664096832275 94.72187805175781 11.15714550018311 93.38301086425781 11.15714550018311 C 92.04434204101563 11.15714550018311 90.93301391601563 10.69643878936768 89.98524475097656 9.749075889587402 C 89.03767395019531 8.801711082458496 88.57696533203125 7.690176963806152 88.57696533203125 6.351108074188232 C 88.57696533203125 5.012441635131836 89.03767395019531 3.900912284851074 89.98524475097656 2.953341245651245 Z M 89.98524475097656 2.953341007232666"  /></Svg>
              <Svg data-layer="c341e912-53e4-4543-994f-db4c9c1b0f51" style={styles.inserimentoAttivita_user_tracciato2} preserveAspectRatio="none" viewBox="-0.00017654895782470703 247.3162841796875 22.000244140625 13.63189697265625" fill="rgba(35, 171, 224, 1)"><SvgPath d="M 21.94659042358398 254.8555755615234 C 21.91098213195801 254.3417663574219 21.83896064758301 253.78125 21.73293685913086 253.1893768310547 C 21.62590599060059 252.5930786132813 21.48809814453125 252.0293579101563 21.32312774658203 251.5141296386719 C 21.15252494812012 250.9816131591797 20.92096519470215 250.4557189941406 20.63428115844727 249.9517517089844 C 20.33713340759277 249.4286804199219 19.98788070678711 248.9732055664063 19.59597778320313 248.5984191894531 C 19.18617057800293 248.206298828125 18.68442344665527 247.8910522460938 18.10421562194824 247.6611022949219 C 17.52601623535156 247.4323577880859 16.88525199890137 247.3164825439453 16.1998233795166 247.3164825439453 C 15.93064117431641 247.3164825439453 15.67030811309814 247.4269256591797 15.16755676269531 247.7542572021484 C 14.8581371307373 247.9560394287109 14.49620914459229 248.1894073486328 14.09223747253418 248.4475250244141 C 13.74680709838867 248.6676177978516 13.27885723114014 248.8738403320313 12.70086288452148 249.0605163574219 C 12.1369514465332 249.2429962158203 11.56438541412354 249.3355407714844 10.99906253814697 249.3355407714844 C 10.43414115905762 249.3355407714844 9.861579895019531 249.2429962158203 9.297262191772461 249.0605163574219 C 8.719871520996094 248.8740234375 8.251717567443848 248.6678161621094 7.906893253326416 248.4477233886719 C 7.506742000579834 248.1920166015625 7.144613265991211 247.9586486816406 6.830569744110107 247.7540435791016 C 6.328217506408691 247.4267272949219 6.067888259887695 247.3162841796875 5.798704624176025 247.3162841796875 C 5.113075733184814 247.3162841796875 4.472512245178223 247.4323577880859 3.894513607025146 247.6613006591797 C 3.31470775604248 247.8908386230469 2.812757730484009 248.2061004638672 2.402544736862183 248.5986022949219 C 2.010641813278198 248.9736022949219 1.661391258239746 249.4288940429688 1.364442467689514 249.9517517089844 C 1.078160643577576 250.4557189941406 0.8463981747627258 250.9814147949219 0.6757957935333252 251.5143432617188 C 0.5110275745391846 252.0295715332031 0.373217910528183 252.5930786132813 0.2661888003349304 253.1893768310547 C 0.1599646657705307 253.7804565429688 0.08814270049333572 254.3411407470703 0.05253328755497932 254.8561706542969 C 0.01752758026123047 255.3597412109375 -0.000176548957824707 255.8838043212891 -0.000176548957824707 256.413330078125 C -0.000176548957824707 257.789794921875 0.4373942911624908 258.9041442871094 1.300264596939087 259.7259826660156 C 2.152473449707031 260.5369567871094 3.279896259307861 260.9481811523438 4.651354312896729 260.9481811523438 L 17.34834671020508 260.9481811523438 C 18.71940231323242 260.9481811523438 19.84682464599609 260.5369567871094 20.6992359161377 259.7259826660156 C 21.56230735778809 258.90478515625 21.99987983703613 257.7900085449219 21.99987983703613 256.4131164550781 C 21.99967575073242 255.8817901611328 21.98177337646484 255.3577270507813 21.94656372070313 254.8555755615234 Z M 19.63379859924316 258.6064147949219 C 19.0706901550293 259.1423645019531 18.32310104370117 259.4028930664063 17.34816932678223 259.4028930664063 L 4.651383399963379 259.4028930664063 C 3.6762535572052 259.4028930664063 2.928662300109863 259.142333984375 2.365754127502441 258.6066284179688 C 1.813506960868835 258.0809326171875 1.545131921768188 257.3633117675781 1.545131921768188 256.413330078125 C 1.545131921768188 255.9192199707031 1.561427593231201 255.4313659667969 1.594019055366516 254.9629974365234 C 1.625805974006653 254.5035095214844 1.690788149833679 253.9987335205078 1.787154078483582 253.4623870849609 C 1.88231348991394 252.9326782226563 2.003424882888794 252.435546875 2.147470951080322 251.9855041503906 C 2.285682916641235 251.5539703369141 2.474190711975098 251.1266784667969 2.707963943481445 250.7150421142578 C 2.931074857711792 250.3227386474609 3.187783241271973 249.9861755371094 3.471046924591064 249.7149658203125 C 3.736003637313843 249.4612731933594 4.069965839385986 249.253662109375 4.463476657867432 249.0979309082031 C 4.827415466308594 248.9538879394531 5.236417293548584 248.8750305175781 5.680427074432373 248.8631591796875 C 5.73454475402832 248.8919219970703 5.830911159515381 248.9468383789063 5.9870285987854 249.0486450195313 C 6.304695129394531 249.2556610107422 6.670844554901123 249.4918518066406 7.075623989105225 249.7503662109375 C 7.531904697418213 250.0412750244141 8.119757652282715 250.3040313720703 8.822087287902832 250.53076171875 C 9.540106773376465 250.7629089355469 10.27241230010986 250.8807983398438 10.99927806854248 250.8807983398438 C 11.72614860534668 250.8807983398438 12.45865058898926 250.7629089355469 13.17626762390137 250.5309600830078 C 13.87919521331787 250.3038330078125 14.46685123443604 250.0412750244141 14.92373561859131 249.7499694824219 C 15.33796977996826 249.4851989746094 15.6938591003418 249.255859375 16.01152801513672 249.0486450195313 C 16.16764640808105 248.9470520019531 16.26401138305664 248.8919219970703 16.31812858581543 248.8631591796875 C 16.7623405456543 248.8750305175781 17.17134284973145 248.9538879394531 17.53548049926758 249.0979309082031 C 17.92879104614258 249.253662109375 18.26275444030762 249.4614562988281 18.5277099609375 249.7149658203125 C 18.81097221374512 249.9859619140625 19.06768417358398 250.3225402832031 19.29079437255859 250.7152404785156 C 19.5247688293457 251.1266784667969 19.71347618103027 251.5541687011719 19.85148620605469 251.9853057861328 C 19.99573516845703 252.4359436035156 20.11704635620117 252.932861328125 20.21200561523438 253.4621887207031 C 20.30817031860352 253.9995422363281 20.37335014343262 254.5045166015625 20.4051399230957 254.9631958007813 L 20.4051399230957 254.9635925292969 C 20.43793296813965 255.4301452636719 20.45442771911621 255.9178009033203 20.45462799072266 256.413330078125 C 20.45442771911621 257.363525390625 20.1860523223877 258.0809326171875 19.6338062286377 258.6064147949219 Z M 19.63379859924316 258.6064147949219"  /></Svg>
          </View>
          <Text data-layer="c0e3c7ff-daad-4003-a57c-8527d77a1db2" style={styles.inserimentoAttivita_pincoPallino}>Pinco Pallino</Text>
          <View data-layer="62f7e2e7-cd86-4574-92e0-029f03da05af" style={styles.inserimentoAttivita_raggruppa46}>
              <View data-layer="16bc5f83-43bc-4553-8b41-7b9a0690bd1a" style={styles.inserimentoAttivita_raggruppa46_rettangolo12dccae145}></View>
              <Text data-layer="f7075afc-d3e6-49d8-adba-708e464e520e" style={styles.inserimentoAttivita_raggruppa46_charger5677960c}>Charger</Text>
          </View>
          <View data-layer="e1c9aeed-1a3f-40b3-b0f9-ddc6902ca3a3" style={styles.inserimentoAttivita_raggruppa47}>
              <View data-layer="b163282e-5ba3-467b-a8fc-61e22db43d3c" style={styles.inserimentoAttivita_raggruppa47_rettangolo12c14a1e11}></View>
              <Text data-layer="c1977ed2-bff5-4511-92dd-45accabc6f66" style={styles.inserimentoAttivita_raggruppa47_chargerdcab21d9}>Charger</Text>
          </View>
          <View data-layer="9cc43759-db92-4a4b-a03a-ce392c7f6c0c" style={styles.inserimentoAttivita_raggruppa50}>
              <View data-layer="ffe4a287-881f-4f8e-981d-0dff1c241556" style={styles.inserimentoAttivita_raggruppa50_rettangolo122c2ea86a}></View>
              <Text data-layer="4d7ade1f-99f4-4e26-af73-eb740044253f" style={styles.inserimentoAttivita_raggruppa50_envoyer}>Envoyer</Text>
          </View>
          <ScrollView data-layer="aee75c2b-570d-4a00-b194-0579561e7852" style={styles.inserimentoAttivita_grigliaDiRipetizione2}>
              <View data-layer="14933639-eb75-4f7f-a174-a994f067ad34" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842}>
                  <Text data-layer="993f072d-4750-4f06-9169-f4ec84e7a662" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_immagineGalleriab1093e6d}>Immagine Galleria</Text>
                  <View data-layer="dd3ad8fe-443e-40eb-bd47-721ff1411136" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_raggruppa48fcbb7607}>
                      <View data-layer="11619063-1253-4a60-a69d-e7d1aad7131b" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_raggruppa48fcbb7607_rettangolo125f8b6a1f}></View>
                      <Text data-layer="2bd39535-3e15-4181-b057-ad997c30ff38" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_raggruppa48fcbb7607_charger36f36bc8}>Charger</Text>
                  </View>
              </View>
              <View data-layer="70541b15-f5ad-46a9-8226-cd1b33df757e" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1}>
                  <Text data-layer="f399c61f-248c-463c-b8e4-3c8abadfeb3c" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_immagineGalleria3b726370}>Immagine Galleria</Text>
                  <View data-layer="60fe1e3f-6bd4-474a-b0d1-2c0c39cd3f37" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_raggruppa480cf2264b}>
                      <View data-layer="b7df46d3-3633-4e5f-bfa0-1ba33d80eb08" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_raggruppa480cf2264b_rettangolo12d77a0e4a}></View>
                      <Text data-layer="1bbeb607-d6ff-4de6-bdd9-2d3e104a52eb" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_raggruppa480cf2264b_charger3ca0d819}>Charger</Text>
                  </View>
              </View>
              <View data-layer="a4fe2478-8e78-4c73-92b2-b0c88f1ccfc0" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1}>
                  <Text data-layer="e7b30999-0cbb-47d6-8a38-86996aeab0fa" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_immagineGalleria48cf6e5f}>Immagine Galleria</Text>
                  <View data-layer="c4f19fee-447c-43da-ad96-a880e2502e5f" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_raggruppa488a7d7336}>
                      <View data-layer="5245b310-0f33-492f-b1d2-84f786c220ef" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_raggruppa488a7d7336_rettangolo12718f6040}></View>
                      <Text data-layer="3c5d55fb-0879-4cce-8584-d52db1057e2c" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_raggruppa488a7d7336_chargerb3b94d3c}>Charger</Text>
                  </View>
              </View>
              <View data-layer="c29f2b87-6f46-416e-bcab-bce8589477f4" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6}>
                  <Text data-layer="ed094dfd-0f72-4454-9adf-83d0e7ab1420" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_immagineGalleriaf9caaefc}>Immagine Galleria</Text>
                  <View data-layer="b5b74d6a-342d-4bef-9a5a-e89398f12ca6" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_raggruppa48c2451ea6}>
                      <View data-layer="b0049be7-ee28-4ae9-8d37-df13d6d8e9b7" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_raggruppa48c2451ea6_rettangolo127cda2174}></View>
                      <Text data-layer="8887219e-f0a2-4373-8203-fe725ffc4403" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_raggruppa48c2451ea6_charger8f3f5de0}>Charger</Text>
                  </View>
              </View>
              <View data-layer="d3a7e25f-db46-4d42-898f-91a03384af31" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274}>
                  <Text data-layer="b7b605b8-f018-4758-b093-d20b0a063c55" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_immagineGalleriaf6269dad}>Immagine Galleria</Text>
                  <View data-layer="1e0fa114-3282-4d39-8a1f-36be798e6433" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_raggruppa48b60b6669}>
                      <View data-layer="94e2bc0b-1d78-4345-b8f4-c1586e4aff78" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_raggruppa48b60b6669_rettangolo124c927b76}></View>
                      <Text data-layer="a54a8ca4-b68b-4a10-b697-2d644e6c6e75" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_raggruppa48b60b6669_chargere1dad9ab}>Charger</Text>
                  </View>
              </View>
              <View data-layer="fd5b74b1-3ba9-49b5-aed4-e7d1187b784c" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9}>
                  <Text data-layer="ac540909-b970-4c2e-bacb-e851afb0788d" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_immagineGalleria1251bc79}>Immagine Galleria</Text>
                  <View data-layer="6db0d460-edc7-467e-98ed-4a95b0b9d741" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_raggruppa48d4f86c70}>
                      <View data-layer="7f2c4309-06e7-4fc2-a0d6-14ad5a362023" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_raggruppa48d4f86c70_rettangolo12998180f5}></View>
                      <Text data-layer="7906950d-a2a0-4804-b83a-52929804532b" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_raggruppa48d4f86c70_chargeraa4f7201}>Charger</Text>
                  </View>
              </View>
              <View data-layer="22a3c2cd-1f95-48f7-aa95-26b8e73ac62e" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716}>
                  <Text data-layer="37c546b9-8bf8-4e55-99bd-0c9ea81781da" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_immagineGalleria05caea56}>Immagine Galleria</Text>
                  <View data-layer="92f4e1ea-0dd7-4cc8-956b-a532fca9a2f7" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_raggruppa489c126fa7}>
                      <View data-layer="cbd724d0-7a7a-4f39-8221-0e61a064219e" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_raggruppa489c126fa7_rettangolo12817cbdb8}></View>
                      <Text data-layer="c63719c8-009a-4ef7-92aa-c8a66211e94a" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_raggruppa489c126fa7_charger359b561c}>Charger</Text>
                  </View>
              </View>
              <View data-layer="079c1694-7378-44a9-a9eb-8e2d446de246" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb}>
                  <Text data-layer="b33d3486-61f3-4b2f-9606-fea12953c058" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_immagineGalleriad36345a9}>Immagine Galleria</Text>
                  <View data-layer="4fe8975a-94c8-431e-be01-f46626df3e13" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_raggruppa48d0efaf58}>
                      <View data-layer="75eee276-768b-4e29-91c4-44710905aec7" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_raggruppa48d0efaf58_rettangolo125c62a495}></View>
                      <Text data-layer="55ea79ba-92e0-4b05-887c-c181f65f9d7b" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_raggruppa48d0efaf58_charger9537c431}>Charger</Text>
                  </View>
              </View>
              <View data-layer="dea83a8a-c876-4f86-973d-c9de5b039586" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49}>
                  <Text data-layer="612e4f2b-52b3-4eb8-961a-2336ff7906bb" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_immagineGalleria}>Immagine Galleria</Text>
                  <View data-layer="7b5abadb-1980-4f4f-ae17-381e1e379d99" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_raggruppa48}>
                      <View data-layer="abf30f46-1965-4653-9f79-d0282ff866f1" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_raggruppa48_rettangolo12}></View>
                      <Text data-layer="7a3c3514-2c33-4f97-b4f1-764380dd1aa9" style={styles.inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_raggruppa48_charger}>Charger</Text>
                  </View>
              </View>
          </ScrollView>
          <View data-layer="96981b73-20ce-4d33-abc1-30c20bd38ad6" style={styles.inserimentoAttivita_rettangolo31}></View>
          <View data-layer="6395c16c-3607-4beb-894d-821905fb7b36" style={styles.inserimentoAttivita_rettangolo34}></View>
          <View data-layer="7c64d16c-07d8-4be1-93cb-b35ea14dcf8c" style={styles.inserimentoAttivita_rettangolo32}></View>
          <View data-layer="0058e59c-55de-412d-af6b-b0f1976b32cf" style={styles.inserimentoAttivita_rettangolo41}></View>
          <View data-layer="997cb66e-3b09-4bb1-95e4-578ba36fceae" style={styles.inserimentoAttivita_rettangolo33}></View>
          <View data-layer="9ee256a4-3e0b-4c40-a1b5-d5bd6573cead" style={styles.inserimentoAttivita_rettangolo35}></View>
          <View data-layer="3a02d2f2-52a1-4c00-ac69-036b7e6df819" style={styles.inserimentoAttivita_rettangolo36}></View>
          <Text data-layer="8db99bd1-81e9-47a0-928b-8f791bc40ae1" style={styles.inserimentoAttivita_caricamentoImmagini}>Caricamento Immagini</Text>
          <Text data-layer="afc80e60-2597-4039-b994-85cfd55ebd7e" style={styles.inserimentoAttivita_social}>Social</Text>
          <Text data-layer="f0926390-1da2-4abe-b7b1-28f8a2bafcf9" style={styles.inserimentoAttivita_galleriaMax9Immagini}>Galleria (max 9 immagini)</Text>
          <Svg data-layer="d2ace2b8-3f16-4fce-bc7f-3e132a97a7a2" style={styles.inserimentoAttivita_linea7} preserveAspectRatio="none" viewBox="0 -1 360 2" fill="transparent"><SvgPath d="M 360 0 L 0 0"  /></Svg>
          */}
      </ScrollView>
        <BottonMenu action1={this.action1} action2={this.action2} action3={this.action3}/>
      </View>
    );
  }
}

InserimentoAttivita.propTypes = {

}

InserimentoAttivita.defaultProps = {

}


const styles = StyleSheet.create({
  "menu_rettangolo1": {
    "opacity": 1,
    "backgroundColor": "rgba(220, 220, 220, 1)",
    "display":"flex",
    "flexDirection":"row",

    "width": "100%",
    "height": "10%",

  },
  "inserimentoAttivita": {
    "opacity": 1,

    "backgroundColor": "white",

    "width": "100%",
    "height": "90%",

  },
  "inserimentoAttivita_rettangolo11": {
    "opacity": 1,
    "backgroundColor": "rgba(220, 220, 220, 1)",


    "width": "100%",
    "height": 2980,

  },
  "inserimentoAttivita_rettangolo4": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 45,
    "left": 26,
    "top": 127
  },
  "inserimentoAttivita_rettangolo38": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 45,
    "left": 26,
    "top": 1869
  },
  "inserimentoAttivita_rettangolo28": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 45,
    "left": 26,
    "top": 202
  },
  "inserimentoAttivita_rettangolo39": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 45,
    "left": 26,
    "top": 1944
  },
  "inserimentoAttivita_rettangolo29": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 45,
    "left": 26,
    "top": 277
  },
  "inserimentoAttivita_rettangolo40": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 45,
    "left": 26,
    "top": 2019
  },
  "inserimentoAttivita_rettangolo37": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 45,
    "left": 26,
    "top": 352
  },
  "inserimentoAttivita_rettangolo30": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 308,
    "height": 339,
    "left": 26,
    "top": 437
  },
  "inserimentoAttivita_attivitaluogo": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 89,
    "height": 15,
    "left": 34,
    "top": 107
  },
  "inserimentoAttivita_facebook": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 60,
    "height": 15,
    "left": 34,
    "top": 1849
  },
  "inserimentoAttivita_indirizzo": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 53,
    "height": 15,
    "left": 34,
    "top": 182
  },
  "inserimentoAttivita_instagram": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 15,
    "left": 34,
    "top": 1924
  },
  "inserimentoAttivita_citta": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 29,
    "height": 15,
    "left": 34,
    "top": 257
  },
  "inserimentoAttivita_tripadvisor": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 69,
    "height": 15,
    "left": 34,
    "top": 1999
  },
  "inserimentoAttivita_telefono": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 53,
    "height": 15,
    "left": 34,
    "top": 332
  },
  "inserimentoAttivita_descrizioneMax150Caratteri": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 189,
    "height": 15,
    "left": 34,
    "top": 417
  },
  "inserimentoAttivita_categorie": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 60,
    "height": 15,
    "left": 34,
    "top": 786
  },
  "inserimentoAttivita_manger": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 47,
    "height": 15,
    "left": 85,
    "top": 828
  },
  "inserimentoAttivita_immagineProfilo": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 122,
    "height": 18,
    "left": 26,
    "top": 1002
  },
  "inserimentoAttivita_immagineCopertina": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 145,
    "height": 18,
    "left": 26,
    "top": 1065
  },
  "inserimentoAttivita_samuser": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "right",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 55,
    "height": 15,
    "left": 77,
    "top": 863
  },
  "inserimentoAttivita_visiter": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "right",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 36,
    "height": 15,
    "left": 219,
    "top": 828
  },
  "inserimentoAttivita_homePage": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 18,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "right",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 109,
    "height": 22,
    "left": 104,
    "top": 2156
  },
  "inserimentoAttivita_dormir": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "right",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 43,
    "height": 15,
    "left": 212,
    "top": 863
  },
  "inserimentoAttivita_inserimentoAttivita3378703d": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 22,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 232,
    "height": 27,
    "left": 58,
    "top": 57
  },
  "inserimentoAttivita_user": {
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
    "left": 19,
    "top": 12
  },
  "inserimentoAttivita_user_tracciato1": {
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
  "inserimentoAttivita_user_tracciato2": {
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
  "inserimentoAttivita_pincoPallino": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 12,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 80,
    "height": 15,
    "left": 53,
    "top": 26
  },
  "inserimentoAttivita_raggruppa46": {
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
    "width": 77,
    "height": 45,
    "left": 234,
    "top": 988
  },
  "inserimentoAttivita_raggruppa46_rettangolo12dccae145": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_raggruppa46_charger5677960c": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_raggruppa47": {
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
    "width": 77,
    "height": 45,
    "left": 234,
    "top": 1051
  },
  "inserimentoAttivita_raggruppa47_rettangolo12c14a1e11": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_raggruppa47_chargerdcab21d9": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_raggruppa50": {
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
    "width": 191,
    "height": 45,
    "left": 85,
    "top": 2224
  },
  "inserimentoAttivita_raggruppa50_rettangolo122c2ea86a": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 191,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_raggruppa50_envoyer": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 64,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2": {
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
    "width": 285,
    "height": 565,
    "left": 26,
    "top": 1191
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_immagineGalleriab1093e6d": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_raggruppa48fcbb7607": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_raggruppa48fcbb7607_rettangolo125f8b6a1f": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49f6bf5842_raggruppa48fcbb7607_charger36f36bc8": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 65
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_immagineGalleria3b726370": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_raggruppa480cf2264b": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_raggruppa480cf2264b_rettangolo12d77a0e4a": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49c11e48c1_raggruppa480cf2264b_charger3ca0d819": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 130
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_immagineGalleria48cf6e5f": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_raggruppa488a7d7336": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_raggruppa488a7d7336_rettangolo12718f6040": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa499aa66cf1_raggruppa488a7d7336_chargerb3b94d3c": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 195
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_immagineGalleriaf9caaefc": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_raggruppa48c2451ea6": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_raggruppa48c2451ea6_rettangolo127cda2174": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492be9aaa6_raggruppa48c2451ea6_charger8f3f5de0": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 260
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_immagineGalleriaf6269dad": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_raggruppa48b60b6669": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_raggruppa48b60b6669_rettangolo124c927b76": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa493287a274_raggruppa48b60b6669_chargere1dad9ab": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 325
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_immagineGalleria1251bc79": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_raggruppa48d4f86c70": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_raggruppa48d4f86c70_rettangolo12998180f5": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa4917050fe9_raggruppa48d4f86c70_chargeraa4f7201": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 390
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_immagineGalleria05caea56": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_raggruppa489c126fa7": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_raggruppa489c126fa7_rettangolo12817cbdb8": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa492508b716_raggruppa489c126fa7_charger359b561c": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 455
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_immagineGalleriad36345a9": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_raggruppa48d0efaf58": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_raggruppa48d0efaf58_rettangolo125c62a495": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49842609cb_raggruppa48d0efaf58_charger9537c431": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49": {
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
    "width": 285,
    "height": 45,
    "left": 0,
    "top": 520
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_immagineGalleria": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(0, 0, 0, 1)",
    "fontSize": 14,
    "fontWeight": "300",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "left",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 129,
    "height": 18,
    "left": 0,
    "top": 14
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_raggruppa48": {
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
    "width": 77,
    "height": 45,
    "left": 208,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_raggruppa48_rettangolo12": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "width": 77,
    "height": 45,
    "left": 0,
    "top": 0
  },
  "inserimentoAttivita_grigliaDiRipetizione2_raggruppa49_raggruppa48_charger": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 64,
    "height": 19,
    "left": 7,
    "top": 13
  },
  "inserimentoAttivita_rettangolo31": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 12,
    "height": 12,
    "left": 140,
    "top": 830
  },
  "inserimentoAttivita_rettangolo34": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 12,
    "height": 12,
    "left": 140,
    "top": 865
  },
  "inserimentoAttivita_rettangolo32": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 12,
    "height": 12,
    "left": 263,
    "top": 830
  },
  "inserimentoAttivita_rettangolo41": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 12,
    "height": 12,
    "left": 221,
    "top": 2163
  },
  "inserimentoAttivita_rettangolo33": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 1)",
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
    "width": 12,
    "height": 12,
    "left": 263,
    "top": 865
  },
  "inserimentoAttivita_rettangolo35": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",

    "width": "100%",
    "height": "50%",

  },
  "inserimentoAttivita_rettangolo36": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(35, 171, 224, 1)",
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
    "height": 30,
    "left": 0,
    "top": 1794
  },
  "inserimentoAttivita_caricamentoImmagini": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(220, 220, 220, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 180,
    "height": 19,
    "left": 90,
    "top": 913
  },
  "inserimentoAttivita_social": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(220, 220, 220, 1)",
    "fontSize": 15,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 46,
    "height": 19,
    "left": 157,
    "top": 1799
  },
  "inserimentoAttivita_galleriaMax9Immagini": {
    "opacity": 1,
    "position": "absolute",
    "backgroundColor": "rgba(255, 255, 255, 0)",
    "color": "rgba(25, 25, 25, 1)",
    "fontSize": 14,
    "fontWeight": "700",
    "fontStyle": "normal",
    "fontFamily": "Montserrat-Regular",
    "textAlign": "center",
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 0,
    "paddingRight": 0,
    "paddingBottom": 0,
    "paddingLeft": 0,
    "width": 186,
    "height": 18,
    "left": 87,
    "top": 1137
  },
  "inserimentoAttivita_linea7": {
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
    "width": 360,
    "height": 2,
    "left": 0.5,
    "top": 2111.5
  }
});
