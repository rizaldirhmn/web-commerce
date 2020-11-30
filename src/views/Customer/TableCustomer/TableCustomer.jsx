import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import TableSortLabel from "@material-ui/core/TableSortLabel";

import { CSVLink } from 'react-csv'

const columns = [
  { id: 'no', label: 'No' },
  { id: 'code', label: 'Code' },
  { id: 'name', label: 'Customer Name' },
  { id: 'email', label: 'Customer Email' },
  { id: 'is_active', label: 'Customer Status' },
];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 480,
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        marginRight: theme.spacing(1),
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
    textTable: {
        color: '#000000',
        fontFamily: 'Montserrat',
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
                <div className={classes.textTable}>
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

const TableCustomer = props => {
    const classes = useStyles();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    
    const { 
        templateCustomer, 
        listCustomer,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage
        } = props
        
    var no = listCustomer.from

    const customer = () => {
        let headers = []
        headers.push(
            ["Name (Freetext) ", "Code (Freetext)", "Email (Freetext)", "Phone (Number)"],
            ["Rizaldi Rahman", "123123123", "abc@gmail.com", "123123123"]
        )
        for (let i = 0; i < templateCustomer.length; i++) {
            let caption = templateCustomer[i].caption+` (${templateCustomer[i].form_type}) (${templateCustomer[i].mode})`
            let value = templateCustomer[i].value
            headers[0].push(caption)
            headers[1].push(value)
        }
        return headers
    }

  const [exCust] = useState(customer)
  return (
    <Card className={classes.root}>
        <CardHeader 
            title="Customer"
            classes={{
                title: classes.textHeader
            }}
            action={
                <Button className={classes.button}>
                    <CSVLink data={exCust} filename="Customers.csv" separator={";"}>
                      <div className={classes.textMenu}>
                        Download Template
                      </div>
                    </CSVLink>
                </Button>
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
                    rowCount={listCustomer.total}
                />  
                <TableBody>
                    {stableSort(listCustomer.data, getComparator(order, orderBy)).map(
                        (row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                            <TableRow key={row.code}>
                                <TableCell id={labelId}>
                                    <div className={classes.textTable}>
                                        {no++}
                                    </div>
                                </TableCell>
                                <TableCell key={row.code}>
                                    <div className={classes.textTable}>
                                        {row.code}
                                    </div>
                                </TableCell>
                                <TableCell key={row.name}>
                                    <div className={classes.textTable}>
                                        {row.name}
                                    </div>
                                </TableCell>
                                <TableCell key={row.email}>
                                    <div className={classes.textTable}>
                                        {row.email}
                                    </div>
                                </TableCell>
                                <TableCell key={row.is_active}>
                                    <div className={classes.textTable}>
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
                count={listCustomer.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </CardContent>
    </Card>
  );
}

export default TableCustomer