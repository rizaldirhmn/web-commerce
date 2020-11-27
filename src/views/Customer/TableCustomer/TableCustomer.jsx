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

import { CSVLink } from 'react-csv'

const columns = [
  { id: 'no', label: 'No' },
  { id: 'code', label: 'Kode' },
  { id: 'name', label: 'Nama Customer' },
  { id: 'email', label: 'Email Customer' },
  { id: 'is_active', label: 'Status Customer' },
];

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
}));

const TableCustomer = props => {
    const classes = useStyles();
    
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
            action={
                // <Button className={classes.button} onClick={(e) => exportToCSV(exCust,'Customers')}>
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
                <Table stickyHeader aria-label="sticky table">
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
                    {listCustomer.data.map((row) => (
                        <TableRow key={row.code}>
                            <TableCell>
                                {no++}
                            </TableCell>
                            <TableCell key={row.code}>
                                {row.code}
                            </TableCell>
                            <TableCell key={row.name}>
                                {row.name}
                            </TableCell>
                            <TableCell key={row.email}>
                                {row.email}
                            </TableCell>
                            <TableCell key={row.is_active}>
                                {row.is_active}
                            </TableCell>
                        </TableRow>
                    ))}
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