import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';

// Firebase Initial
import { messaging } from "./init-fcm";

// Redux
import { Provider } from 'react-redux'
import store from './store'
import Alert from './components/layout/Alert'

const browserHistory = createBrowserHistory();

export default function App() {
  const fetchData = async () => {
    messaging.requestPermission()
    .then(async function() {
      const token = await messaging.getToken();
      console.log(token);
    })
    .catch(function(err) {
      console.log("Unable to get permission to notify.", err);
    });
    navigator.serviceWorker.addEventListener("message", (message) => console.log(message.data.data.link));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Alert />
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
