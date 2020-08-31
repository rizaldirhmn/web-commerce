import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import Skeleton from '@material-ui/lab/Skeleton'

// redux
import { connect } from 'react-redux'
import { getProduct } from '../../../../../../actions/dashboard'
 
const useStyles = makeStyles(theme => ({
	gridRoot: {
    padding: theme.spacing(4),
  },
  root: {
		height: '100%',
		backgroundColor: '#FFFFFF',
		borderRadius: theme.spacing(2)
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
		fontWeight: 700,
		color: '#000000'
	},
	numbers: {
		color: '#FF9300'
	},
	caption: {
		fontWeight: 300,
		fontSize: 18,
		color: '#000000',
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

const AOGPricing = ({ getProduct, dashboard : { products, loading } }) => {
//   const { className, ...rest } = props;

  const classes = useStyles();

  useEffect(() => {
	  getProduct('customer')
  }, [getProduct])

  return (
  		<Fragment>
			<div className={classes.gridRoot}>
				{loading || products === null ? (
					<Skeleton variant="rect" height={400}></Skeleton>
				):(
					<>
					<Grid
						container
						spacing={3}
					>
						<Grid
							item
							lg={12}
						>
							<Typography variant="h4">Harga</Typography>
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
												<Typography
													className={classes.caption}
													variant="caption"
												>
													{item.weight} {item.unit}
												</Typography>	
											</Grid>
										</Grid>
										<div className={classes.difference}>
											<Typography className={classes.numbers} variant="h3">
												<NumberFormat value={item.sell_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
											</Typography>
										</div>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
					</>
				)}
			</div>
		</Fragment>
  	)
  
};

AOGPricing.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
	dashboard: state.dashboard
})

export default connect(mapStateToProps, { getProduct })(AOGPricing)
