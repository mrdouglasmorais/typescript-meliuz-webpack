import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import { ToastContainer } from 'react-toastify';

import store from '@/store';

import '@/styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

import RoutesComponents from '@/routes';

render((
  <Provider store={store}>
    <ToastContainer />
    <RoutesComponents />
  </Provider>
), document.getElementById('root'))