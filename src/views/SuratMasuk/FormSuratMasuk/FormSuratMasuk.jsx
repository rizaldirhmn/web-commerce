import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, TextField, Grid, Typography, InputLabel, CardHeader, Button } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
// import moment from 'moment'
import { useForm } from "react-hook-form";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom';
import { Info as InfoIcon } from '@material-ui/icons'

import UploadFile from './UploadFile'

import '../../../App.css'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    breadcumbs: {
        paddingLeft: theme.spacing(4)
    },
    text: {
        fontFamily: 'Montserrat',
        color: '#000000'
    }
}))

const FormSuratMasuk = props => {
    const classes = useStyles()
    const { handleSubmit } = useForm();
    
    return (
        <>
        <div className={classes.breadcumbs}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" to="/surat-masuk" >
                    Surat Masuk
                </Link>
                <Link
                    color="textPrimary"
                    tp="/surat-masuk/form"
                    
                    aria-current="page"
                >
                    Form Surat Masuk
                </Link>
            </Breadcrumbs>
        </div>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid item>  
                    <Typography variant="h4" className={classes.text}>Form Entri Surat Masuk</Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item lg={12}>
                        <Card>
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={2}
                                    >
                                        <Grid 
                                            item
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                        >
                                            <TextField 
                                                fullWidth
                                                label="No Agenda"
                                                className={classes.textInput}
                                                name="no_agenda"
                                                // defaultValue={formState.values.nama_lengkap || ''}
                                                // onChange={handleChange}
                        
                                                // helperText={
                                                //     errors.nama_lengkap && errors.nama_lengkap.message
                                                // }
                                                // error={errors.nama_lengkap && true}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid 
                                            item
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                        >
                                            <TextField 
                                                fullWidth
                                                label="Nomor Surat"
                                                className={classes.textInput}
                                                name="no_surat"
                                                // defaultValue={formState.values.nama_lengkap || ''}
                                                // onChange={handleChange}
                        
                                                // helperText={
                                                //     errors.nama_lengkap && errors.nama_lengkap.message
                                                // }
                                                // error={errors.nama_lengkap && true}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid 
                                            item
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                        >
                                            <InputLabel htmlFor="outlined-age-native-simple">Tanggal Surat</InputLabel>
                                            <div className={classes.searchRoot}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <DatePicker
                                                        fullWidth
                                                        disableFuture
                                                        ampm={false}
                                                        variant="outlined"
                                                        name="start_date"
                                                        format="dd MMMM yyyy"
                                                        // value={startDate.view.view} 
                                                        // onChange={handleStartDate} 
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </Grid>
                                        <Grid 
                                            item
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                        >
                                            <InputLabel htmlFor="outlined-age-native-simple">Tanggal Terima</InputLabel>
                                            <div className={classes.searchRoot}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <DatePicker
                                                        fullWidth
                                                        disableFuture
                                                        ampm={false}
                                                        variant="outlined"
                                                        name="start_date"
                                                        format="dd MMMM yyyy"
                                                        // value={startDate.view.view} 
                                                        // onChange={handleStartDate} 
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </Grid>
                                        <Grid 
                                            item
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                        >
                                            <TextField 
                                                fullWidth
                                                label="Sumber Surat"
                                                className={classes.textInput}
                                                name="sumber_surat"
                                                // defaultValue={formState.values.nama_lengkap || ''}
                                                // onChange={handleChange}
                        
                                                // helperText={
                                                //     errors.nama_lengkap && errors.nama_lengkap.message
                                                // }
                                                // error={errors.nama_lengkap && true}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid 
                                            item
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                        >
                                            <TextField 
                                                fullWidth
                                                label="Perihal"
                                                className={classes.textInput}
                                                name="perihal"
                                                // defaultValue={formState.values.nama_lengkap || ''}
                                                // onChange={handleChange}
                        
                                                // helperText={
                                                //     errors.nama_lengkap && errors.nama_lengkap.message
                                                // }
                                                // error={errors.nama_lengkap && true}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                        <Grid 
                                            item
                                            lg={6}
                                            md={6}
                                            sm={6}
                                            xs={12}
                                        >
                                            <TextField 
                                                fullWidth
                                                label="Keterangan"
                                                className={classes.textInput}
                                                name="keterangan"
                                                // defaultValue={formState.values.nama_lengkap || ''}
                                                // onChange={handleChange}
                        
                                                // helperText={
                                                //     errors.nama_lengkap && errors.nama_lengkap.message
                                                // }
                                                // error={errors.nama_lengkap && true}
                                                // inputRef={register}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item lg={12}>
                        <Card>
                            <CardHeader 
                                title="Upload File" 
                                classes={{
                                    title: classes.text
                                }}
                            />
                            <CardContent>
                                <UploadFile />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid 
                    container 
                    spacing={4}
                    justify="space-between"
                >
                    <Grid item>
                        <Typography variant="subtitle2">
                            <InfoIcon fontSize="small"/> Pastikan semua data terisi lengkap dan benar!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" className={classes.btnPrimary}>Simpan</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
        </>
    )
}

export default FormSuratMasuk