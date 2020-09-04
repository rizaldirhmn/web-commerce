import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { 
  Grid, 
  Typography,
	Paper,
	InputBase,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TablePagination,
	IconButton,
	Divider
} from '@material-ui/core'
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Skeleton from '@material-ui/lab/Skeleton'
import SearchIcon from '@material-ui/icons/Search'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// Redux
import { connect } from 'react-redux'
import { getSearchCustomerAndClear, getCustomerCashier } from '../../../actions/customer'
import { useEffect } from 'react'

import {useForm} from "react-hook-form";

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
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
		alignItems: 'center',
		marginTop: theme.spacing(1),
		width: '100%'
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
	fab: {
		position: 'fixed',
		bottom: theme.spacing(4),
		right: theme.spacing(2),
	}
}));

const useStyles1 = makeStyles((theme) => ({
	root: {
	  flexShrink: 0,
	  marginLeft: theme.spacing(2.5),
	},
}));

const columns = [
	{ id: 'no_id', label: 'No ID', minWidth: 100 },
	{ id: 'nama', label: 'Nama', minWidth: 150 },
	{ id: 'kategori', label: 'Kategori', minWidth: 100 },	
  ];

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;
  
	const handleFirstPageButtonClick = (event) => {
	  onChangePage(event, 0);
	};
  
	const handleBackButtonClick = (event) => {
	  onChangePage(event, page - 1);
	};
  
	const handleNextButtonClick = (event) => {
	  onChangePage(event, page + 1);
	};
  
	const handleLastPageButtonClick = (event) => {
	  onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};
  
	return (
	  <div className={classes.root}>
		<IconButton
		  onClick={handleFirstPageButtonClick}
		  disabled={page === 0}
		  aria-label="first page"
		>
		  {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
		</IconButton>
		<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
		  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
		</IconButton>
		<IconButton
		  onClick={handleNextButtonClick}
		  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		  aria-label="next page"
		>
		  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
		</IconButton>
		<IconButton
		  onClick={handleLastPageButtonClick}
		  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
		  aria-label="last page"
		>
		  {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
		</IconButton>
	  </div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const SearchCustomer = (props) => {
	const { 
		getSearchCustomerAndClear, 
		getCustomerCashier, 
		customer : { searchCustomerClear, loadingCustomerClear, customers_v2, loadingCustomerV2 },
		startDate,
		handleStartDate
	 } = props
	const classes = useStyles();
	const { register, handleSubmit } = useForm();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [ keyword, setKeyword ] = useState('')
	
	const handleChangeSearch = event => {
		setKeyword(event.target.value)
		setPage(0)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0)
	};

	// Dialog
	const [open, setOpen] = useState(false);
  	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	// End Dialog

	const [ valueSearch, setValueSearch ] = useState('')
	const onSubmit = data => {
		// e.preventDefault()
        setValueSearch(data.nama)
    }

	useEffect(() => {
		// const timer = setTimeout(() => {
			getCustomerCashier(valueSearch)
		// }, 2000)

		// return () => clearTimeout(timer)
	}, [loadingCustomerClear, getCustomerCashier, valueSearch])

	const handleSelectChange = event => {
		// console.log(event)
		getSearchCustomerAndClear('id', event.id)
		setOpen(false)
		// if(event != null){
		// }else{
		// 	getSearchCustomerAndClear('id_agent', '')
		// }
	};

  	return (
		<div className={classes.root}>
			<div className={classes.bgColor}></div>
			<div className={classes.row}>
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>Cari Customer</Typography>
						<div className={classes.row}>
							<Paper component="form" className={classes.searchRoot}>
								<IconButton type="button" className={classes.iconButton} aria-label="search">
									<SearchIcon />
								</IconButton>
								<Divider className={classes.divider} orientation="vertical" />
								<InputBase
									className={classes.input}
									name="pesan"
									value={keyword || ''}
									onClick={handleClickOpen}
									placeholder="Cari Customer"
									inputProps={{ 'aria-label': 'Cari Customer' }}
								/>
							</Paper>
						</div>
					</Grid>
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
			</div>
			{searchCustomerClear !== null && (
				<>
				{searchCustomerClear.map((item) => (
					<div className={classes.row}>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								lg={3}
								md={6}
								sm={6}
								xs={12}
							>
								<Typography>Nama Customer</Typography>
								<Paper 
									className={classes.catSearch}
								>
									<InputBase
										disabled
										value={item.name}
										name="nama_customer"
										className={classes.catSelectSearch}
										placeholder="Nama Customer"
										InputProps={{
											readOnly: true,
										}}
									/>
								</Paper>
							</Grid>
							<Grid
								item
								lg={3}
								md={6}
								sm={6}
								xs={12}
							>
								<Typography>Tipe Customer</Typography>
								<Paper 
									className={classes.catSearch}
								>
									<InputBase
										disabled
										value={item.name_status}
										className={classes.catSelectSearch}
										placeholder="Tipe Customer"
										InputProps={{
											readOnly: true,
										}}
									/>
								</Paper>
							</Grid>
							<Grid
								item
								lg={3}
								md={6}
								sm={6}
								xs={12}
							>
								<Typography>No ID</Typography>
								<Paper 
									className={classes.catSearch}
								>
									<InputBase
										disabled
										value={item.id_agent}
										className={classes.catSelectSearch}
										placeholder="No ID"
										InputProps={{
											readOnly: true,
										}}
									/>
								</Paper>
							</Grid>
						</Grid>
					</div>
				))}
				</>
			)}
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Pencarian Customer"}</DialogTitle>
				<DialogContent>
				<DialogContentText>
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							lg={12}
							md={12}
							sm={12}
							xs={12}
						>
							<Typography>Cari Customer</Typography>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className={classes.row}>
									<Paper component="form" className={classes.searchRoot}>
										<IconButton type="submit" className={classes.iconButton} aria-label="search">
											<SearchIcon />
										</IconButton>
										<Divider className={classes.divider} orientation="vertical" />
										<InputBase
											autoFocus
											className={classes.input}
											name="nama"
											value={keyword || ''}
											onChange={handleChangeSearch}
											placeholder="Cari Customer"
											inputRef={register}
											inputProps={{ 'aria-label': 'Cari Customer' }}
										/>
									</Paper>
								</div>
							</form>
						</Grid>
						<Grid
							item
							lg={12}
							md={12}
							sm={12}
							xs={12}
						>
							<Typography>Hasil Pencarian</Typography>
							<div className={classes.row}>
								{/* {customers_v2 !== null && ( */}
									<Paper className={classes.root}>
										<TableContainer className={classes.container}>
											<Table stickyHeader aria-label="sticky table" style={{ minWidth: "340px" }}>
											<TableHead>
												<TableRow>
												{columns.map((column) => (
													<TableCell
													key={column.id}
													align={column.align}
													style={{ minWidth: column.minWidth }}
													>
													{column.label}
													</TableCell>
												))}
												</TableRow>
											</TableHead>
											<TableBody>
												{!loadingCustomerV2 ? (
													<>
														{customers_v2.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => (
															<TableRow key={customer.id} hover onClick={e => handleSelectChange(customer)}>
																<TableCell>
																	{customer.id_agent}
																</TableCell>
																<TableCell>
																	{customer.name}
																</TableCell>
																<TableCell>
																	{customer.name_status}
																</TableCell>
															</TableRow>
														))}
													</>
												):(
													<TableRow>
														<TableCell colSpan={3}>
															<Skeleton variant="rect" height={50}></Skeleton>
														</TableCell>
													</TableRow>
												)}
											</TableBody>
											</Table>
										</TableContainer>
										<TablePagination
											rowsPerPageOptions={[5]}
											component="div"
											count={!loadingCustomerV2 && customers_v2.data.length}
											rowsPerPage={rowsPerPage}
											page={page}
											onChangePage={handleChangePage}
											onChangeRowsPerPage={handleChangeRowsPerPage}
											ActionsComponent={TablePaginationActions}
										/>
									</Paper>
								{/* )} */}
							</div>
						</Grid>
					</Grid>
				</DialogContentText>
				</DialogContent>
				<DialogActions>
				{/* <Button autoFocus onClick={handleClose} color="primary">
					Disagree
				</Button>
				<Button onClick={handleClose} color="primary" autoFocus>
					Agree
				</Button> */}
				</DialogActions>
			</Dialog>
		</div>
  	);
};

SearchCustomer.propTypes = {
    getSearchCustomerAndClear: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customer: state.customer
})

export default connect(mapStateToProps, { getSearchCustomerAndClear, getCustomerCashier })(SearchCustomer);
