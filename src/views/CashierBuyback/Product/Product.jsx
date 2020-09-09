import React, { useState,useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
	Typography,
	Grid,
	Card,
	CardContent,
	CardActionArea,
	CardMedia,
	CardHeader,
	SwipeableDrawer,
} from '@material-ui/core'
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'
import NumberFormat from 'react-number-format'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

// Components
import CounterSlice from './CounterSlice'

// Redux
import { connect } from 'react-redux'
import { getProduct } from '../../../actions/product'

const useStyles = makeStyles(theme => ({
	root:{
		padding: theme.spacing(1)
	},	
	cardContent: {
		width: '100%',
		height: '500px'
	},
	cardContentRoot: {
		width: '90%',
		marginBottom: theme.spacing(2),
		marginTop: theme.spacing(1),
	},
	media: {
		height: 140,
	},
	title: {
		fontSize: 16,
		[theme.breakpoints.down('sm')]: {
			fontSize: 16
		},
	},
	price: {
		fontSize: 16,
		[theme.breakpoints.down('sm')]: {
			fontSize: 16
		},
	},
	stock: {
		fontSize: 16,
		[theme.breakpoints.down('sm')]: {
			fontSize: 15
		},
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	cardDisabled: {
		opacity: theme.spacing(2)
	}
}));

const Product = (props) => {
	const classes = useStyles()
	const { getProduct, product: { products, loading }, customer : { searchCustomerBuyback }, date } = props
	const [ modalOpen, setModalOpen ] = useState(false)
	const [ item, setItem ] = useState()

	const handleModalOpen = (event) => {
		setModalOpen(true)
		setItem(event)
	}

	const handleModalClose = () => {
		setModalOpen(false)
	}

	useEffect(() => {
		getProduct(searchCustomerBuyback[0].status, date)
	}, [getProduct, searchCustomerBuyback, date])

	return loading || products === null ? 
	<Backdrop className={classes.backdrop} open>
		<CircularProgress color="inherit" />
	</Backdrop> 
	:
	<Fragment>
		<Card
			className={classes.root}
		>
			<CardHeader
				title="EOA Gold"
			/>
			<CardContent className={classes.cardContent}>
				<PerfectScrollbar>
					<Grid
						container
					>
						{products.map(item => (
							<Grid
								item
								lg={4}
								md={4}
								sm={6}
								xs={12}
							>
								{item.product.latest_price_buyback.buyback_price > 0 ? (
									<Card className={classes.cardContentRoot}>
										<CardActionArea onClick={() => handleModalOpen(item)}>
											<CardMedia
												square
												className={classes.media}
												image={item.product.image}
												title={item.product.name}
											/>
											<CardContent>
												<Typography gutterBottom variant="body2" className={classes.title}>
													{item.product.name} {item.product.weight} {item.product.unit}
												</Typography>
												<Typography variant="body2" color="textSecondary" className={classes.price}>
													{item.product.latest_price_buyback && (
														<NumberFormat value={item.product.latest_price_buyback.buyback_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
													)}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								):(
									<Card className={classes.cardContentRoot}>
										<CardActionArea onClick={() => handleModalOpen(item)} disabled>
											<CardMedia
												square
												className={classes.media}
												image={item.product.image}
												title={item.product.name}
											/>
											<CardContent>
												<Typography gutterBottom variant="body2" className={classes.title}>
													{item.product.name} {item.product.weight} {item.product.unit}
												</Typography>
												<Typography variant="body2" color="textSecondary" className={classes.price}>
													{item.product.latest_price_buyback && (
														<NumberFormat value={item.product.latest_price_buyback.buyback_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
													)}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								)}
							</Grid>
						))}
					</Grid>
				</PerfectScrollbar>
				<SwipeableDrawer
					anchor='bottom'
					open={modalOpen}
					onClose={handleModalClose}
					onOpen={handleModalOpen}
					disableSwipeToOpen
				>
					<CounterSlice handleModalClose={handleModalClose} product={item} searchCustomerBuyback={searchCustomerBuyback} />
				</SwipeableDrawer>
			</CardContent>
		</Card>
	</Fragment>
	
}

const mapStateToProps = state => ({
	product: state.product,
	customer: state.customer
})

export default connect(mapStateToProps, {getProduct})(Product);