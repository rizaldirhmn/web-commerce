import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton'

import { connect } from 'react-redux';
import { getCustomer } from '../../../actions/customer'

const columns = [
  { id: 'no_id', label: 'No ID', minWidth: 100 },
  { id: 'nama', label: 'Nama', minWidth: 150 },
  { id: 'alamat', label: 'Alamat', minWidth: 200 },
  { id: 'kategori', label: 'Kategori', minWidth: 100 },
  { id: 'status_aktif', label: 'Status', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 140 },
  
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const ListCustomer = ({ getCustomer, customer : { customers, loading } }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
		getCustomer()
	}, [getCustomer]);

  return (
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
			{!loading ? (
				<>
					{customers.data.map((customer) => (
						<TableRow>
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
								{customer.status}
							</TableCell>
							<TableCell>
								{customer.is_active}
							</TableCell>
							<TableCell>
		
							</TableCell>
						</TableRow>
					))}
				</>
			):(
				<TableRow>
					<TableCell colSpan={6}>
						<Skeleton variant="rect"></Skeleton>
					</TableCell>
				</TableRow>
			)}
        </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={!loading && customers.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const mapStateToProps = state => ({
  customer: state.customer
})

export default connect(mapStateToProps, { getCustomer })(ListCustomer)