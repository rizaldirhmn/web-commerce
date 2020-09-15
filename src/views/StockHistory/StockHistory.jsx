import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Typography,
    Grid,
    Paper,
    IconButton,
    Divider,
    Card,
    CardContent,
} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

// Components
import ListProduct from './ListProduct'

import { connect } from 'react-redux'
import { getStock } from '../../actions/stockHistory'
import { useEffect } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btnAddCustomer: {
        backgroundColor: '#0277BD',
        '&:hover' : {
            backgroundColor: '#2092D6'
        },
        color: '#FFFFFF',
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

const StockHistory = ({
    getStock,
    stockHistory : { stockHistory, loading }
}) => {
    const classes = useStyles()

    const [selectedDate ] = useState(new Date());

    const submitDefault = moment().subtract(7, 'd').format('YYYY-MM-DD')
    const submitDefaultEndDate = moment().format('YYYY-MM-DD')
    const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: moment().subtract(7, 'd').format('YYYY-MM-DD')
        }
    })
    const handleStartDate = (date) => {
    const changeDate = moment(date).format('YYYY-MM-DD')
        setStartDate(startDate => ({
            ...startDate,
                submit: {
                    submit: changeDate
            },
                view: {
                    view: date
            }
        }))
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
        getStock(startDate.submit.submit, endDate.submit.submit)
    }, [loading, getStock, startDate, endDate])

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">Stock History</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Typography>Tanggal Awal</Typography>
                        <div className={classes.row}>
							<Paper component="form" className={classes.searchRoot}>
								<IconButton type="button" className={classes.iconButton} aria-label="search">
									<CalendarIcon />
								</IconButton>
								<Divider className={classes.divider} orientation="vertical" />
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										fullWidth
										disableFuture
										ampm={false}
										variant="outlined"
										name="start_date"
										format="dd MMMM yyyy"
										value={startDate.view.view} 
										onChange={handleStartDate} 
									/>
								</MuiPickersUtilsProvider>
							</Paper>
						</div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={6} xs={12}>
                        <Typography>Tanggal Akhir</Typography>
                        <div className={classes.row}>
							<Paper component="form" className={classes.searchRoot}>
								<IconButton type="button" className={classes.iconButton} aria-label="search">
									<CalendarIcon />
								</IconButton>
								<Divider className={classes.divider} orientation="vertical" />
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										fullWidth
										disableFuture
										ampm={false}
										variant="outlined"
										name="end_date"
										format="dd MMMM yyyy"
										value={endDate.view.view} 
										onChange={handleEndDate} 
									/>
								</MuiPickersUtilsProvider>
							</Paper>
						</div>
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
                        <Card>
                            <CardContent>
                                {!loading ? (
                                    <ListProduct stockHistory={stockHistory} />
                                ):(
                                    <Skeleton variant="rect" height={100}></Skeleton>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    stockHistory: state.stockHistory
})

export default connect(mapStateToProps, {getStock})(StockHistory)