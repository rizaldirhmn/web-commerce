import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { 
    Grid, Typography, Card, CardContent, TextField, MenuItem, CardActions, Button
} from '@material-ui/core'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import SchemaValidation from './validation'
import { useHistory, useParams, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { editCustomer, getDetailCustomer } from '../../../actions/customer'
import Skeleton from '@material-ui/lab/Skeleton'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    btn: {
        backgroundColor: '#011747',
        color: '#FFF'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const EditCustomer = ({ 
    customer : { currentCustomer, loading },
    editCustomer, 
    getDetailCustomer, 
}) => {
    const classes = useStyles()
    const history = useHistory()
    const { id } = useParams()
    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });
    const [formState, setFormState] = useState({});

    useEffect(() => {
        getDetailCustomer(id)

        // setFormState({
        //     name : loading || !currentCustomer.name ? '' : currentCustomer.name,
        //     status : loading || !currentCustomer.status ? '' : currentCustomer.status,
        //     is_active : loading || !currentCustomer.is_active ? '' : currentCustomer.is_active,
        //     address : loading || !currentCustomer.address ? '' : currentCustomer.address,
        //     id_agent : loading || !currentCustomer.id_agent ? '' : currentCustomer.id_agent,
        // })
    
    }, [id, loading, getDetailCustomer]);

    // const {
    //     name,
    //     status,
    //     is_active,
    //     address,
    //     id_agent
    // } = formState

    const handleChange = event => {
        console.log(event.target.value)
        event.persist();
    
        setFormState(formState => ({
          ...formState,
            [event.target.name]: event.target.value
        }));
    };

    const onSubmit = e => {
        editCustomer(formState, history, id)
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    // console.log(isEmpty(currentCustomer))

    return loading || isEmpty(currentCustomer) ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop> 
    : 
    <Fragment>
        <div className={classes.root}>
        
            <div className={classes.row}>
                <Grid container spacing={2} justify="space-between">
                    <Grid item>
                        <Typography variant="h4">Customer</Typography>
                        <p>{formState.id_agent}</p>
                    </Grid>
                    <Grid item>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" to="/dashboard">
                                Dashboard
                            </Link>
                            <Link color="inherit" to="/customer">
                                Customer
                            </Link>
                            <Typography color="textPrimary">Edit Customer</Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.row}>
                <Grid container>
                    <Grid
                        item
                        lg={8}
                        md={8}
                        sm={12}
                        xs={12}
                    >
                        <Card>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            {!loading ? (
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    defaultValue={currentCustomer.status}
                                                    label="Tipe Customer"
                                                    margin="dense"
                                                    name="status"
                                                    onChange={handleChange}
                                                    helperText={
                                                        errors.status && errors.status.message
                                                    }
                                                    error={errors.status && true}
                                                    inputRef={register}
                                                    select
                                                >
                                                    <MenuItem key='aog' value="1">
                                                        Agent of Gold
                                                    </MenuItem>
                                                    <MenuItem key='mog' value="2">
                                                        Member of Gold
                                                    </MenuItem>
                                                    <MenuItem key='customer' value="3">
                                                        Umum
                                                    </MenuItem>
                                                </TextField>
                                            ):(
                                                <Skeleton variant="rect"></Skeleton>
                                            )}
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            {!loading ? (
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    defaultValue={currentCustomer.name}
                                                    label="Nama Customer"
                                                    margin="dense"
                                                    name="name"
                                                    onChange={handleChange}
                                                    helperText={
                                                        errors.name && errors.name.message
                                                    }
                                                    error={errors.name && true}
                                                    inputRef={register}
                                                />
                                            ):(
                                                <Skeleton variant="rect"></Skeleton>
                                            )}
                                        </Grid>
                                        
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            {!loading ? (
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    defaultValue={currentCustomer.id_agent}
                                                    label="Nomor ID Anggota"
                                                    margin="dense"
                                                    name="id_agent"
                                                    onChange={handleChange}
                                                    helperText={
                                                        errors.id_agent && errors.id_agent.message
                                                    }
                                                    error={errors.id_agent && true}
                                                    inputRef={register}
                                                />
                                            ):(
                                                <Skeleton variant="rect"></Skeleton>
                                            )}
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            {!loading ? (
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    defaultValue={currentCustomer.is_active}
                                                    label="Status Aktif"
                                                    margin="dense"
                                                    name="is_active"
                                                    onChange={handleChange}
                                                    helperText={
                                                        errors.is_active && errors.is_active.message
                                                    }
                                                    error={errors.is_active && true}
                                                    inputRef={register}
                                                    select
                                                >
                                                    <MenuItem key="aktif" value="1">
                                                        Aktif
                                                    </MenuItem>
                                                    <MenuItem key="tidak_aktif" value="2">
                                                        Tidak Aktif
                                                    </MenuItem>
                                                </TextField>
                                            ):(
                                                <Skeleton variant="rect"></Skeleton>
                                            )}
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            xs={12}
                                        >
                                            {!loading ? (
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    rows={4}
                                                    multiline={true}
                                                    defaultValue={currentCustomer.address}
                                                    label="Alamat Lengkap"
                                                    margin="dense"
                                                    name="address"
                                                    onChange={handleChange}
                                                    helperText={
                                                        errors.address && errors.address.message
                                                    }
                                                    error={errors.address && true}
                                                    inputRef={register}
                                                />
                                            ):(
                                                <Skeleton variant="rect"></Skeleton>
                                            )}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button type="submit" size="medium" variant="contained" className={classes.btn}>
                                        Simpan
                                    </Button>
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    </Fragment>
    
}
EditCustomer.propTypes = {
    editCustomer: PropTypes.func.isRequired,
    getDetailCustomer: PropTypes.func.isRequired,
    currentCustomer: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    customer: state.customer
  })

export default connect(mapStateToProps, { editCustomer, getDetailCustomer })(EditCustomer)