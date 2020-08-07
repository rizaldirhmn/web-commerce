import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles(theme => ({
	gridRoot: {
    padding: theme.spacing(4),
  },
  root: {
		height: '100%',
		backgroundColor: '#0195FF',
		borderRadius: theme.spacing(2)
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
		fontWeight: 700,
		color: '#fff'
	},
	numbers: {
		color: '#fff'
	},
	caption: {
		fontWeight: 700,
		fontSize: 18,
		color: '#fff',
		fontFamily: 'Arial',
	},
  avatar: {
    backgroundColor: '#fff',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const AOGPricing = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
		<>
		<div className={classes.gridRoot}>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					lg={12}
				>
					<Typography variant="h4">Harga Jual</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="500000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.1 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.2 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.5 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									1 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									2 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									5 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>

		<div className={classes.gridRoot}>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					lg={12}
				>
					<Typography variant="h4">Harga Beli</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.1 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.2 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.5 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									1 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									2 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									5 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>

		<div className={classes.gridRoot}>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					lg={12}
				>
					<Typography variant="h4">Harga Buyback</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.1 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.2 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									0.5 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									1 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									2 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					item
					lg={4}
					md={4}
					sm={6}
					xs={12}
				>
					<Card
						{...rest}
						className={clsx(classes.root, className)}
					>
						<CardContent>
							<Grid
								container
								justify="space-between"
							>
								<Grid item>
									<Typography className={classes.numbers} variant="h3">
										<NumberFormat value="1000000" displayType={'text'} thousandSeparator={true} prefix={`RP `} />
									</Typography>
								</Grid>
							</Grid>
							<div className={classes.difference}>
								<Typography
									className={classes.caption}
									variant="caption"
								>
									5 gram
								</Typography>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
		</>
  );
};

AOGPricing.propTypes = {
  className: PropTypes.string
};

export default AOGPricing;
