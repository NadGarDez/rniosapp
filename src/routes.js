import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignIn from '~/pages/register/register.js';

import Home from '~/pages/home/home.js';
import Categoria from '~/pages/categoria/categoria.js';

import Menu from '~/pages/menu/menu.js';

import Attivita from '~/pages/attivita/attivita.js';

import MLogin from '~/pages/menuLogin/menuLogin.js';

import InserimentoAttivita from '~/pages/inserimentoAttivita/inserimentoAttivita.js';

import Establecimiento from '~/components/establecimiento/establecimiento.js';

import Recomendaciones from "~/pages/recomendaciones/recomendaciones.js";


function createNavigator(isLoggedIn = false) {
  return createAppContainer(
    createSwitchNavigator(
      {
        MLogin,
        Main: createStackNavigator(
          {
            Home,
            InserimentoAttivita,
            Attivita,
            Recomendaciones,
            Categoria,
            Establecimiento,
            MLogin,
            Menu,
            SignIn,


          },
          {
            defaultNavigationOptions: {
              header: null,
            },
          },
        ),
      },
      {
        initialRouteName: isLoggedIn ? 'Main' : 'SignIn',
      },
    ),
  );
}

export default createNavigator;
