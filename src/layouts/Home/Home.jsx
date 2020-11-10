import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { 
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import ButtonSignOut from '@material-ui/icons/Input'
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'transparent',
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  signOut: {
    color: '#000'
  },
  buttonSignOut: {
      backgroundColor: '#F45B5B',
      color: '#ffffff'
  }
}));

const Home = props => {
    const { children } = props;
    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleDoLogout = () => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('expires_in');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('data');
        sessionStorage.clear();
        setRedirect({values: true});
      }

    const handlingSignout = event => {
        event.persist();
        setDialogOpen(true)
        
    };

    const [redirect, setRedirect] = useState({
        values : false
    });

    if (redirect.values) {
        return <Redirect to='/sign-in'/>;
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Grid 
                    container
                    justify="space-between"
                >
                    <Grid item>

                    </Grid>
                    <Grid item>
                        <Toolbar>
                            <Button 
                                variant="contained" 
                                className={classes.buttonSignOut}
                                startIcon={<ButtonSignOut />}
                                onClick={handlingSignout}
                            >
                                Sign Out
                            </Button>
                        </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
            <main 
                className={classes.content}
            >
                {children}
            </main>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Logout Confirmation"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Apakah anda ingin keluar?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Tidak
                </Button>
                <Button onClick={handleDoLogout} color="primary" autoFocus>
                    Ya
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Home
