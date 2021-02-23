import React, { useEffect, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image,Alert} from 'react-native';
const GooglePlacesInput = (props) => {
  const ref = useRef();
  useEffect(() => {
   ref.current?.focus();
 }, []);
  return (

      <GooglePlacesAutocomplete
        autoFocus={true}
        ref={ref}
        placeholder='indirizzo'
        fetchDetails = {true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //var func = props.navigation.getParam('saveText')
          obj ={
            data:ref.current.getAddressText(),
            geocode:details.geometry.location
          }
          props.saveText(obj,"indirizzo");
          props.changeModal(1);


        }}
        query={{
          key: 'AIzaSyBv2vDbJlYGLqHoa0NC-sg1dVkfZJ0AXaQ',
          language: 'en',
          type:"address"
        }}

      />


  );
};

export default GooglePlacesInput;
