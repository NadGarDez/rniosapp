import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, TouchableOpacity, View, Text } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';

import {
  Container, HeaderContent, Title, Cart, CounterContainer, CounterText,
} from './styles';

import headerBg from '~/assets/header-background.png';

const ProductHeader = ({ cartItems, onPressCart, onPressOrders, onLogout}) => (
  <Fragment>
    <StatusBar barStyle="light-content" />
    <Container source={headerBg}>
      <View class={viewBlock}>
        <HeaderContent>
          <TouchableOpacity onPress={onPressOrders}>
            <MIcon name="history" size={30} color="#fff" />
          </TouchableOpacity>
          <Title>Tienda deleivery de muestra</Title>
          <Cart onPress={onPressCart}>
            <CounterContainer>
              {!!cartItems && <CounterText>{cartItems}</CounterText>}
            </CounterContainer>
            <SIcon name="handbag" size={20} color="#fff" />
          </Cart>

        </HeaderContent>
        <View style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={onLogout}>
              <View>
                <Text style={{color:'red'}}>Logout</Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>

    </Container>
  </Fragment>
);

ProductHeader.propTypes = {
  cartItems: PropTypes.number.isRequired,
  onPressCart: PropTypes.func.isRequired,
  onPressOrders: PropTypes.func.isRequired,
};

viewBlock={
  display:'flex',
  flexDirection:"column"
}

export default ProductHeader;
