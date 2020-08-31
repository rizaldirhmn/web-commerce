import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Select from 'react-select'
import { 
  Grid, 
  Typography,
	Paper,
	InputBase,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
// Redux
import { connect } from 'react-redux'
import { getSearchCustomerAndClear, getCustomer } from '../../../actions/customer'
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
		display: 'flex',
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
		// display: 'flex',
		alignItems: 'center',
		minWidth: 150,
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

const SearchCustomer = (props) => {
	const { getSearchCustomerAndClear, getCustomer, customer : { searchCustomer, loading, customers } } = props
	const classes = useStyles();

	useEffect(() => {
		getCustomer()
	}, [loading, getCustomer])

	let optionsCustomer = []
	if(customers != null){
		for (let i = 0; i < customers.data.length; i++) {
			optionsCustomer.push({'value' : customers.data[i].id_agent, 'label' : customers.data[i].name});
		}
	}

	const optionsLoading = [{ 'value' : 'loading', 'label' : 'Loading'}];

	const handleSelectChange = event => {
		if(event != null){
			getSearchCustomerAndClear('id_agent', event.value)
		}else{
			getSearchCustomerAndClear('id_agent', '')
		}
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
						<Typography>Cari Customer</Typography>
						{loading || customers === null ? (
							// <Select options={optionsLoading} />
							<Skeleton className={classes.searchRoot} variant="rect"></Skeleton>
						):(
							<Select 
								
								isClearable 
								options={optionsCustomer} 
								onChange={handleSelectChange} 
								placeholder="Cari Customer"
							/>
						)}
					</Grid>
				</Grid>
			</div>
			{!loading && (
				<>
				{searchCustomer && (
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
										value={searchCustomer.name}
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
										value={searchCustomer.name_status}
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
										value={searchCustomer.id_agent}
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
				)}
				</>
			)}
		</div>
  	);
};

SearchCustomer.propTypes = {
    getSearchCustomerAndClear: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customer: state.customer
})

export default connect(mapStateToProps, { getSearchCustomerAndClear, getCustomer })(SearchCustomer);
