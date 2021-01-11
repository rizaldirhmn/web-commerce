import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Hidden
} from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline'

// import { addLogin } from '../../actions/login'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

// import AppBar from './AppBar'

const useStyles = makeStyles((theme) => ({
	root: {
	  height: '100vh'
	},
	paper: {
	  margin: theme.spacing(10, 4),
		// marginTop: theme.spacing(20),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '30px 50px',
		fontSize: 16,
		textAlign: 'center',

	},
	paper2: {
		margin: theme.spacing(4, 4),
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
		border: '0.5px solid rgba(224, 224, 224, 0.5)',
		boxSizing: 'border-box',
		color: '#FFFFFF',
		width: '100%',
		fontFamily: 'Montserrat',
		borderRadius: theme.spacing(1)
	},
	googleLogo : {
		left: 0,
		marginRight: '10px'
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
	logoClub: {
		width: "100%"
	},
	btnForget: {
		display: 'flex',
		justifyContent: 'flex-end',
		width: '100%',
		// marginTop: theme.spacing(5),
	},
	footer: {
		fontSize: 14
	},
	loginContent: {
		marginTop: theme.spacing(0)
	},
	bottomPush: {
		position: "fixed",
		bottom: 0,
		textAlign: "center",
		marginBottom: 20,
		width: '100%',
		marginLeft: '50px',
		// marginRight: 'auto'
	},
	text: {
		fontFamily: 'Montserrat'
	}
}))

const SignInSchema = yup.object().shape({
	email: yup.string().required("email harus diisi").email("Format Email salah"),
	password: yup.string().required("Password harus diisi"),
});

const Login =  props => {
	const classes = useStyles();
	const history = useHistory();

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SignInSchema)
	});
	
	const onSubmit = event => {
		// console.log(event);
		// addLogin(event, history)
		props.onAuth(event.email, event.password, history)
		// console.log(event);
	}

	return (
		<div>
			{/* <AppBar /> */}
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
					{/* <Grid container> */}
						{/* <Grid item lg={12} md={12} sm={12} xs={12}> */}
							<div className={classes.paper2}>
								<div className={classes.loginContent}>
									<div>
										<img src={`${process.env.PUBLIC_URL}/images/logo/logo_dzualan.png`} alt="club" className={classes.logoClub} />
									</div>

									<div className={classes.btnForget}>
										<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
											<TextField
												variant="outlined"
												margin="normal"
												fullWidth
												id="email"
												label="Email"
												name="email"
												autoFocus
												inputRef={register}
												error={!!errors.email}
												helperText={errors.email && errors.email.message}
												className={classes.textField}
											/>
											<TextField
												variant="outlined"
												margin="normal"
												fullWidth
												name="password"
												label="Password"
												type="password"
												id="password"
												autoComplete="current-password"
												inputRef={register}
												error={!!errors.password}
												helperText={errors.password && errors.password.message}
												className={classes.textField}
											/>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												color="primary"
												className={classes.submit}
											>
												Sign In
											</Button>
										</form>
									</div>
									
									{/* <div className={classes.bottomPush}>
										<Grid container spacing={2}>
											<Grid item>
												<img src={`${process.env.PUBLIC_URL}/images/logo/logo.ico`} alt="jari"/>
											</Grid>
											<Grid item>
												<Typography align="left" className={classes.text}>
													Powered by <br></br>
													PT Ngampooz Pintar Sejahtera
												</Typography>
											</Grid>
										</Grid>
									</div> */}
								</div>
							</div>
						{/* </Grid> */}
					{/* </Grid> */}
				</Grid>
			</Grid>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, history) => dispatch(actions.auth(email, password, history)),
    // onAlert: (message, alertType) => dispatch(actions.setAlert(message, alertType))
  }
}

export default connect(null, mapDispatchToProps)(Login);