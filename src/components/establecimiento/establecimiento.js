import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from "react-native-vector-icons/Entypo";
import PropTypes from "prop-types";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image,TouchableOpacity} from 'react-native';
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
        height:"70%",
        display:"flex",
        flexDirection:"row"

      },
      "hijo2B":{

        width:"100%",
        height:"30%",
        display:"flex",
        flexDirection:"row"

      },
      imageLogo:{
        width:"20%",
        height:"100%",
        display:"flex",
        flexDirection:"row",

      },
      info:{
        width:"80%",
        height:"100%",
        display:"flex",
        flexDirection:"column"
      },
      infoName:{
        width:"100%",
        height:"40%",
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
        "width": "95%",
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
      phone:{
        "opacity": 1,
        marginLeft:"5%",

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

    console.log(this.props.datos)


      return(

        <TouchableOpacity style={misEstilos.padre}
          onPress={()=>this.props.navigation.navigate("Attivita",{datos:this.props.datos})}

        >
          <View style={{width:"100%", height:"50%", display:"flex", flexDirection:"row"}}>
            <View style={{backgroundColor:"#F9F9F9",width:"5%", height:"100%"}}>
            </View>
            <View data-layer="a9e55bbf-06d2-4d63-af51-2f4433ab3ace" style={misEstilos.home_grigliaDiRipetizione1_raggruppa27b4dd0fa1_raggruppa16ec058b81_rettangolo1302b2c573}>

              <View style={misEstilos.hijo2}>
                <View style={misEstilos.imageLogo}>

                  <Image source={{uri:this.props.datos.imagine[0]}} style={{width:"90%",height:"60%"}}></Image>

                </View>
                <View style={misEstilos.info}>
                  <View style={misEstilos.infoName}>
                    <Text data-layer="146451af-e4cd-4368-8dee-800e1f03355c" style={misEstilos.categoria_grigliaDiRipetizione1_raggruppa272e2a4d1d_raggruppa168e69a9b1_cittaDiBraeacc8e89}>{this.props.datos.attivitaLuogo}</Text>
                  </View>
                  <View style={misEstilos.infoDescription}>
                  <Text data-layer="52e9f297-f844-4c73-a68c-9dfc91caedf6" style={misEstilos.categoria_grigliaDiRipetizione1_raggruppa272e2a4d1d_raggruppa168e69a9b1_laCapitaleDeLaGastronomieADeuxPasDeNiceLaCapitaleDeLaGastronomieAa88114dc}>{this.props.datos.descrizione}</Text>

                  </View>

                </View>

              </View>

              <View style={misEstilos.hijo2B}>
                <View style={misEstilos.numeroCitat}>
                  <Icon name="phone" size={20} color="black" style={{marginLeft:"10%",marginRight:"10%"}}/>
                  <Text style={misEstilos.phone}>{this.props.datos.telefono}</Text>
                </View>
                <View style={misEstilos.citat}>
                  <Icon2 name="direction" size={20} style={{marginRight:"10%", marginLeft:"10%"}} color="#28337F" />
                  <Text style={misEstilos.phone}>{this.props.datos.citta}</Text>
                </View>
              </View>

            </View>
          </View>

          <View style={misEstilos.hijo1}>

            <Image source={{uri:this.props.datos.imagine[1]}} style={{width:"95%",height:"100%"}}></Image>
            <View style={{width:"5%", height:"100%", display:"flex", flexDirection:"row", backgroundColor:"#F9F9F9"}}></View>
          </View>
        </TouchableOpacity>



      );


    }



}
