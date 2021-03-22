
import React, {Component} from 'react';
import {Checkbox} from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from "prop-types";
import Icon2 from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import Icon5 from "react-native-vector-icons/Fontisto";
import Icon6 from "react-native-vector-icons/AntDesign";
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableOpacity} from "react-native"
import {Image as ReactImage} from 'react-native';
import Svg, {Defs, Pattern} from 'react-native-svg';
import {Path as SvgPath} from 'react-native-svg';
import {Text as SvgText} from 'react-native-svg';
import {Image as SvgImage} from 'react-native-svg';
import BouncyCheckbox from "react-native-bouncy-checkbox";






export default class MyCheckbox extends React.PureComponent {
  render() {
    const { checked, onChange } = this.props;
    
    return (
<View>
	<Icon name="check_box"/>
      <TouchableOpacity
        accessibilityComponentType={
          checked ? "radiobutton_checked" : "radiobutton_unchecked"
        }
        accessibilityTraits={
          checked ? ["button", "selected"] : ["button"]
        }
        onPress={onChange}
 >
	<Text>hey</Text>
        <Icon5 name={checked ? "check_box" : "check_box_outline_blank"} />
      </TouchableOpacity>
</View>
    );
  }
}

