import React, { Fragment } from 'react';
// import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search'
// import DeleteIcon from '@material-ui/icons/Delete'
import { Link as RouterLink } from 'react-router-dom'
// import Backdrop from '@material-ui/core/Backdrop'
// import CircularProgress from '@material-ui/core/CircularProgress'
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import CapitalizedText from '../../../components/layout/CapitalizedText'

import { 
	Tooltip,
	IconButton,
	Typography,
} from '@material-ui/core';

const columns = [
  { id: 'no', label: 'No', minWidth: 100 },
  { id: 'nama', label: 'Nama Item', minWidth: 150 },
  { id: 'satuan', label: 'Satuan', minWidth: 100 },
  { id: 'stock_awal', label: 'Stock Awal', minWidth: 100 },
  { id: 'perubahan_stock', label: 'Perubahan Stock', minWidth: 100 },
  { id: 'stock_akhir', label: 'Stock Akhir', minWidth: 100 },
  { id: 'hpp', label: 'HPP', minWidth: 100 },
  { id: 'total', label: 'Total HPP', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 140 },
  
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

const ListProduct = (props) => {
	const { stockHistory } = props
	const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    var no = 1

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
    };

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
					{stockHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
						<TableRow key={product.id}>
                            <TableCell>
								{no++}
							</TableCell>
							<TableCell>
								<CapitalizedText text={product.name} /> {product.weight}
							</TableCell>
							<TableCell>
								<CapitalizedText text={product.unit} />
							</TableCell>
							<TableCell>

							</TableCell>
							<TableCell>
								
							</TableCell>
							<TableCell>
								
							</TableCell>
							<TableCell>
								
							</TableCell>
							<TableCell>
								
							</TableCell>
							<TableCell>
								<Tooltip title="Detail">
									<RouterLink to={`/stock-history/detail/${product.id}`}>
										<IconButton aria-label="edit">
											<SearchIcon />
										</IconButton>
									</RouterLink>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
					{/* <TableRow>
						<Divider/>
					</TableRow> */}
					<TableRow>
						<TableCell colSpan={3}>
							<Typography variant="body">Total</Typography>
						</TableCell>
						<TableCell>

						</TableCell>
						<TableCell>
							
						</TableCell>
						<TableCell>
							
						</TableCell>
						<TableCell>
							
						</TableCell>
						<TableCell colSpan={2}>
							
						</TableCell>
					</TableRow>
				</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={stockHistory.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
			</Paper>
		</Fragment>
	)
	
}

export default ListProduct