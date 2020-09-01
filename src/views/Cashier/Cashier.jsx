import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { 
  Grid, 
  Typography,
	Hidden,
	Badge,
	SwipeableDrawer
} from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import CartIcon from '@material-ui/icons/AddShoppingCart'

// Components
import Product from './Product'
import Cart from './Cart'
// import Category from './Category'
import MobileView from './MobileView'
import SearchCustomer from './SearchCustomer'

// Redux
import { connect } from 'react-redux'
import { getSearchCustomerAndClear } from '../../actions/customer'
import { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  bgColor: {
    backgroundColor: '#BCE0FD',
    height: '312px',
    position: 'absolute',
    // zIndex: 0
  },
  cardMobile: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
    width: '100%'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
	},
	row: {
    height: 'auto',
		// display: 'flex',
		width: '100%',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  catSearch: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(2),
		width: '100%'
  },
  catSelectSearch: {
    width: '100%',
    minWidth: 150
	},
	searchRoot: {
		padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
		width: 'auto',
		marginTop: theme.spacing(2)
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
	fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(2),
	},
}));

const Cashier = ({ getSearchCustomerAndClear, customer : { searchCustomerClear, loadingCustomerClear } }) => {
	const classes = useStyles();
	
	const [ modalOpen, setModalOpen ] = useState(false)

	const handleModalOpen = () => {
		setModalOpen(true)
	}

	const handleModalClose = () => {
		setModalOpen(false)
	}

	const [ formState ] = useState({
		params: '',
		kata_kunci: ''
	})

	useEffect(() => {
		getSearchCustomerAndClear(formState.params, formState.kata_kunci)
	}, [loadingCustomerClear, getSearchCustomerAndClear, formState])

  return (
		<>
		<Hidden only={['sm','xs']}>
      <div className={classes.root}>
        <div className={classes.bgColor}></div>
        <Grid
          container
          spacing={3}
          justify="space-between"
        >
          <Grid item>  
            <Typography variant="h4">Transaksi Penjualan</Typography>
          </Grid>
        </Grid>
				
				<SearchCustomer />
				{!loadingCustomerClear && (
					<>
					{searchCustomerClear.length > 0 && (
						<div className={classes.row}>
							{/* {searchCustomer.map((product) => ( */}
								<div>
									<Grid
										container
										spacing={2}
									>
										<Grid
											item
											lg={8}
											md={8}
											sm={12}
											xs={12}
										>
											<Product searchCustomerClear={searchCustomerClear[0]}/>
										</Grid>
										<Hidden only={['xs', 'sm']}>
											<Grid
												item
												lg={4}
												md={4}
												sm={12}
												xs={12}
											>
												<Cart />
											</Grid>
										</Hidden>
									</Grid>
									<Hidden only={['md','lg','xl']}>
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
									</Hidden>
								</div>
							{/* ))} */}
						</div>
					)}
					</>
				)}
      </div>
		</Hidden>

		<Hidden only={['md','lg','xl']}>
			<MobileView />
		</Hidden>
    </>
  );
};

Cashier.propTypes = {
	getSearchCustomerAndClear: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
customer: state.customer
})

export default connect(mapStateToProps, { getSearchCustomerAndClear })(Cashier);
