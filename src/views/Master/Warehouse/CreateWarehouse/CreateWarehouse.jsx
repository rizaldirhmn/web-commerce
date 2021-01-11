import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Typography, 
    Button,
    Backdrop,
    CircularProgress
} from '@material-ui/core'
import Select from 'react-select';
import Skeleton from '@material-ui/lab/Skeleton'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import { useHistory } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
import { getProvince, getCities, getDistrict, getVillage } from '../../../../store/actions/province'
import { addWarehouse } from '../../../../store/actions/Master/warehouse'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        fontFamily: 'Montserrat'
    },
    select: {
        minHeight: 40,
    },
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        overflow: 'visible'
    },
    backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
    },
}))

const SchemaValidation = yup.object().shape({
    name: yup.string().required("Warehouse Name cannot be Null"),
	number_phone: yup.string().required("Phone Number Cannot be Null"),
	full_address: yup.string().required("Full Address Cannot be Null"),
	code_pos: yup.string().required("Pos Code Cannot be Null"),
})

const CreateWarehouse = props => {
    const classes = useStyles()
    const history = useHistory()
    const { 
        getProvince, 
        getCities, 
        getDistrict, 
        getVillage,
        addWarehouse,
        province : { 
            province, 
            city, 
            district, 
            village,
            loadingProvince, 
            loadingCity, 
            loadingDistrict,
            loadingVillage
        },
        warehouse: {
            loadingWarehouseData
        }
    } = props

    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });

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

    const onProvinceChange = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              [event.name]: event.value.name
            }
        }));
        getCities(event.value.id)
    }

    const onCityChange = event => {
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              [event.name]: event.value.name
            }
        }));
        getDistrict(event.value.id)
    }

    const onDistrictChange = event => {
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              [event.name]: event.value.name
            }
        }));
        getVillage(event.value.id)
    }

    const onVillageChange = event => {
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              [event.name]: event.value.name
            }
        }));
    }

    const optionsLoading = [{ 'value' : 'loading', 'label' : 'Loading'}];
    const provinceOptions = [];
    if(province != null){
        for (let i = 0; i < province.length; i++) {
            provinceOptions.push({'value' : province[i], 'label' : province[i].name, 'name' : 'province'});
        }
    }

    const cityOptions = [];
    if(city != null){
        for (let i = 0; i < city.length; i++) {
            cityOptions.push({'value' : city[i], 'label' : city[i].name, 'name' : 'city'});
        }
    }

    const districtOptions = [];
    if(district != null){
        for (let i = 0; i < district.length; i++) {
            districtOptions.push({'value' : district[i], 'label' : district[i].name, 'name' : 'district'});
        }
    }

    const villageOptions = [];
    if(village != null){
        for (let i = 0; i < village.length; i++) {
            villageOptions.push({'value' : village[i], 'label' : village[i].name, 'name' : 'village'});
        }
    }

    const onSubmit = e => {
        console.log('masuk')
        addWarehouse(formState.values, history)
    }

    useEffect(() => {
        getProvince()
    }, [getProvince, loadingProvince])

    return loadingWarehouseData ? 
    <Backdrop className={classes.backdrop} open>
        <CircularProgress color="inherit" />
    </Backdrop>
    :
    <Fragment>
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    lg={12}
                >
                    <Typography variant="h4" className={classes.title}>
                        Create New Warehouse
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    name="name"
                                    label="Warehouse name"
                                    defaultValue={formState.values.name || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.name && errors.name.message
                                    }
                                    error={errors.name && true}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    type="number"
                                    name="number_phone"
                                    label="Phone Number"
                                    defaultValue={formState.values.number_phone || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.number_phone && errors.number_phone.message
                                    }
                                    error={errors.number_phone && true}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid 
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                {!loadingProvince || province != null ? (
                                    <>
                                            <Select 
                                                className={classes.select} 
                                                options={provinceOptions} 
                                                onChange={onProvinceChange} 
                                                placeholder="Pilih Provinsi"
                                            />
                                    </>
                                ):(
                                    <Skeleton variant="rect"></Skeleton>
                                )}
                            </Grid>
                            <Grid 
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                {!loadingCity || city != null ? (
                                    <Select 
                                        className={classes.select} 
                                        options={cityOptions} 
                                        onChange={onCityChange} 
                                        placeholder="Pilih Kota/Kabupaten"
                                    />
                                ):(
                                    <Select 
                                        disabled
                                        className={classes.select} 
                                        options={optionsLoading} 
                                        onChange={onCityChange} 
                                        placeholder="Pilih Kota/Kabupaten"
                                    />
                                )}
                            </Grid>
                            <Grid 
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                {!loadingDistrict || district != null ? (
                                    <Select 
                                        className={classes.select} 
                                        options={districtOptions} 
                                        onChange={onDistrictChange} 
                                        placeholder="Pilih Kecamatan"
                                    />
                                ):(
                                    <Select 
                                        disabled
                                        className={classes.select} 
                                        options={optionsLoading} 
                                        onChange={onDistrictChange} 
                                        placeholder="Pilih Kecamatan"
                                    />
                                )}
                            </Grid>
                            <Grid 
                                item
                                lg={6}
                                md={6}
                                sm={6}
                                xs={12}
                            >
                                {!loadingVillage || village != null ? (
                                    <Select 
                                        className={classes.select} 
                                        options={villageOptions} 
                                        onChange={onVillageChange} 
                                        placeholder="Pilih Kelurahan"
                                    />
                                ):(
                                    <Select 
                                        disabled
                                        className={classes.select} 
                                        options={optionsLoading} 
                                        onChange={onVillageChange} 
                                        placeholder="Pilih Kelurahan"
                                    />
                                )}
                            </Grid>
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    // multiline
                                    // rows={4}
                                    name="full_address"
                                    label="Full Address"
                                    defaultValue={formState.values.full_address || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.full_address && errors.full_address.message
                                    }
                                    error={errors.full_address && true}
                                    inputRef={register}
                                />
                            </Grid>
                            <Grid
                                item
                                xl={6}
                                lg={6}
                                md={6}
                                sm={12}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    name="code_pos"
                                    label="Pos Code"
                                    defaultValue={formState.values.code_pos || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.code_pos && errors.code_pos.message
                                    }
                                    error={errors.code_pos && true}
                                    inputRef={register}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Grid 
                    container
                    spacing={2}
                    justify='space-between'
                >
                    <Grid
                        item
                    >
                        <Typography variant="subtitle1" className={classes.title}>
                            Make sure you have a valid data
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button fullWidth variant="contained" type="submit" color="primary">Simpan</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    </Fragment>
}

const mapStateToProps = state => ({
    province: state.province,
    warehouse: state.warehouse
})

export default connect(mapStateToProps, { getProvince, getCities, getDistrict, getVillage, addWarehouse })(CreateWarehouse)