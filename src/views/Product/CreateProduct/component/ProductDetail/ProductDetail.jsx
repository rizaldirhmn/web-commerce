import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    Paper,
    IconButton,
    Divider,
    Button,
} from '@material-ui/core'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import CKEditor from 'ckeditor4-react';
import UploadImage from './UploadImage'
import NumberFormat from 'react-number-format'
import Select from 'react-select';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0),
    },
    searchRoot: {
		padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
		width: 'auto',
		marginTop: theme.spacing(2)
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
    select: {
        minHeight: 40,
    },
    card: {
        overflow: 'visible'
    },
    button: {
        textTransform: 'none',
        backgroundColor: '#2285DF',
        color: '#FFFFFF',
        width: '100%',
        height: '40px',
        '&:hover': {
            backgroundColor: '#0277BD'
        },
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}))

const SchemaValidation = yup.object().shape({
    name: yup.string().required("Warehouse Name cannot be Null"),
	number_phone: yup.string().required("Phone Number Cannot be Null"),
	full_address: yup.string().required("Full Address Cannot be Null"),
	code_pos: yup.string().required("Pos Code Cannot be Null"),
})

const CraeteProduct = props => {
    const classes = useStyles()
    const { register, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });
    const {
        categoryList,
        subCategoryList,
        warehouseList,
        handleChangeTabs,
        handleChange,
        formState,
        setFormState
    } = props

    const [banner, setBanner] = useState([]);
    const [ setB64] = useState(null);

    const handleChangePrice = event => {
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name] : event.target.value
          }
        }));
    };

    const handleChangeEditor = event => {
        setFormState(formState => ({
          ...formState,
          values: {
            ...formState.values,
            description: event
          }
        }));
    };

    const handleChangeBanner = event => {
        setBanner(event[0]);
        let reader = new FileReader();
        reader.readAsDataURL(event[0]);
        reader.onload = function(){
            setB64(reader.result);
        }
    };

    const onSelectChange = (event) => {
        setFormState(formState => ({
            ...formState,
            values: {
              ...formState.values,
              [event.name]: event.value
            }
        }));
    }

    // const optionsLoading = [{ 'value' : 'loading', 'label' : 'Loading'}];
    const categoryOptions = [];
    if(categoryList != null){
        for (let i = 0; i < categoryList.length; i++) {
            categoryOptions.push({'value' : categoryList[i].id, 'label' : categoryList[i].name, 'name' : 'id_category'});
        }
    }
    const subCategoryOptions = [];
    if(subCategoryList != null){
        for (let i = 0; i < subCategoryList.length; i++) {
            subCategoryOptions.push({'value' : subCategoryList[i].id, 'label' : subCategoryList[i].name, 'name' : 'id_sub_category'});
        }
    }
    const warehouseOptions = [];
    if(warehouseList != null){
        for (let i = 0; i < warehouseList.total; i++) {
            warehouseOptions.push({'value' : warehouseList.data[i].id, 'label' : warehouseList.data[i].name, 'name' : 'id_warehouse'});
        }
    }


    return (
        <div className={classes.root}>
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
                    <TextField 
                        fullWidth
                        name="title"
                        label="Judul Produk"
                        defaultValue={formState.values.title || ''}
                        onChange={handleChange}
                        helperText={
                            errors.title && errors.title.message
                        }
                        error={errors.title && true}
                        inputRef={register}
                    />
                </Grid>
                <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <TextField 
                        fullWidth
                        name="name"
                        label="Nama Produk"
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
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <CKEditor
                        data={`<p>${formState.values.description}</p>`}
                        onChange={evt => handleChangeEditor( evt )}
                    />
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                >
                    <UploadImage handleChangeBanner={handleChangeBanner} banner={banner} />
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    sm={6}
                    xs={12}
                >
                    <Card className={classes.card}>
                        <CardContent>
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
                                    <Typography>Harga</Typography>
                                    <Paper component="form" className={classes.searchRoot}>
                                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                            <Typography variant="subtitle2">Rp</Typography>
                                        </IconButton>
                                        <Divider className={classes.divider} orientation="vertical" />
                                        <NumberFormat
                                            {...props}
                                            defaultValue={formState.values.base_price || ''}
                                            name="base_price"
                                            customInput={TextField}
                                            type="text"
                                            thousandSeparator
                                            getInputRef={register}
                                            onValueChange={({ value: v }) => handleChangePrice({ target : { name : 'base_price', value: parseInt(v)} })}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Typography>Margin Keuntungan</Typography>
                                    <Paper component="form" className={classes.searchRoot}>
                                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                                            <Typography variant="subtitle2">Rp</Typography>
                                        </IconButton>
                                        <Divider className={classes.divider} orientation="vertical" />
                                        <NumberFormat
                                            {...props}
                                            defaultValue={formState.values.default_margin || ''}
                                            name="default_margin"
                                            customInput={TextField}
                                            type="text"
                                            thousandSeparator
                                            getInputRef={register}
                                            onValueChange={({ value: v }) => handleChangePrice({ target : { name : 'default_margin', value: parseInt(v)} })}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <TextField 
                                        fullWidth
                                        name="stok"
                                        type="number"
                                        label="Stok"
                                        defaultValue={formState.values.stok || ''}
                                        onChange={handleChange}
                                        helperText={
                                            errors.stok && errors.stok.message
                                        }
                                        error={errors.stok && true}
                                        inputRef={register}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Select 
                                        className={classes.select} 
                                        options={categoryOptions} 
                                        onChange={onSelectChange} 
                                        placeholder="Pilih Kategori"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Select 
                                        className={classes.select} 
                                        options={subCategoryOptions} 
                                        onChange={onSelectChange} 
                                        placeholder="Pilih Sub Kategori"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                >
                                    <Select 
                                        className={classes.select} 
                                        options={warehouseOptions} 
                                        onChange={onSelectChange} 
                                        placeholder="Pilih Gudang"
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
                <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <Button className={classes.button} onClick={e => handleChangeTabs(e, 1)}>
                        Next
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CraeteProduct