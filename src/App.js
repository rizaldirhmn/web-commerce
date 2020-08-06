import "core-js/stable";
// Babel Polyfill
import '@babel/polyfill'
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

// Clear Cache
import { useClearCache } from 'react-clear-cache';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



const browserHistory = createBrowserHistory();

export default function App() {
  const { isLatestVersion, emptyCacheStorage } = useClearCache({ duration: 5000 });
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
    if(messaging !== undefined){
      fetchData();
    }
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      {!isLatestVersion && (
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Update info"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Update aplikasi nya dulu yuk
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary">
                Tidak
              </Button>
              <Button 
                onClick={e => {
                  e.preventDefault();
                  emptyCacheStorage();
                }} 
                color="primary" 
                autoFocus
              >
                Ya
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Alert />
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
