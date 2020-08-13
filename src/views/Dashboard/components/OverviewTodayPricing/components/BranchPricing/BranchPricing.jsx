import React, { useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

// redux
import { connect } from 'react-redux'
import { getProduct } from '../../../../../../actions/dashboard'

const useStyles = makeStyles(theme => ({
	gridRoot: {
    padding: theme.spacing(4),
  },
  root: {
		height: '100%',
		backgroundColor: '#011747',
		borderRadius: theme.spacing(2)
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
		fontWeight: 700,
		color: '#FF9300'
	},
	numbers: {
		color: '#FF9300'
	},
	caption: {
		fontWeight: 700,
		fontSize: 18,
		color: '#FF9300',
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
  },
}));

const BranchPricing = ({ getProduct, dashboard: {products, loading}}) => {

  const classes = useStyles();

	useEffect(() => {
		getProduct('branch')
	}, [getProduct])

	return loading || products === null ? 
		<Backdrop className={classes.backdrop} open>
			<CircularProgress color="inherit" />
		</Backdrop> 
		:
		<Fragment>
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
					{products.harga_jual.map((item) => (
						<Grid
							item
							lg={4}
							md={4}
							sm={6}
							xs={12}
						>
							<Card
								// {...rest}
								className={classes.root}
							>
								<CardContent>
									<Grid
										container
										justify="space-between"
									>
										<Grid item>
											<Typography className={classes.numbers} variant="h3">
												<NumberFormat value={item.sell_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
											</Typography>
										</Grid>
									</Grid>
									<div className={classes.difference}>
										<Typography
											className={classes.caption}
											variant="caption"
										>
											{item.weight} {item.unit}
										</Typography>
									</div>
								</CardContent>
							</Card>
						</Grid>
					))}
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
					{products.harga_beli.map((item) => (
						<Grid
							item
							lg={4}
							md={4}
							sm={6}
							xs={12}
						>
							<Card
								// {...rest}
								className={classes.root}
							>
								<CardContent>
									<Grid
										container
										justify="space-between"
									>
										<Grid item>
											<Typography className={classes.numbers} variant="h3">
												<NumberFormat value={item.buy_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
											</Typography>
										</Grid>
									</Grid>
									<div className={classes.difference}>
										<Typography
											className={classes.caption}
											variant="caption"
										>
											{item.weight} {item.unit}
										</Typography>
									</div>
								</CardContent>
							</Card>
						</Grid>
					))}
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
					{products.harga_buyback.map((item) => (
						<Grid
							item
							lg={4}
							md={4}
							sm={6}
							xs={12}
						>
							<Card
								// {...rest}
								className={classes.root}
							>
								<CardContent>
									<Grid
										container
										justify="space-between"
									>
										<Grid item>
											<Typography className={classes.numbers} variant="h3">
												<NumberFormat value={item.buyback_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
											</Typography>
										</Grid>
									</Grid>
									<div className={classes.difference}>
										<Typography
											className={classes.caption}
											variant="caption"
										>
											{item.weight} {item.unit}
										</Typography>
									</div>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
		</Fragment>
};

BranchPricing.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
	dashboard: state.dashboard
})

export default connect(mapStateToProps, {getProduct})(BranchPricing)
