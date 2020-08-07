import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
	CardActionArea,
	CardMedia,
	CardHeader,
	SwipeableDrawer,
} from '@material-ui/core'
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'
import NumberFormat from 'react-number-format'

// Components
import CounterSlice from './CounterSlice'

const useStyles = makeStyles(theme => ({
	root:{
		padding: theme.spacing(2)
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
	}
}));

const Product = () => {
	const classes = useStyles()
	const produk = [
		{
			nama : '0.1 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/0,1.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			nama : '0.2 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/0,2.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			nama : '0.5 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/0,5.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			nama : '1 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/1.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			nama : '2 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/2.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			nama : '5 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/5.jpg'}`,
			harga: 1000000,
			stok : 10
		}
	]

	const [ modalOpen, setModalOpen ] = useState(false)
	const [ item, setItem ] = useState()

	const handleModalOpen = (event) => {
		setModalOpen(true)
		setItem(event)
	}

	const handleModalClose = () => {
		setModalOpen(false)
	}

	return(
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
						{produk.map(item => (
							<Grid
								item
								lg={4}
								md={4}
								sm={6}
								xs={12}
							>
								<Card className={classes.cardContentRoot}>
									<CardActionArea onClick={() => handleModalOpen(item)}>
										<CardMedia
											square
											className={classes.media}
											image={item.image}
											title={item.nama}
										/>
										<CardContent>
											<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
												{item.nama}
											</Typography>
											<Typography variant="body2" color="textSecondary" component="p" className={classes.price}>
												<NumberFormat value={item.harga} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
											</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions>
										<Typography variant="body2" color="textSecondary" component="p" className={classes.stock}>
											Stok : <NumberFormat value={item.stok} displayType={'text'} thousandSeparator={true} />
										</Typography>
									</CardActions>
								</Card>
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
					<CounterSlice handleModalClose={handleModalClose} product={item} />
				</SwipeableDrawer>
			</CardContent>
		</Card>
	)
}

export default Product;