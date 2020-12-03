import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Card, CardContent, CardHeader, Tooltip, IconButton } from '@material-ui/core';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import "../../../../App.css"
import LookupValueIcon from '@material-ui/icons/Details'

const columns = [
  { id: 'no', label: 'No', minWidth: 100 },
  { id: 'code', label: 'Lookup Task Code', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'is_active', label: 'Is Active', minWidth: 170 },
  { id: 'is_system_lookup', label: 'Is System Lookup', minWidth: 100 },
  { id: 'action', label: 'Actions', minWidth: 100 },
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
    }
}));

const TableLookupTask = props => {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    
    const { 
        lookupTask,
        page,
        rowsPerPage,
        handleChangePage,
        handleOpenDialogLookupListValue,
        handleChangeRowsPerPage
        } = props
        
    var no = lookupTask.from

  return (
      <Card className={classes.paper}>
          <CardHeader 
              title="Lookup Task"
              classes={{
                  title: classes.textHeader
              }}
          />
          <CardContent>
            <TableContainer className={classes.container}>
              <Table stickyHeader size="small" aria-label="sticky table">
                <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={lookupTask.total}
                />  
              <TableBody>
                    {stableSort(lookupTask.data, getComparator(order, orderBy)).map(
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
                                    <TableCell>
                                        <div className="text">
                                            {row.is_system_lookup}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip arrow title="Lookup List Value" placement="bottom">
                                            <IconButton style={{ color: '#2285DF'}} onClick={e => handleOpenDialogLookupListValue(row)}>
                                                <LookupValueIcon />
                                            </IconButton>
                                        </Tooltip>
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
                count={lookupTask.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </CardContent>
      </Card>
  );
}

export default TableLookupTask