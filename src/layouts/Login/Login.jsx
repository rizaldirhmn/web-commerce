import React from "react";
import { Grid, Typography } from "@material-ui/core";
// import Logo from '../img/login-logo.png';
import { makeStyles } from "@material-ui/core/styles";
import {
  Hidden
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline'

// import { addLogin } from '../../actions/login'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

// Google Login
import { GoogleLogin } from 'react-google-login';

import AppBar from './AppBar'

const useStyles = makeStyles((theme) => ({
	root: {
	  height: '100vh'
	},
	paper: {
	  margin: theme.spacing(8, 4),
	  display: 'flex',
	  flexDirection: 'column',
		alignItems: 'center',
		padding: '30px 50px',
		fontSize: 16,
		textAlign: 'center',
	},
	avatar: {
	  marginTop: theme.spacing(8),
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  // marginTop: 20,
	  paddingTop: 25
	},
	textField: {
	  [`& fieldset`]: {
		borderRadius: 100,
	  },
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	  backgroundColor: '#0277BD',
	  '&:hover': {
		backgroundColor: '#0277BD'
	  },
	  color: '#FFFFFF',
	  width: '100%'
	  // borderRadius: 100
	},
	contentName: {
	  // padding: '200px 20px 0px',
	  padding: theme.spacing(25, 6)
	},
	image: {
		width: '100%',
		height: 'auto'
	},
	center: {
	  color: '#FFFFFF',
	  fontSize: 50,
	  paddingBottom: 15
	},
	welcome: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	btnForget: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%',
		marginBottom: 15,
	},
	footer: {
		fontSize: 14
	},
	loginContent: {
		marginTop: theme.spacing(5)
	}
}))

const Login =  props => {
	const classes = useStyles();
	const history = useHistory();

	const responseGoogle = (response) => {
		console.log(response.tokenId);
		console.log(response.profileObj);
		props.onAuth(response.tokenId, history)

		// sessionStorage.setItem('access_token', response.accessToken)

		// history.push('/dashboard')
	}

	return (
		<div>
			<AppBar />
			<Grid container>
				<CssBaseline />
				<Grid item xs={false} sm={false} md={6} lg={7} className={classes.image} >
					<Hidden only={["xs","sm"]}>
						<div className={classes.paper}>
							<img className={classes.image} src={`${process.env.PUBLIC_URL}/images/logo/banner_login.png`} alt=""/>
						</div>
					</Hidden>
				</Grid>
				<Grid item lg={4} md={4} sm={6} xs={12}>
					<Grid container>
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<div className={classes.paper}>
								<div className={classes.loginContent}>
									<div>
										<img src={`${process.env.PUBLIC_URL}/images/jari_visibility.png`} alt="club" className={classes.logoClub} />
									</div>

									<div className={classes.btnForget}>
										{/* <Button style={{color: '#0277BD'}}>
											Lupa Kata Sandi
										</Button> */}
										<GoogleLogin
											className={classes.submit}
											clientId="536549901613-h37hneagkf2fgjpcpn5uk4vqi6elouoq.apps.googleusercontent.com"
											buttonText="Login With Google"
											onSuccess={responseGoogle}
											onFailure={responseGoogle}
											cookiePolicy={'single_host_origin'}
										/>
									</div>

									<div className={classes.footer}>
										{/* © EOA Tech Team. 2020 */}
										<Grid container spacing={2}>
											<Grid item>
												<img src={`${process.env.PUBLIC_URL}/images/logo/logo.png`} alt="jari"/>
											</Grid>
											<Grid item>
												<Typography align="left">
													Powered by <br></br>
													PT Jari Solusi Internasional
												</Typography>
											</Grid>
										</Grid>
									</div>
								</div>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (tokenId, history) => dispatch(actions.auth(tokenId, history)),
    // onAlert: (message, alertType) => dispatch(actions.setAlert(message, alertType))
  }
}

export default connect(null, mapDispatchToProps)(Login);