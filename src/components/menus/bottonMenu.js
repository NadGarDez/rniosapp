import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet, Text, View, Modal,TextInput, FlatList, Picker, ScrollView, TouchableHighlight,TouchableOpacity, Alert} from 'react-native';
import { Container, Header, Content, Accordion ,Button} from "native-base";
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';

import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native'
import CheckBox from '@react-native-community/checkbox';
import Sfetch from "../../services/fetchManager.js";
const scom = require("../../services/url.js");
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default class MenuLogin extends Component {

  constructor(props) {
      super(props);
      this.state = {

      };

  }



  render() {


    return (
    <View data-layer="10e3e5e0-d684-4683-855a-adb2248fb403" style={styles.menu_rettangolo1}>
      <TouchableOpacity style={{width:"33%", height:"100%",display:"flex", alignItems:"center", justifyContent:"center"}} underlayColor="white"
      onPress={
        ()=>{
          this.props.action1();
        }
      }
      >

            <Icon2 name="menu" size={30} />

      </TouchableOpacity>

      <TouchableOpacity style={{width:"33%", height:"100%",display:"flex", alignItems:"center", justifyContent:"center"}} underlayColor="white"
        onPress={
          ()=>{
            this.props.action2();
          }
        }
      >
        <Icon name="home" size={30}/>
      </TouchableOpacity>

      <TouchableOpacity style={{width:"33%", height:"100%",display:"flex", alignItems:"center", justifyContent:"center"}} underlayColor="white"
        onPress={
          ()=>{
            this.props.action3();
          }
        }
      >
        <Icon  name="left" size={30}/>
      </TouchableOpacity>

    </View>

    );
  }

}

const styles = StyleSheet.create({
  "menu_rettangolo1": {
    "opacity": 1,
    "backgroundColor": "rgba(220, 220, 220, 1)",
    "display":"flex",
    "flexDirection":"row",

    "width": "100%",
    "height": "10%",

  }
})
