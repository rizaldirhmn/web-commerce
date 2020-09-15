import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
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
	Divider,
	TextField,
	MenuItem
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
// Redux
import { connect } from 'react-redux'
import { getSearchCustomerAndClearBuyback, getCustomerCashier } from '../../../../actions/customer'
import { useEffect } from 'react'

const useStyles = makeStyles(theme => ({
	root: {
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

const columns = [
	{ id: 'no_id', label: 'No ID', minWidth: 100 },
	{ id: 'nama', label: 'Nama', minWidth: 150 },
	{ id: 'kategori', label: 'Kategori', minWidth: 100 },	
  ];

const SearchCustomer = (props) => {
	const { getSearchCustomerAndClearBuyback, getCustomerCashier, customer : { searchCustomerBuyback, loadingSearchCustomerBuyback, customers_v2, loadingCustomerV2 }, handleSearchModalClose } = props
	const classes = useStyles();

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [ keyword, setKeyword ] = useState({
		values: {
			keyword: '',
			type: 'id_agent'
		}
	})
	
	const handleChangeSearch = event => {
		event.persist();

		setKeyword(keyword => ({
			...keyword,
			values: {
			  ...keyword.values,
			  [event.target.name]: event.target.value
			}
		  }))
		setPage(0)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			getCustomerCashier(keyword.values.type, keyword.values.keyword)
		}, 2000)

		return () => clearTimeout(timer)
	}, [loadingSearchCustomerBuyback, getCustomerCashier, keyword])

	const handleSelectChange = event => {
		getSearchCustomerAndClearBuyback('id', event.id)
		handleSearchModalClose()
		// if(event != null){
		// }else{
		// 	getSearchCustomerAndClearBuyback('id_agent', '')
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
						lg={3}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>Cari Berdasarkan</Typography>
						<div className={classes.row}>
							<TextField 
								select
								className={classes.input}
								variant="outlined"
								name="type"
								value={keyword.values.type || ''}
								onChange={handleChangeSearch}
							>
								<MenuItem key="id_agent" value="id_agent">ID Agent</MenuItem>
								<MenuItem key="name" value="name">Nama</MenuItem>
							</TextField>
						</div>
					</Grid>
					<Grid
						item
						lg={3}
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
									name="keyword"
									value={keyword.values.keyword || ''}
									onChange={handleChangeSearch}
									placeholder="Cari Customer"
									inputProps={{ 'aria-label': 'Cari Customer' }}
								/>
							</Paper>
						</div>
					</Grid>
					<Grid
						item
						lg={9}
						md={6}
						sm={6}
						xs={12}
					>
						<Typography>Hasil Pencarian</Typography>
						{!loadingCustomerV2 && (
							<div className={classes.row}>
								{customers_v2 !== null && (
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
												{customers_v2.data.map((customer) => (
													<TableRow key={customer.id} hover onClick={e => handleSelectChange(customer)}>
														<TableCell>
															{customer.id_agent}
														</TableCell>
														<TableCell>
															{customer.name}
														</TableCell>
														<TableCell>
															{customer.status === '1' ? (
																<Typography>AOG</Typography>
															): (
																<Typography>MOG</Typography>
															)}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
											</Table>
										</TableContainer>
										<TablePagination
											rowsPerPageOptions={[10, 25, 100]}
											component="div"
											count={customers_v2.data.length}
											rowsPerPage={rowsPerPage}
											page={page}
											onChangePage={handleChangePage}
											onChangeRowsPerPage={handleChangeRowsPerPage}
										/>
									</Paper>
								)}
							</div>
						)}
					</Grid>
				</Grid>
			</div>
			{searchCustomerBuyback !== null && (
				<>
				{searchCustomerBuyback.map((item) => (
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
		</div>
  	);
};

SearchCustomer.propTypes = {
    getSearchCustomerAndClearBuyback: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customer: state.customer
})

export default connect(mapStateToProps, { getSearchCustomerAndClearBuyback, getCustomerCashier })(SearchCustomer);
