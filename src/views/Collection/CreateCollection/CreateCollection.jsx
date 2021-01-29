import React, { useState, Fragment, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Typography, 
    Button,
    Backdrop,
    CircularProgress,
    CardMedia,
    CardActionArea,
    CardActions,
    Dialog,
    DialogContent
} from '@material-ui/core'
import {Delete as DeleteIcon} from '@material-ui/icons';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";
import { useHistory } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
// import { getProvince, getCities, getDistrict, getVillage } from '../../../../store/actions/province'
// import { addCategory } from '../../../../store/actions/Master/category'
import {
    Dropzone
} from '../../../components/UI';
import * as actions from '../../../store/actions'

import {
    ListProduct
} from './components'

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
    media: {
		height: 140,
	},
}))

const SchemaValidation = yup.object().shape({
    name: yup.string().required("Warehouse Name cannot be Null"),
})

const CreateCollection = props => {
    const classes = useStyles()
    const history = useHistory()
    const {
        onUploadImage,
        onAlert,
        onSubmitCollection,
        imageUrl,
        loadingUploadImage,
        loadingAddCollection,
        onClearImageProductCollection,
        onDeleteImage,
        onAddProductList,
        loadingProductList,
        productList,
        onDeleteProductList
    } = props

    const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
    });

    const [formState, setFormState] = useState({
        values: {},
    });

    const [ openDialogProduct, setOpenDialogProduct ] = useState(false)

    const handleOpenDialogProduct = () => {
        setOpenDialogProduct(true)
    }

    const handleCloseDialogProduct = () => {
        setOpenDialogProduct(false)
    }

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

    const [image, setImage] = useState('');

    const handleChangeBanner = event => {
        setImage(event)
        let reader = new FileReader();
        reader.readAsDataURL(event[0]);
        reader.onload = function(){
            // setB64(reader.result);

            if(event[0].size < 5000000){
                onUploadImage(reader.result.split(',')[1]);
            }else{
                onAlert('maksimal file 4 mb', 'error')
            }
        }
    }

    let imageUpload = '';
    if(imageUrl !== null){
        imageUpload = (
        <Fragment>
            {/* {imageUrl.map((image, index) => ( */}
            <Grid key={imageUrl.url} item lg={3} md={3} sm={12} xs={12}>
                <Card>
                <CardActionArea>
                    <CardMedia
                    style={{height: '140px'}}
                    image={imageUrl.url}
                    title="image upload"
                    />
                </CardActionArea>
                <CardActions>
                    <Button
                    variant="contained"
                    color="secondary"
                    className={classes.buttonDelete}
                    startIcon={<DeleteIcon />}
                    onClick={() => onDeleteImage()}
                    fullWidth
                    >
                    Delete
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            {/* ))} */}
        </Fragment>
        );
    };

    // let loadingUploadImages = null;
    // if (loadingUploadImage) {
    //     loadingUploadImages = <Loading/>
    // }

    const handleAddProductList = (event) => {
        onAddProductList(event)
    }

    const onSubmit = e => {
        onSubmitCollection(formState.values, imageUrl.url, productList, history)
    }

    console.log(productList)

    useEffect(() => {
        onClearImageProductCollection()
    }, [onClearImageProductCollection])

    return loadingAddCollection || loadingUploadImage || loadingProductList ? 
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
                        Create New Collection
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
                                    label="Collection Name"
                                    defaultValue={formState.values.name || ''}
                                    onChange={handleChange}
                                    helperText={
                                        errors.name && errors.name.message
                                    }
                                    error={errors.name && true}
                                    inputRef={register}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <Dropzone
                                    multiple={false}
                                    fileType={'image/*'}
                                    value={image}
                                    handleChangeBanner={handleChangeBanner}
                                />
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Grid container spacing={2}>
                                            {imageUpload}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid item>
                                <Button fullWidth onClick={handleOpenDialogProduct}>
                                    + Tambah produk
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            spacing={2}
                        >
                            {productList.map((item, index) => (
                                <Grid item lg={3} md={3} sm={6} xs={12}>
                                    <Card>
                                        <CardMedia
                                            square
                                            className={classes.media}
                                            image={item.image}
                                            title={item.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button onClick={() => onDeleteProductList(index)}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
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
        <Dialog
            open={openDialogProduct}
            onClose={handleCloseDialogProduct}
        >
            <DialogContent>
                <ListProduct handleAddProductList={handleAddProductList} />
            </DialogContent>
        </Dialog>
    </Fragment>
}

const mapStateToProps = state => {
    return {
        loadingAddCollection: state.collection.loadingAddCollection,
        loadingUploadImage: state.collectionImage.loadingUploadImage,
        imageUrl: state.collectionImage.urlImage,
        loadingProductList : state.collectionProduct.loadingProductList,
        productList : state.collectionProduct.productList
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onUploadImage: (storeData) => dispatch(actions.uploadProductCollectionImage(storeData)),
      onAlert: (message, status) => dispatch(actions.setAlert(message, status)),
      onSubmitCollection: (formData, imageUrl, productList, history) => dispatch(actions.addCollection(formData, imageUrl, productList, history)),
      onClearImageProductCollection: () => dispatch(actions.onClearImageProductCollection()),
      onDeleteImage: () => dispatch(actions.deleteImageCollection()),
      onAddProductList: (data) => dispatch(actions.uploadCollectionProductList(data)),
      onDeleteProductList: (index) => dispatch(actions.deleteProductList(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection)