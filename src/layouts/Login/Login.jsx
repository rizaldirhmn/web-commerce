import React from "react";
import { Grid, TextField } from "@material-ui/core";
// import Logo from '../img/login-logo.png';
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Hidden,
  Typography,
  Paper
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';

import { addLogin } from '../../actions/login'
import { connect } from 'react-redux'

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
	  alignItems: 'center'
	},
	avatar: {
	  marginTop: theme.spacing(8),
	},
	form: {
	  width: '100%', // Fix IE 11 issue.
	  marginTop: theme.spacing(1),
	  paddingTop: 30
	},
	textField: {
	  [`& fieldset`]: {
		borderRadius: 100,
	  },
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	  backgroundColor: '#FF9300',
	  '&:hover': {
		backgroundColor: '#ef8b03'
	  },
	  color: '#FFFFFF',
	  borderRadius: 100
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
	}
}))

const SignInSchema = yup.object().shape({
  email: yup.string().required("Email harus diisi"),
	password: yup.string().required("Password harus diisi"),
});

const Login = ({ addLogin }) => {
	const classes = useStyles();
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SignInSchema)
	});
	
	const onSubmit = event => {
		addLogin(event, history)
	}

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={false} md={6} lg={7} className={classes.image} >
				<Hidden only={["xs","sm"]}>
				<div className={classes.contentName}>
					<Typography variant="h1" className={classes.center}>
					Point Of Sales
					</Typography>
					<Typography variant="h1" className={classes.center2}>
					EOA Gold - Cabang
					</Typography>
				</div>
				</Hidden>
			</Grid>
			<Grid item xs={12} sm={12} md={6} lg={5} component={Paper} elevation={6} square>
				
				<div className={classes.paper}>
				<div container>
					<div item lg={12} sm={12} md={12} xs={12}>
					<center>
					<img src={`${process.env.PUBLIC_URL}/images/logo/logo_eoa.png`} alt="logo-wakaf" width="50%" height="auto" />

					</center>
					
					</div>
				</div>
				{/* <Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar> */}
				<Typography component="h1" variant="h3"className={classes.avatar}>
					Selamat Datang
				</Typography>
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
			</Grid>
		</Grid>
	);
}

export default connect(null, { addLogin })(Login);