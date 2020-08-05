import React, { Fragment } from "react";
import { Grid, TextField } from "@material-ui/core";
// import Logo from '../img/login-logo.png';
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardHeader,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import { useHistory } from 'react-router-dom';

import { addLogin } from '../../actions/login'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
	card: {
			minWidth: 275
	},
	extendedIcon: {
			marginRight: theme.spacing(2)
	},
	action: {
			flexDirection: "row-reverse"
	}
}));

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
		<Grid
			container
			spacing={0}
			alignItems="center"
			justify="center"
			style={{ minHeight: "90vh" }}
		>
			<Grid item xs={10} sm={4}>
					<Fragment>
						<Card className={classes.card}>
							<CardHeader
								// ={< src={Logo} className={classes.} />}
								title="Access"
							/>
							<form onSubmit={handleSubmit(onSubmit)}>
								<CardContent>
									<TextField
										fullWidth
										label="Email"
										style={{
											marginBottom: "20px"
										}}
										name="email" 
										inputRef={register}
										placeholder="Masukan Email Anda"
										helperText={
											errors.email && errors.email.message
										}
										error={errors.email && true}
										inputProps={{
											"aria-label": "Description"
										}}
									/>
									<TextField 
										fullWidth
										label="Password"
										style={{
											marginBottom: "20px"
										}}
										name="password" 
										inputRef={register}
										placeholder="Masukan Password Anda"
										helperText={
											errors.password && errors.password.message
										}
										error={errors.password && true}
										type="password" 
										inputProps={{
											"aria-label": "Description"
										}}
									/>
								</CardContent>
								<CardActions className={classes.action}>
									<Button
										id="btn_login"
										type="submit"
										color="primary"
										className={classes.button}
										variant="contained"
									>
										<Send className={classes.extendedIcon}/>
											Login
									</Button>
								</CardActions>
							</form>
						</Card>
					</Fragment>
			</Grid>
		</Grid>
	);
}

export default connect(null, { addLogin })(Login);