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
import moment from 'moment';

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
	date_trx: {
		width: '200px'
	}
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

	const [ valueSearch, setValueSearch ] = useState({
		type: 'id_agent',
		name: ''
	})

	const submitDefault = moment().format('YYYY-MM-DD HH:mm:ss')
	const minDate = moment().subtract(2, 'd').format('YYYY-MM-DD HH:mm:ss')
	const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: new Date()
        }
        
	});
    const handleStartDate = (date) => {
        const changeDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        setStartDate(startDate => ({
            ...startDate,
                submit: {
                    submit: changeDate
            },
                view: {
                    view: date
            }
        }));
	};
	
	useEffect(() => {
		getSearchCustomerAndClear('name', '')
	}, [loadingCustomerClear, getSearchCustomerAndClear, startDate])

  return (
		<>
		<Hidden only={['sm','xs']}>
      <div className={classes.root}>
        <div className={classes.bgColor}></div>
        <Grid
          container
          spacing={2}
          justify="space-between"
        >
          	<Grid item>  
            	<Typography variant="h4">Transaksi Penjualan</Typography>
			</Grid>
        </Grid>

		<SearchCustomer 
			startDate={startDate} 
			handleStartDate={handleStartDate} 
			valueSearch={valueSearch} 
			setValueSearch={setValueSearch} 
			minDate={minDate}
		/>
			
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
									<Product searchCustomerClear={searchCustomerClear[0]} date={startDate.submit.submit} />
								</Grid>
								<Hidden only={['xs', 'sm']}>
									<Grid
										item
										lg={4}
										md={4}
										sm={12}
										xs={12}
									>
										<Cart date={startDate.submit.submit} searchCustomerClear={searchCustomerClear[0]} />
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
									<Cart date={startDate.submit.submit} searchCustomerClear={searchCustomerClear[0]} />
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
