import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DetailIcon from '@material-ui/icons/Search'
import moment from 'moment';
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link as RouterLink } from 'react-router-dom'

import { 
	Tooltip,
	IconButton,
	Typography
} from '@material-ui/core';
import NumberFormat from 'react-number-format'

const columns = [
  { id: 'tanggal', label: 'Tanggal', minWidth: 100 },
  { id: 'no_invoice', label: 'No Invoice', minWidth: 100 },
  { id: 'customer', label: 'Customer', minWidth: 200 },
  { id: 'total_harga', label: 'Buyback', minWidth: 100 },
  { id: 'action', label: 'Aksi', minWidth: 100 },
  
];

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
}));

const ListTransaction = (props) => {
    const classes = useStyles();
    const { transactions, loading } = props
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
    
	return loading || transactions == null ? 
		<Backdrop className={classes.backdrop} open>
			<CircularProgress color="inherit" />
		</Backdrop> 
		: 
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
					{transactions.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((trx) => (
						<TableRow key={trx.id}>
							<TableCell>
                                {moment(trx.created_at).format('DD MMMM YYYY HH:mm')}
								{/* {trx.created_at} */}
							</TableCell>
							<TableCell>
								{trx.inv_name}
							</TableCell>
							<TableCell>
								{trx.customer.name}
							</TableCell>
							<TableCell>
                                <NumberFormat value={trx.total} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
							</TableCell>
							<TableCell>
								<Tooltip title="Detail Invoice">
									<RouterLink to={`/report/buyback/detail/${trx.id}`}>
										<IconButton aria-label="detail" color="primary">
											<DetailIcon />
										</IconButton>
									</RouterLink>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
					{transactions.data.length > 0 && (
						<TableRow>
							<TableCell colsPan={3}>
								<Typography variant="h4">Total</Typography>
							</TableCell>
							<TableCell colsPan={2}>
								<Typography variant="h4">
									<NumberFormat value={transactions.total.total_price} displayType={'text'} thousandSeparator={true} prefix={`RP `} />
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={!loading && transactions.data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			</Paper>
		</Fragment>
	
}

export default ListTransaction