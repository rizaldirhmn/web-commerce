import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Typography,
    Fab,
    Badge,
    SwipeableDrawer,
	Button,
	CardActionArea
} from '@material-ui/core'
import CartIcon from '@material-ui/icons/AddShoppingCart'
import AddUserIcon from '@material-ui/icons/PersonAdd'
import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'

import ProductCard from './ProductCard'
import Cart from '../Cart'
import SearchCustomer from '../SearchCustomer'
import CounterSlice from '../Product/CounterSlice'

const useStyles = makeStyles(theme => ({
    content: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(2),
	},
	contentProduct: {
		width: 'auto',
		height: '630px',
		margin: theme.spacing(2)
	},
    fixedComponents:{
		// paddingTop: 100
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(2),
	},
	input: {
        marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
	},
	dividerHorizontal: {
		marginTop: 10,
	}

}))

const MobileView = () => {
	const classes = useStyles()
	// Modal Cart
    const [ modalOpen, setModalOpen ] = useState(false)

	const handleModalOpen = (event) => {
		// setModalOpen(true)
		console.log(event)
	}

	const handleModalClose = () => {
		setModalOpen(false)
	}
	// End Cart
	// Modal Search
	const [ searchModalOpen, setSearchModalOpen ] = useState(false)

	const handleSearchModalOpen = () => {
		setSearchModalOpen(true)
	}

	const handleSearchModalClose = () => {
		setSearchModalOpen(false)
	}
	// End Search
	// QTY Modal
	const [ qtyModalOpen, setQtyModalOpen ] = useState(false)
	const [ item, setItem ] = useState()

	const handleQtyModalOpen = (event) => {
		setQtyModalOpen(true)
		setItem(event)
	}

	const handleQtyModalClose = () => {
		setQtyModalOpen(false)
	}
	// End QTY

    const produk = [
		{
			id : 1,
			nama : '0.1 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/0,1.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			id : 2,
			nama : '0.2 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/0,2.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			id : 3,
			nama : '0.5 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/0,5.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			id : 4,
			nama : '1 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/1.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			id : 5,
			nama : '2 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/2.jpg'}`,
			harga: 1000000,
			stok : 10
		},
		{
			id : 6,
			nama : '5 gram',
			image: `${process.env.PUBLIC_URL + '/images/produk/5.jpg'}`,
			harga: 1000000,
			stok : 10
		}
	]

    return(
    <>
        <div className={classes.content}>
            <Grid
				container
				spacing={3}
				justify="space-between"
            >
                <Grid item>  
                    <Typography variant="h4">Kasir</Typography>
                </Grid>
            </Grid>
			<Grid
				container
				spacing={3}
				justify="space-between"
            >
				<Grid item>  
					<Button
						variant="outlined"
						color="secondary"
						startIcon={<AddUserIcon />}
						onClick={handleSearchModalOpen}
					>
						Cari Pembeli
					</Button>
                </Grid>
            </Grid>
		</div>
		<hr className={classes.dividerHorizontal} />
		<div className={classes.contentProduct}>
			<PerfectScrollbar>
				<Grid container>
					{produk.map(item => (
						<Grid
							item
							xs={12}
						>
							<CardActionArea onClick={() => handleQtyModalOpen(item)}>
								<ProductCard product={item} />
							</CardActionArea>
							<hr />
						</Grid>
					))}
				</Grid>
			</PerfectScrollbar>
        </div>
        <div className={classes.fixedComponents}>
			<Fab color="primary" aria-label="add" className={classes.fab} onClick={handleModalOpen}>
				<Badge badgeContent={17} color="secondary">
						<CartIcon />
				</Badge>
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
			<SwipeableDrawer
				anchor='bottom'
				open={searchModalOpen}
				onClose={handleSearchModalClose}
				onOpen={handleSearchModalOpen}
				disableSwipeToOpen
			>
				<SearchCustomer />
			</SwipeableDrawer>
			<SwipeableDrawer
				anchor='bottom'
				open={qtyModalOpen}
				onClose={handleQtyModalClose}
				onOpen={handleQtyModalOpen}
				disableSwipeToOpen
			>
				<CounterSlice handleModalClose={handleQtyModalClose} product={item} />
			</SwipeableDrawer>
        </div>
    </>
    )
}

export default MobileView