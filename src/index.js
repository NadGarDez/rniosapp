import '~/config/ReactotronConfig';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Toast } from 'react-native-redux-toast';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'

import store from '~/store';

import App from './App';

const Root = () => (
  <Provider store={store}>
    <Fragment>
      <View style={{width:"100%",height:"4%"}}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <App />
      <Toast messageStyle={{ color: 'white' }} />
    </Fragment>
  </Provider>
);

export default Root;
