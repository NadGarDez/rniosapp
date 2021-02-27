import React, { useEffect, useRef }  from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, TouchableHighlight, ImageBackground, Dimensions, Image} from 'react-native';
const GooglePlacesInput = (props) => {
    const ref = useRef();
    useEffect(() => {
   ref.current?.focus();
 }, []);
  return (
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder='citta'
        fetchDetails = {true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //var func = props.navigation.getParam('saveText')
          props.saveText(ref.current.getAddressText(),"citta");
          props.changeModal(2);
        }}
        query={{
          key: 'AIzaSyAbKkSvFU5HqUOlDyKd4QZWs-PwFUovizQ',
          language: 'en'
        }}
      />


  );
};

export default GooglePlacesInput;
