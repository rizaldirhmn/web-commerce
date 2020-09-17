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
	CardHeader,
	IconButton,
	Divider,
	Paper
} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import AddUserIcon from '@material-ui/icons/PersonAdd'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment'

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
	searchRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 'auto',
		// marginTop: theme.spacing(2)
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

	const submitDefault = moment().format('YYYY-MM-DD HH:mm:ss');
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
                    <Typography variant="h4">Transaksi Buyback</Typography>
                </Grid>
            </Grid>
			<Grid container spacing={2}>
				<Grid 
					item
					lg={4}
					md={6}
					sm={6}
					xs={12}
				>
					<Typography>Tanggal</Typography>
					<div className={classes.row}>
						<Paper component="form" className={classes.searchRoot}>
							<IconButton type="button" className={classes.iconButton} aria-label="search">
								<CalendarIcon />
							</IconButton>
							<Divider className={classes.divider} orientation="vertical" />
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<DateTimePicker
									fullWidth
									disableFuture
									minDate={minDate}
									ampm={false}
									variant="outlined"
									name="start_date"
									format="dd MMMM yyyy HH:mm"
									value={startDate.view.view} 
									onChange={handleStartDate} 
								/>
							</MuiPickersUtilsProvider>
						</Paper>
					</div>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={3}
				justify="space-between"
            >
				<Grid item>  
				{!loadingSearchCustomerBuyback && (
					<div>
						{searchCustomerBuyback.length === 0 ? (
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
								<Button
									variant="outlined"
									color="secondary"
									startIcon={<AddUserIcon />}
									onClick={handleSearchModalOpen}
								>
									Cari Customer
								</Button>
								{searchCustomerBuyback.map((item) => (
									<div>
										<Typography>Customer : {item.name}</Typography>
										<Typography>Tipe Anggota : {item.name_status}</Typography>
									</div>
								))}
							</div>
		
						)}
					</div>
				)}
                </Grid>
            </Grid>
		</div>
		<hr className={classes.dividerHorizontal} />
		<div className={classes.contentProduct}>
			{!loadingSearchCustomerBuyback && (
				<>
				{searchCustomerBuyback.length > 0 && (
					// <PerfectScrollbar>
						<ProductCard handleQtyModalOpen={handleQtyModalOpen} date={startDate.submit.submit} />
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
				{!loadingSearchCustomerBuyback && (
					<CounterSlice handleModalClose={handleQtyModalClose} product={item} searchCustomerBuyback={searchCustomerBuyback[0]} />
				)}
			</SwipeableDrawer>
        </div>
    </>
    )
}

const mapStateToProps = state => ({
	customer: state.customer,
})

export default connect(mapStateToProps, { getSearchCustomerAndClearBuyback })(MobileView)