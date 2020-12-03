import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Card, CardContent, CardHeader, Paper, InputBase, Backdrop, CircularProgress } from '@material-ui/core';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { useParams } from 'react-router-dom'
import "../../../../App.css"

import { connect } from 'react-redux'
import { getLookupListTask } from '../../../../store/actions/task'

const columns = [
  { id: 'no', label: 'No', minWidth: 100 },
  { id: 'code', label: 'Lookup Value Code', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'is_active', label: 'Is Active', minWidth: 170 },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
    return -1;
    }
    if (b[orderBy] > a[orderBy]) {
    return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
    const {
        classes,
        order,
        orderBy,
        onRequestSort
    } = props;

    const createSortHandler = property => event => {
    onRequestSort(event, property);
    };

    return (
    <TableHead>
        <TableRow>
        {columns.map(column => (
            <TableCell
            key={column.id}
            sortDirection={orderBy === column.id ? order : false}
            >
            <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
            >
                <div className="text">
                    {column.label}
                </div>
                {orderBy === column.id ? (
                <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
                ) : null}
            </TableSortLabel>
            </TableCell>
        ))}
        </TableRow>
    </TableHead>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    container: {
        maxHeight: 440,
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        padding: theme.spacing(2),
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
    },
    textHeader: {
        color: '#000000',
        fontFamily: 'Montserrat',
        fontWeight: 700
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    },
    searchRoot: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
        width: '300px',
        [theme.breakpoints.down('sm')]: {
            width:'100%'
        }
		// marginTop: theme.spacing(2)
	},
	input: {
		marginLeft: theme.spacing(1),
        flex: 1,
        height: '35px'
	}
}));

const TableLookupListValue = props => {
    const classes = useStyles();
    const params = useParams()
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    
    const { 
        lookupListValueId,
        getLookupListTask,
        task: {
            lookupListValue,
            loadingLookupListValue
        }
    } = props

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [keyword, setKeyword] = useState('')

    const handleChangeSearch = event => {
        setKeyword(event.target.value)
        setPage(0)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
        
    if (!loadingLookupListValue) {
        var no = lookupListValue.from
    }

    useEffect(() => {
        getLookupListTask(params.id, page+1, keyword, rowsPerPage, lookupListValueId.code)
    }, [getLookupListTask, params, page, keyword, rowsPerPage, lookupListValueId])

    return loadingLookupListValue ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <Card className={classes.paper}>
            <CardHeader 
                title="Lookup List Value"
                classes={{
                    title: classes.textHeader
                }}
                action={
                    <Paper component="form" className={classes.searchRoot}>
                        <InputBase
                            className={classes.input}
                            name="nama"
                            value={keyword || ''}
                            onChange={handleChangeSearch}
                            placeholder="Search Lookup Value"
                            inputProps={{ 'aria-label': 'Search Customer' }}
                        />
                        
                    </Paper>
                }
            />
            <CardContent>
                <TableContainer className={classes.container}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={lookupListValue.total}
                    />  
                <TableBody>
                        {stableSort(lookupListValue.data, getComparator(order, orderBy)).map(
                            (row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow key={row.code}>
                                        <TableCell id={labelId}>
                                            <div className="text">
                                                {no++}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text">
                                                {row.code}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text">
                                                {row.description}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text">
                                                {row.is_active}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        )}
                </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    component="div"
                    count={lookupListValue.total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    </Fragment>
}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(mapStateToProps, { getLookupListTask })(TableLookupListValue)