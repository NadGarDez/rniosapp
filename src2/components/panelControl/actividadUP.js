import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image,TouchableOpacity,Alert} from 'react-native';
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import Absolute from 'react-native-absolute';
export default class Establecimiento extends Component {

  /*
    props:
      objDat={
        nombre,
        imagenLogo,
        descripcion,
        ciudad,
        numero,
        imagen grande

      }


  */

  constructor(props) {
        super(props);
        this.state = {
            apendice: `?${new Date().getTime()}`
        };

        this.alto = Dimensions.get('window').height,
        this.ancho = Dimensions.get('window').width,

        this.altoComponente = 40 * this.alto;
        this.altoComponente = this.altoComponente / 100;
    }


  render(){

    objDat={
      nombre:"Città di Bra",
      imagenLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU",
      descripcion:"La capitale de la gastronomie, à deux pas de Nice La capitale de la gastronomie, à ....",
      eslogan:"Ristorante Piemontese",
      ciudad: "Bra (CN)",
      numero: "0172 430185",
      imagenGrande:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU",
      images:[
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNT-mBYkXItmGJJ2NlsOpXBK_fekdpKj7gjg&usqp=CAU"
      ],
      resena:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus placerat porttitor nulla non venenatis. Nam sagittis elit nisl, vitae venenatis felis facilisis vitae. Phasellus eu feugiat nunc. Curabitur aliquet euismod quam blandit volutpat. Etiam eget orci sit amet tellus sagittis porttitor. Vestibulum dignissim lobortis libero, ac laoreet ipsum ullamcorper sed. Ut iaculis nulla vitae sem venenatis, ac lacinia sem aliquam. Phasellus et mauris varius, consectetur libero eget, euismod quam \n Mauris vitae efficitur felis, quis ultricies augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi rutrum cursus odio sit amet vulputate. Phasellus nisl metus, placerat at leo sed, placerat ullamcorper tellus. Suspendisse id lacus auctor, semper magna nec, volutpat magna. Donec pretium, lacus et sagittis molestie, diam libero egestas dui, eu rhoncus velit odio quis ex. Cras eget orci semper sem fermentum aliquam. Nam libero ligula, sagittis id lorem non, auctor elementum nisl. Aenean pellentesque",
      direccion:"Via Bra, 30 Cherasco CN",
      services:[
        [
          "restaurant",
          true
        ],
        [
          "room-service",
          true
        ],
        [
          "sait-boat",
          true
        ],
        [
          "bank",
          true
        ]

      ]

    }

    misEstilos = {


      padre:{
        "width":this.ancho,
        "height":this.altoComponente,
        "display":"flex",
        "flexDirection":"column",
        marginBottom:10


      },

      hijo1:{
        width:"100%",
        height:"50%",
        display:"flex",
        flexDirection:"row"
      },
      hijo2:{

        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap"

      },
      "hijo2B":{

        width:"100%",
        height:"30%",
        display:"flex",
        flexDirection:"row"

      },
      imageLogo:{
        width:"20%",
        height:"40%",
        display:"flex",
        flexDirection:"row",

      },
      info:{
        width:"75%",
        height:"40%",
        display:"flex",
        flexDirection:"column"
      },
      infoName:{
        width:"100%",
        height:"50%",
        display:"flex",
        justifyContent:"center"

      },
      infoDescription:{
        width:"100%",
        height:"60%",
        display:"flex",
        justifyContent:"center"
      },
      numeroCitat:{

        width:"50%",
        height:"100%",
        display:"flex",
        flexDirection:"row",
        alignItems:"center"

      },
      "citat":{

        width:"50%",
        height:"100%",
        display:"flex",
        flexDirection:"row-reverse",
        alignItems:"center"

      },
      "home_grigliaDiRipetizione1_raggruppa27b4dd0fa1_raggruppa16ec058b81_rettangolo1302b2c573": {
        "opacity": 1,
        "backgroundColor": "rgba(220, 220, 220, 1)",
        "width": "100%",
        "height": "100%",

      },
      "categoria_grigliaDiRipetizione1_raggruppa272e2a4d1d_raggruppa168e69a9b1_cittaDiBraeacc8e89": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 20,
        "fontWeight": "700",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",

      },
      "menuLogin_rettangolo20": {
        "opacity": 1,

        "backgroundColor": "#28337F",

        "borderTopLeftRadius": 15,
        "borderTopRightRadius": 15,
        "borderBottomLeftRadius": 15,
        "borderBottomRightRadius": 15,
        "width": "33%",
        "height": "80%",

      },
      phone:{
        "opacity": 1,
        marginLeft:"5%",
//
        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 15,
        "fontWeight": "bold",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
      },

      "categoria_grigliaDiRipetizione1_raggruppa272e2a4d1d_raggruppa168e69a9b1_laCapitaleDeLaGastronomieADeuxPasDeNiceLaCapitaleDeLaGastronomieAa88114dc": {
        "opacity": 1,

        "backgroundColor": "rgba(255, 255, 255, 0)",
        "color": "rgba(25, 25, 25, 1)",
        "fontSize": 12,
        "fontWeight": "300",
        "fontStyle": "normal",
        "fontFamily": "Montserrat",
        "textAlign": "left",

        "width": "90%",

      },


    }



    let publicacion = new Date(this.props.datos.created_at).toLocaleDateString();
    let caducidad = new Date(this.props.datos.vencimiento).toLocaleDateString();
    //console.log(this.props.datos.imagine[0]+"?"+new Date().getTime());
      return(

        <View style={misEstilos.padre}>
          <View style={{width:"100%", height:"60%", display:"flex", flexDirection:"row"}}>

            <View data-layer="a9e55bbf-06d2-4d63-af51-2f4433ab3ace" style={misEstilos.home_grigliaDiRipetizione1_raggruppa27b4dd0fa1_raggruppa16ec058b81_rettangolo1302b2c573}>

              <View style={misEstilos.hijo2}>
                <View style={misEstilos.imageLogo}>

                  <Image source={{uri:this.props.datos.imagine[0]+this.state.apendice}} style={{width:"90%",height:"100%"}}></Image>

                </View>
                <View style={misEstilos.info}>
                  <View style={misEstilos.infoName}>
                    <Text data-layer="146451af-e4cd-4368-8dee-800e1f03355c" style={misEstilos.categoria_grigliaDiRipetizione1_raggruppa272e2a4d1d_raggruppa168e69a9b1_cittaDiBraeacc8e89}>{this.props.datos.attivitaLuogo}</Text>
                  </View>
                  <View style={{display:"flex", flexDirection:"row"}}>
                    <Text style={{fontWeight:"bold"}}>Publié par:</Text>
                    <Text>{this.props.admin == true ? this.props.datos.nombreUser : "Me"}</Text>
                  </View>


                </View>
                <View style={{width:"100%", height:"60%",display:"flex", flexWrap:"wrap"}}>
                  <View style={{width:"50%", height:"50%",display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                  <Text style={{fontWeight:"bold"}}>Publication:</Text>
                  <Text>{publicacion}</Text>
                  </View>
                  <View style={{width:"50%", height:"50%",display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                    <Text style={{fontWeight:"bold"}}>Expiration:</Text>
                    <Text>{caducidad}</Text>
                  </View>
                  <View style={{width:"50%", height:"50%",display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                    <Text style={{fontWeight:"bold"}}>Actif:</Text>
                    <Text>{this.props.datos.estado == "activo" ? "sí" : "non" }</Text>
                  </View>
                  <View style={{width:"50%", height:"50%",display:"flex", alignItems:"center", justifyContent:"center",flexDirection:"row"}}>
                    <Text style={{fontWeight:"bold"}}>Payé:</Text>
                    <Text>{this.props.datos.pagado == true ? "sí" : "non"}</Text>
                  </View>
                </View>

              </View>



            </View>
          </View>

          <View style={{width:"100%", height:"30%", display:"flex", flexDirection:"row",alignItems:"center"}}>

            <TouchableOpacity style={[misEstilos.menuLogin_rettangolo20,{marginLeft:"1.5%",marginRight:"1.5%",diaplay:'flex', flexDirection:"row", flexWrap:'wrap', justifyContent:'center',width:'30%',height:50,alignItems:"center"}]}
              onPress={
                async ()=>{
                  if(this.props.datos.estado == "activo"){
                    await this.props.desactivar(this.props.datos.id)

                  }

                  else{
                    await this.props.activar(this.props.datos.id,this.props.datos.estado.pagado)

                  }
                }
              }
            >
              <Text style={{color:"#F9F9F9"}}>{this.props.datos.estado == "activo" ? "Désactiver" : "Activer"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[misEstilos.menuLogin_rettangolo20,{marginLeft:"1.5%",marginRight:"1.5%",diaplay:'flex', flexDirection:"row", flexWrap:'wrap', justifyContent:'center',width:'30%',height:50,alignItems:"center"}]}
              onPress={
              async ()=>{
                  await this.props.preEnviar(this.props.datos.vencimiento,this.props.datos.id)
                  this.props.changeModalPaypal()

                }
              }
            >
              <Text style={{color:"#F9F9F9"}}>Payer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[misEstilos.menuLogin_rettangolo20,{marginLeft:"1.5%",marginRight:"1.5%",margmargdiaplay:'flex', flexDirection:"row", flexWrap:'wrap', justifyContent:'center',width:'30%',height:50,alignItems:"center"}]}
              onPress={
                ()=>{
                  this.props.navigation.navigate("InserimentoAttivita2", {id:this.props.datos.id})
                }
              }
            >
              <Text style={{color:"#F9F9F9"}}>Modifier</Text>
            </TouchableOpacity>
          </View>
        </View>



      );


    }



}
