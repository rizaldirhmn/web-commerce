import React from "react";
import { Grid, TextField } from "@material-ui/core";
// import Logo from '../img/login-logo.png';
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';

// import { addLogin } from '../../actions/login'
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
	root: {
	  height: '100vh'
	},
	image: {
	  backgroundColor: '#011747',
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
	  // borderRadius: 100
	},
	contentName: {
	  // padding: '200px 20px 0px',
	  padding: theme.spacing(25, 6)
	},
	center: {
	  color: '#FFFFFF',
	  fontSize: 50,
	  paddingBottom: 15
	},
	center2: {
	  color: '#FFFFFF',
	  fontSize: 60
	}, 
	logoClub: {
		width: 113,
		height: 'auto',
	},
	welcome: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	btnForget: {
		alignSelf: 'flex-end',
		marginRight: 15,
		marginBottom: 15,
	},
	footer: {
		fontSize: 14
	}
}))

const SignInSchema = yup.object().shape({
  email: yup.string().required("Email harus diisi"),
	password: yup.string().required("Password harus diisi"),
});

const Login =  props => {
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SignInSchema)
	});
	
	const onSubmit = event => {
		console.log(event);
		// addLogin(event, history)
		props.onAuth(event.email, event.password, history)
		// console.log(event);
	}

	return (
		<Grid container>
			<Grid item lg={12} md={12} sm={12} xs={12}>
				<Grid container>
					<Grid item lg={3} md={3} sm={12} xs={12} />
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<Paper className={classes.paper}>
							<div>
								<img src={require('../../assets/images/logo/club.png')} alt="club" className={classes.logoClub} />
							</div>
							<div className={classes.welcome}>
								Selamat Datang Kembali
							</div>
							<div>
								Masuk ke D'Syirkah Management System
							</div>
							<div>
								<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
									<TextField
										variant="outlined"
										margin="normal"
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										autoFocus
										inputRef={register}
										error={!!errors.email}
										helperText={errors.email && errors.email.message}
										// className={classes.textField}
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
										// className={classes.textField}
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

							<div className={classes.btnForget}>
								<Button style={{color: '#0277BD'}}>
									Lupa Kata Sandi
								</Button>
							</div>

							<div className={classes.footer}>
								© EOA Tech Team. 2020
							</div>
						</Paper>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, history) => dispatch(actions.auth(email, password, history)),
    // onAlert: (message, alertType) => dispatch(actions.setAlert(message, alertType))
  }
}

export default connect(null, mapDispatchToProps)(Login);