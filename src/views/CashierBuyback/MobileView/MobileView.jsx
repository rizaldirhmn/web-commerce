import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Typography,
    // Fab,
    // Badge,
    SwipeableDrawer,
	Button,
	// CardActionArea,
	CardContent,
	Card,
	// CardActions,
	CardHeader
} from '@material-ui/core'
// import CartIcon from '@material-ui/icons/AddShoppingCart'
import AddUserIcon from '@material-ui/icons/PersonAdd'
// import PerfectScrollbar from '@opuscapita/react-perfect-scrollbar'

import ProductCard from './ProductCard'
// import Cart from '../Cart'
import SearchCustomer from './SearchCustomer'
import CounterSlice from '../Product/CounterSlice'
// Redux
import { connect } from 'react-redux'
import { getSearchCustomerAndClearBuyback } from '../../../actions/customer'
import { useEffect } from 'react'

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
	contentSearchCustomer: {
		height: '600px',
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

const MobileView = ({ getSearchCustomerAndClearBuyback, customer : { searchCustomerBuyback, loadingSearchCustomerBuyback } }) => {
	const classes = useStyles()
	
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

	const [ formState ] = useState({
		params: '',
		kata_kunci: ''
	})

	useEffect(() => {
		getSearchCustomerAndClearBuyback(formState.params, formState.kata_kunci)
	}, [loadingSearchCustomerBuyback, getSearchCustomerAndClearBuyback, formState])

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
				{!searchCustomerBuyback ? (
					<Button
						variant="outlined"
						color="secondary"
						startIcon={<AddUserIcon />}
						onClick={handleSearchModalOpen}
					>
						Cari Customer
					</Button>
				):(
					<div>
						<Typography>Customer : {searchCustomerBuyback.name}</Typography>
						<Typography>Tipe Anggota : {searchCustomerBuyback.name_status}</Typography>
					</div>

				)}
                </Grid>
            </Grid>
		</div>
		<hr className={classes.dividerHorizontal} />
		<div className={classes.contentProduct}>
			{!loadingSearchCustomerBuyback && (
				<>
				{searchCustomerBuyback && (
					// <PerfectScrollbar>
						<ProductCard handleQtyModalOpen={handleQtyModalOpen} />
					// </PerfectScrollbar>
				)}
				</>
			)}
        </div>
        <div className={classes.fixedComponents}>
			
			<SwipeableDrawer
				anchor='bottom'
				open={searchModalOpen}
				onClose={handleSearchModalClose}
				onOpen={handleSearchModalOpen}
				disableSwipeToOpen
			>
				<Card className={classes.contentSearchCustomer}>
					<CardHeader title="Cari Customer" />
					<CardContent>
						<SearchCustomer handleSearchModalClose={handleSearchModalClose} />
					</CardContent>
					{/* <CardActions>
						<Button fullWidth variant="contained" onClick={handleSearchModalClose} color="primary" size="small">
							Terapkan
						</Button>
					</CardActions> */}
				</Card>
			</SwipeableDrawer>
			<SwipeableDrawer
				anchor='bottom'
				open={qtyModalOpen}
				onClose={handleQtyModalClose}
				onOpen={handleQtyModalOpen}
				disableSwipeToOpen
			>
				<CounterSlice handleModalClose={handleQtyModalClose} product={item} searchCustomerBuyback={searchCustomerBuyback} />
			</SwipeableDrawer>
        </div>
    </>
    )
}

const mapStateToProps = state => ({
	customer: state.customer,
})

export default connect(mapStateToProps, { getSearchCustomerAndClearBuyback })(MobileView)