import React, { useState, useEffect } from 'react'
import 'date-fns'
import { makeStyles } from '@material-ui/styles'
import {
    Typography,
    Grid,
    Paper,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

// Components
import ListTransaction from './ListTransaction'

// Redux
import { connect } from 'react-redux'
import { getTransactionBuyback, getTransactionSearchBuyback } from '../../actions/transactionBuyback'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btnSearch: {
        backgroundColor: '#FF9300',
        '&:hover' : {
            backgroundColor: '#FFA938'
        },
        color: '#FFFFFF',
        height: 'auto'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
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
    },
}))

const TransactionBuyback = ({ getTransactionBuyback, getTransactionSearchBuyback, transactionBuyback : { transactions, loading }}) => {
    const classes = useStyles()
    const [selectedDate ] = useState(new Date());

    const submitDefault = moment().subtract(7, 'd').format('YYYY-MM-DD');
    const submitDefaultEndDate = moment().format('YYYY-MM-DD');
    const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: moment().subtract(7, 'd').format('YYYY-MM-DD')
        }
    });
    const handleStartDate = (date) => {
    const changeDate = moment(date).format('YYYY-MM-DD');
        setStartDate(startDate => ({
            ...startDate,
                submit: {
                    submit: changeDate
            },
                view: {
                    view: date
            }
        }));
    };

    const [ endDate, setEndDate ] = useState({
        submit: {
            submit: submitDefaultEndDate
        },
        view: {selectedDate}
    });
    const handleEndDate = (date) => {
    const all = moment(date).format('YYYY-MM-DD');
        setEndDate(endDate => ({
            ...endDate,
            submit: {
                submit: all
            },
            view: {
                view: date
            }
        }));
    };

    useEffect(() => {
        // getTransaction()
        getTransactionSearchBuyback(startDate.submit.submit, endDate.submit.submit)
    }, [loading, getTransactionSearchBuyback, startDate, endDate]);

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">Laporan Buyback Emas</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Paper className={classes.root}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker 
                                    fullWidth
                                    label="Tanggal Awal"
                                    variant="outlined"
                                    name="start_date"
                                    format="dd MMMM yyyy"
                                    value={startDate.view.view} 
                                    onChange={handleStartDate} 
                                />
                            </MuiPickersUtilsProvider>
                        </Paper>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Paper className={classes.root}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker 
                                    fullWidth
                                    label="Tanggal Akhir"
                                    variant="outlined"
                                    name="end_date"
                                    format="dd MMMM yyyy"
                                    value={endDate.view.view} 
                                    onChange={handleEndDate} 
                                />
                            </MuiPickersUtilsProvider>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid 
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <ListTransaction transactions={transactions} loading={loading} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    transactionBuyback: state.transactionBuyback
})

export default connect(mapStateToProps, {getTransactionBuyback, getTransactionSearchBuyback})(TransactionBuyback)