import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
	CardActionArea,
	Fab,
	Badge,
	SwipeableDrawer
} from '@material-ui/core';
import NumberFormat from 'react-number-format'
import Cart from '../../Cart'
import CartIcon from '@material-ui/icons/AddShoppingCart'

import { connect } from 'react-redux'
import { getProduct } from '../../../../actions/product'
import { getCart } from '../../../../actions/cart'

const useStyles = makeStyles(theme => ({
  root: {
		width: '100%',
		marginBottom: theme.spacing(2),
		// marginTop: theme.spacing(2)
	},
  imageContainer: {
    height: 100,
    width: 'auto',
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
		display: 'flex'
  },
  image: {
    width: '100%',
    objectFit: 'cover'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1)
	},
	fab: {
		position: 'fixed',
		bottom: theme.spacing(4),
		right: theme.spacing(2),
	},
	card: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	}
}));

const ProductCard = (props) => {
	const { 
		getProduct , 
		product : { products, loading }, 
		customer : { searchCustomer }, 
		handleQtyModalOpen,
		getCart,
		cart : { carts, counting } 
	} = props;
	const classes = useStyles()

	// Modal Cart
	const [ modalOpen, setModalOpen ] = useState(false)

	const handleModalOpen = () => {
		setModalOpen(true)
	}

	const handleModalClose = () => {
		setModalOpen(false)
	}
	// End Cart

	useEffect(() => {
		getProduct(searchCustomer.name_status)
		getCart()
	}, [getProduct, searchCustomer, getCart, counting])

  return (
		<div className={classes.root}>
			{!loading && (
				<>
				{products.map((item) => (
					<>
					<CardActionArea className={classes.card} onClick={() => handleQtyModalOpen(item)}>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								lg={3}
								md={3}
								sm={3}
								xs={3}
							>
									<div className={classes.imageContainer}>
										<img
											alt="Product"
											className={classes.image}
											src={item.product.image}
										/>
									</div>
							</Grid>
							<Grid
								item
								lg={3}
								md={3}
								sm={3}
								xs={6}
							>
								<Typography variant='h5'>
									{item.product.name} {item.product.weight} {item.product.unit}
								</Typography>
								<Typography className={classes.capDetail}>
									<NumberFormat value={item.product.latest_price.sell_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
								</Typography>
								<Typography className={classes.capDetail}>
									Stok : {item.product.stock}
								</Typography>
							</Grid>
						</Grid>
					</CardActionArea>
					<hr />
					</>
				))}
				</>
			)}
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleModalOpen}>
				{carts != null ? (
					<Badge badgeContent={carts.cart.length} color="secondary">
							<CartIcon />
					</Badge>
				):(
					<Badge color="secondary">
							<CartIcon />
					</Badge>
				)}
			</Fab>
			<SwipeableDrawer
				anchor='bottom'
				open={modalOpen}
				onClose={handleModalClose}
				onOpen={handleModalOpen}
				disableSwipeToOpen
			>
				<Cart />
			</SwipeableDrawer>
		</div>
  );
};

const mapStateToProps = state => ({
	product: state.product,
	customer: state.customer,
	cart: state.cart
})

export default connect(mapStateToProps, {getProduct, getCart})(ProductCard);
