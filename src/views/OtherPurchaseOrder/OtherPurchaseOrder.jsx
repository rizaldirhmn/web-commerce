import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import {
    Typography,
    Grid,
    Fab,
    Paper,
    InputBase,
    Divider,
    Hidden,
    CardContent,
    Card,
    IconButton
} from '@material-ui/core'
import AddCircle from '@material-ui/icons/AddCircle'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton'
import moment from 'moment'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

// Components
import ListPurchaseOrder from './ListPurchaseOrder'

// Redux
import { connect } from 'react-redux'
import { addPurchaseOrder, getPurchaseOrder } from '../../actions/otherPurchaseOrder'

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

const PurchaseOrder = ({ 
    addPurchaseOrder,
    getPurchaseOrder, 
	otherPurchaseOrder : { otherPurchaseOrders, loading } 
}) => {
    const classes = useStyles()
    const history = useHistory()

    const onSubmit = e => {
        addPurchaseOrder(history)
    }

    const [ keyword, setKeyword ] = useState('')

    const handleChangeKeyword = event => {
        setKeyword(event.target.value)
    }

    const selectedDate  = useState(new Date());

    const submitDefault = moment().subtract(7, 'd').format('YYYY-MM-DD');
    const submitDefaultEndDate = moment().format('YYYY-MM-DD');
    const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: moment().subtract(7,'d').format('DD MMMM yyyy')
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
		getPurchaseOrder(startDate.submit.submit, endDate.submit.submit, keyword)
	}, [loading, getPurchaseOrder, startDate, endDate, keyword]);

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item>  
                        <Typography variant="h4">Pencatatan Pengeluaran</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Grid
                    container
                    spacing={2}
                    justify='space-between'
                >
                    <Hidden only={['xs','sm']}>
                        <Grid item lg={6} md={6} sm={6} xs={12}>
                            <Fab variant="extended" className={classes.btnAddCustomer} onClick={onSubmit}>
                                <AddCircle className={classes.extendedIcon} />
                                Catat Pengeluaran Baru
                            </Fab>
                        </Grid>
                    </Hidden>
                    <Hidden only={['md','lg','xl']}>
                        <Fab color="primary" aria-label="add" className={classes.fab} onClick={onSubmit}>
                            <AddCircle/>
                        </Fab>
                    </Hidden>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <Paper component="form" className={classes.searchRoot}>
                            <InputBase
                                className={classes.input}
                                name="pesan"
                                onChange={handleChangeKeyword}
                                value={keyword || ''}
                                placeholder="Cari"
                                inputProps={{ 'aria-label': 'Cari Invoice' }}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton type="button" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
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
                        <Card>
                            <CardContent>
                                <Grid container justify="space-between">
                                    <Grid item>
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
                                    </Grid>
                                    <Grid item>
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
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardContent>
                                {!loading ? (
                                    <ListPurchaseOrder otherPurchaseOrders={otherPurchaseOrders} />
                                ):(
                                    <Skeleton variant="rect" height={200}></Skeleton>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

PurchaseOrder.propTypes = {
    getPurchaseOrder: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  otherPurchaseOrder: state.otherPurchaseOrder
})

export default connect(mapStateToProps, { addPurchaseOrder, getPurchaseOrder })(PurchaseOrder)