import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    InputLabel,
    Grid,
    TextField,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
    Backdrop,
    useMediaQuery,
    Dialog,
    DialogTitle,
    Typography
} from '@material-ui/core'
import { useForm } from "react-hook-form";
import { useParams, useHistory } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles';

// redux
import { connect } from 'react-redux'
import { postTask } from '../../../store/actions/task'

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment'

import TableMember from './TableMember'
import TableTaskType from './TableTaskType'
import TableCustomer from './TableCustomer'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0),
        // width: '600px'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
    text: {
        color: '#000000',
        fontFamily: 'Montserrat'
    },
    card:{
        overflow: 'visible'
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '120px',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    textMenu: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat',
    },
}))

const CreateTask = props => {
    const classes = useStyles()
    const theme = useTheme()
    const history = useHistory()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { 
        handleClose, 
        postTask,
        setOpenCreateTask,
        task : {
            loadingCreateTask
        }
    } = props
    const params = useParams()
    const { register, handleSubmit, errors } = useForm();

    const [formState, setFormState] = useState({
        values: {},
    });

    // Dialog Member
    const [ openDialogMember, setOpenDialogMember ] = useState(false)
    const handleCloseMember = () => {
        setOpenDialogMember(false)
    }
    const handleSelectChange = (event) => {
        setOpenDialogMember(false)
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              'user_id': event.id,
              'username': event.username
            }
        }));
    }
    // End Dialog member

    // Dialog Task Type
    const [ openDialogTaskType, setOpenDialogTaskType ] = useState(false)
    const handleCloseTaskType = () => {
        setOpenDialogTaskType(false)
    }
    const handleSelectTaskTypeChange = (event) => {
        setOpenDialogTaskType(false)
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              'task_type_id': event.id,
              'task_name': event.code
            }
        }));
    }
    // End Dialog Task Type

    // Dialog Customer
    const [ openDialogCustomer, setOpenDialogCustomer ] = useState(false)
    const handleCloseCustomer = () => {
        setOpenDialogCustomer(false)
    }
    const handleSelectCustomerChange = (event) => {
        setOpenDialogCustomer(false)
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              'customer_id': event.id,
              'customer_name': event.name
            }
        }));
    }
    // End Dialog Customer

    const submitDefault = moment().format('YYYY-MM-DD')
	const [ startDate, setStartDate ] = useState({
        submit: {
            submit: submitDefault
        },
        view: {
            view: new Date()
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
    
    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: 
                event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
          }
        }));
    };

    const onSubmit = e => {
        postTask(params.id, formState.values, startDate.submit.submit, history)
        setOpenCreateTask(false)
    }

    return loadingCreateTask ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className={classes.card}>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                        <Grid
                            container
                            spacing={2}
                            className={classes.root}
                        >
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="code"
                                    label="Input your task code"
                                    name="code"
                                    defaultValue={formState.values.code || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.code && errors.code.message
                                    }
                                    error={errors.code && true}
                                    inputRef={register}
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    name="task_type_id"
                                    label="Task Type"
                                    value={formState.values.task_name || ''}
                                    onClick={e => setOpenDialogTaskType(true)}
                                />
                            </Grid>
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    name="customer_id"
                                    label="Customer"
                                    value={formState.values.customer_name || ''}
                                    onClick={e => setOpenDialogCustomer(true)}
                                />
                            </Grid>
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <TextField
                                    autoFocus
                                    fullWidth
                                    margin="dense"
                                    name="user_id"
                                    label="Assign To"
                                    value={formState.values.username || ''}
                                    onClick={e => setOpenDialogMember(true)}
                                />
                            </Grid>
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <InputLabel htmlFor="outlined-age-native-simple">Assign Date</InputLabel>
                                <div className={classes.searchRoot}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            fullWidth
                                            disablePast
                                            ampm={false}
                                            variant="outlined"
                                            name="start_date"
                                            format="dd MMMM yyyy"
                                            value={startDate.view.view} 
                                            onChange={handleStartDate} 
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </Grid>
                            
                        </Grid>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.button} onClick={handleClose}>
                        <div className={classes.textMenu}>
                            Close
                        </div>
                    </Button>
                    <Button type="submit" className={classes.button}>
                        <div className={classes.textMenu}>
                            Save
                        </div>
                    </Button>
                </DialogActions>
            </form>
            <Dialog
                open={openDialogMember}
                onClose={handleCloseMember}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    <Typography className={classes.title}>
                        Member List
                    </Typography>
                </DialogTitle>
                <TableMember
                    handleCloseMember={handleCloseMember}
                    setOpenDialogMember={setOpenDialogMember}
                    handleSelectChange={handleSelectChange}
                />
            </Dialog>
            <Dialog
                open={openDialogTaskType}
                onClose={handleCloseTaskType}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    <Typography className={classes.title}>
                        Task Type
                    </Typography>
                </DialogTitle>
                <TableTaskType
                    handleCloseTaskType={handleCloseTaskType}
                    setOpenDialogMember={setOpenDialogMember}
                    handleSelectTaskTypeChange={handleSelectTaskTypeChange}
                />
            </Dialog>
            <Dialog
                open={openDialogCustomer}
                onClose={handleCloseCustomer}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    <Typography className={classes.title}>
                        Customer
                    </Typography>
                </DialogTitle>
                <TableCustomer
                    handleCloseCustomer={handleCloseCustomer}
                    setOpenDialogCustomer={setOpenDialogCustomer}
                    handleSelectCustomerChange={handleSelectCustomerChange}
                />
            </Dialog>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(mapStateToProps, { postTask })(CreateTask)