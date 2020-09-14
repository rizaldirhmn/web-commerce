import React, { forwardRef, Fragment } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit'
// import DeleteIcon from '@material-ui/icons/Delete'
// import DetailIcon from '@material-ui/icons/Search'
import { Link as RouterLink } from 'react-router-dom'

import { connect } from 'react-redux';
import { getCustomer } from '../../../actions/customer'
import { 
	Tooltip,
	IconButton,
	Chip,
	Typography
} from '@material-ui/core';

const columns = [
  { id: 'no', label: 'No', minWidth: 30 },
  { id: 'no_id', label: 'No ID', minWidth: 100 },
  { id: 'nama', label: 'Nama', minWidth: 150 },
  { id: 'alamat', label: 'Alamat', minWidth: 200 },
  { id: 'kategori', label: 'Tipe Customer', minWidth: 100 },
  { id: 'status_aktif', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 140 },
  
];

const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
    //   style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
));

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	statusNonActive: {
		backgroundColor: 'red',
		color: '#fff'
	}
}));

const ListCustomer = (props) => {
	const { searchCustomer, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage } = props
	const classes = useStyles();
	var no = searchCustomer.from 

	return (
		<Fragment>
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
					{searchCustomer.data.map((customer) => (
						<TableRow key={customer.id}>
							<TableCell>
								{no++}
							</TableCell>
							<TableCell>
								{customer.id_agent}
							</TableCell>
							<TableCell>
								{customer.name}
							</TableCell>
							<TableCell>
								{customer.address}
							</TableCell>
							<TableCell>
								{customer.status === '1' && (
									<Typography>AOG</Typography>
								)}
								{customer.status === '2' && (
									<Typography>MOG</Typography>
								)}
								{customer.status === '3' && (
									<Typography>Umum</Typography>
								)}
							</TableCell>
							<TableCell>
								{customer.is_active === '1' ? (
									<Chip label='Aktif' color="primary" />
								): (
									<Chip label='Tidak Aktif' className={classes.statusNonActive} />
								)}
							</TableCell>
							<TableCell>
								<Tooltip title="Edit Customer">
									<IconButton aria-label="edit" component={CustomRouterLink} to={`/customer/edit/${customer.id}`}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				rowsPerPageOptions={[15]}
				rowsPerPage={rowsPerPage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				count={searchCustomer.total}
				page={page}
				onChangePage={handleChangePage}
			/>
			</Paper>
		</Fragment>
	)
	
}

ListCustomer.propTypes = {
    getCustomer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  customer: state.customer
})

export default connect(mapStateToProps, { getCustomer })(ListCustomer)