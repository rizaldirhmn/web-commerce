import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Grid, Typography, Card, CardContent, TextField, MenuItem, CardActions, Button
} from '@material-ui/core'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import SchemaValidation from './validation'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { addCustomer } from '../../../actions/customer'

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
    }
}))

const CreateCustomer = ({ addCustomer }) => {
    const classes = useStyles()
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });
    
    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    const handleChange = event => {
        // console.log(event.target.value);
        event.persist();
    
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: event.target.value
          }
        }));
    };

    const onSubmit = e => {
        // e.preventDefault()
        console.log(formState.values)
        // const slug = params.slug
        // console.log(formState, startDate.submit.submit)
        addCustomer(formState.values, history)
    }

    return(
        <div className={classes.root}>
            <div className={classes.row}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="h4">Customer</Typography>
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
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                defaultValue={formState.values.status || ''}
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
                                                    AOG
                                                </MenuItem>
                                                <MenuItem key='mog' value="2">
                                                    MOG
                                                </MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                defaultValue={formState.values.name || ''}
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
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                defaultValue={formState.values.id_agent || ''}
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
                                        </Grid>
                                        <Grid
                                            item
                                            lg={6}
                                            md={6}
                                            sm={12}
                                            xs={12}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                defaultValue={formState.values.is_active || ''}
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
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                rows={4}
                                                multiline={true}
                                                defaultValue={formState.values.address || ''}
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
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button size="medium" variant="outlined">
                                        Batal
                                    </Button>
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
    )
}

export default connect(null, { addCustomer })(CreateCustomer)