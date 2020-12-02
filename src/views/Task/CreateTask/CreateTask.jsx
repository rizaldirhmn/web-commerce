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
} from '@material-ui/core'
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom'

// redux
import { connect } from 'react-redux'
import { postTask } from '../../../store/actions/task'

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment'

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
    const { 
        taskType, 
        listCustomer, 
        handleClose, 
        listMember,
        postTask,
        setOpenCreateTask,
        task : {
            loadingCreateTask
        }
    } = props
    const params = useParams()
    const { register, handleSubmit, errors } = useForm();

    const optionsTaskType = [];
    for (let i = 0; i < taskType.data.length; i++) {
        optionsTaskType.push({'value' : taskType.data[i].id, 'label' : taskType.data[i].code, 'name' : 'task_type_id'});
    }

    const optionsCustomer = [];
    for (let i = 0; i < listCustomer.data.length; i++) {
        optionsCustomer.push({'value' : listCustomer.data[i].id, 'label' : listCustomer.data[i].name, 'name' : 'customer_id'});
    }

    const optionsMember = [];
    for (let i = 0; i < listMember.data.length; i++) {
        optionsMember.push({'value' : listMember.data[i].id, 'label' : listMember.data[i].display_name, 'name' : 'user_id'});
    }

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

    const [formState, setFormState] = useState({
        values: {},
    });
    
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

    const onSelectedChange = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              [event.name]: event.value
            }
        }));
    }

    const onSubmit = e => {
        postTask(params.id, formState.values, startDate.submit.submit)
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
                                <InputLabel htmlFor="outlined-age-native-simple">Choose Task Type</InputLabel>
                                <Select 
                                    className={classes.select} 
                                    options={optionsTaskType} 
                                    onChange={onSelectedChange} 
                                    placeholder="Choose task type"
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
                                <InputLabel htmlFor="outlined-age-native-simple">Choose Customer</InputLabel>
                                <Select 
                                    className={classes.select} 
                                    options={optionsCustomer} 
                                    onChange={onSelectedChange} 
                                    placeholder="Choose Customer"
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
                                <InputLabel htmlFor="outlined-age-native-simple">Choose Member</InputLabel>
                                <Select 
                                    className={classes.select} 
                                    options={optionsMember} 
                                    onChange={onSelectedChange} 
                                    placeholder="Choose Member"
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
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    task: state.task
})

export default connect(mapStateToProps, { postTask })(CreateTask)